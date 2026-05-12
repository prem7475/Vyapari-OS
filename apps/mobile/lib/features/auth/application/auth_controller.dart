import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/dio_provider.dart';
import '../../../core/storage/app_prefs.dart';
import '../../../core/utils/result.dart';
import '../data/auth_api.dart';
import '../data/auth_repository_impl.dart';
import '../data/firebase_auth_service.dart';
import '../domain/auth_state.dart';
import '../domain/auth_repository.dart';

final firebaseAuthProvider = Provider<FirebaseAuth>((ref) => FirebaseAuth.instance);

final firebaseAuthServiceProvider = Provider<FirebaseAuthService>((ref) {
  final auth = ref.watch(firebaseAuthProvider);
  return FirebaseAuthService(auth);
});

final authApiProvider = Provider<AuthApi>((ref) {
  final dio = ref.watch(dioProvider);
  return AuthApi(dio);
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final api = ref.watch(authApiProvider);
  final prefs = ref.watch(appPrefsProvider);
  return AuthRepositoryImpl(api: api, prefs: prefs);
});

final authControllerProvider = StateNotifierProvider<AuthController, AuthState>((ref) {
  final service = ref.watch(firebaseAuthServiceProvider);
  final repo = ref.watch(authRepositoryProvider);
  final prefs = ref.watch(appPrefsProvider);
  return AuthController(service: service, repo: repo, prefs: prefs);
});

class AuthController extends StateNotifier<AuthState> {
  AuthController({required FirebaseAuthService service, required AuthRepository repo, required AppPrefs prefs})
      : _service = service,
        _repo = repo,
        _prefs = prefs,
        super(AuthState.initial());

  final FirebaseAuthService _service;
  final AuthRepository _repo;
  final AppPrefs _prefs;

  Future<Result<void>> sendOtp({required String phoneE164}) async {
    state = state.copyWith(status: AuthStatus.sendingOtp, phoneE164: phoneE164, errorMessage: null);

    try {
      await _service.sendOtp(
        phoneE164: phoneE164,
        forceResendingToken: state.resendToken,
        onCodeSent: (verificationId, resendToken) {
          state = state.copyWith(
            status: AuthStatus.codeSent,
            verificationId: verificationId,
            resendToken: resendToken,
            errorMessage: null,
          );
        },
        onAutoVerified: (credential) async {
          state = state.copyWith(status: AuthStatus.verifyingOtp);
          await FirebaseAuth.instance.signInWithCredential(credential);
          await _onAuthenticated();
        },
        onFailure: (message) {
          state = state.copyWith(status: AuthStatus.failure, errorMessage: message);
        },
      );
      return const Ok(null);
    } catch (e) {
      state = state.copyWith(status: AuthStatus.failure, errorMessage: 'Failed to send OTP');
      return const Err('Failed to send OTP');
    }
  }

  Future<Result<void>> verifyOtp({required String smsCode}) async {
    final verificationId = state.verificationId;
    if (verificationId == null || verificationId.isEmpty) {
      state = state.copyWith(status: AuthStatus.failure, errorMessage: 'Session expired. Try again.');
      return const Err('Missing verificationId');
    }

    state = state.copyWith(status: AuthStatus.verifyingOtp, errorMessage: null);

    try {
      await _service.verifyOtp(verificationId: verificationId, smsCode: smsCode);
      await _onAuthenticated();
      return const Ok(null);
    } catch (e) {
      state = state.copyWith(status: AuthStatus.failure, errorMessage: 'Invalid OTP. Try again.');
      return const Err('Invalid OTP');
    }
  }

  Future<void> _onAuthenticated() async {
    final firebaseIdToken = await _service.getIdToken();
    if (firebaseIdToken == null || firebaseIdToken.isEmpty) {
      state = state.copyWith(status: AuthStatus.failure, errorMessage: 'Login failed. Try again.');
      return;
    }

    try {
      await _repo.exchangeFirebaseForSession(firebaseIdToken: firebaseIdToken);
      state = state.copyWith(status: AuthStatus.authenticated, errorMessage: null);
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.failure,
        errorMessage: 'Server login failed. Check connection and try again.',
      );
    }
  }

  Future<void> signOut() async {
    final refresh = _prefs.refreshToken;
    if (refresh != null && refresh.isNotEmpty) {
      try {
        await _repo.logout(refreshToken: refresh);
      } catch (_) {
        await _prefs.clearSession();
      }
    }
    await _service.signOut();
    state = AuthState.initial();
  }
}
