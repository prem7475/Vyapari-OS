import 'package:flutter/foundation.dart';

@immutable
class AuthState {
  const AuthState({
    required this.status,
    this.phoneE164,
    this.verificationId,
    this.errorMessage,
    this.resendToken,
  });

  final AuthStatus status;
  final String? phoneE164;
  final String? verificationId;
  final String? errorMessage;
  final int? resendToken;

  factory AuthState.initial() => const AuthState(status: AuthStatus.idle);

  AuthState copyWith({
    AuthStatus? status,
    String? phoneE164,
    String? verificationId,
    String? errorMessage,
    int? resendToken,
  }) {
    return AuthState(
      status: status ?? this.status,
      phoneE164: phoneE164 ?? this.phoneE164,
      verificationId: verificationId ?? this.verificationId,
      errorMessage: errorMessage,
      resendToken: resendToken ?? this.resendToken,
    );
  }
}

enum AuthStatus {
  idle,
  sendingOtp,
  codeSent,
  verifyingOtp,
  authenticated,
  failure,
}

