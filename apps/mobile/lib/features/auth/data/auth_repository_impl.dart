import '../../../core/storage/app_prefs.dart';
import '../domain/auth_repository.dart';
import '../domain/auth_tokens.dart';
import 'auth_api.dart';

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl({required AuthApi api, required AppPrefs prefs})
      : _api = api,
        _prefs = prefs;

  final AuthApi _api;
  final AppPrefs _prefs;

  @override
  Future<AuthTokens> exchangeFirebaseForSession({required String firebaseIdToken}) async {
    final tokens = await _api.exchangeFirebaseForJwt(firebaseIdToken: firebaseIdToken);
    await _prefs.setSessionTokens(accessToken: tokens.accessToken, refreshToken: tokens.refreshToken);
    return tokens;
  }

  @override
  Future<AuthTokens> refresh({required String refreshToken}) async {
    final tokens = await _api.refresh(refreshToken: refreshToken);
    await _prefs.setSessionTokens(accessToken: tokens.accessToken, refreshToken: tokens.refreshToken);
    return tokens;
  }

  @override
  Future<void> logout({required String refreshToken}) async {
    await _api.logout(refreshToken: refreshToken);
    await _prefs.clearSession();
  }
}

