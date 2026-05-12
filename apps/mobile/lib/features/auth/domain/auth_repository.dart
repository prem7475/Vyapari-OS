import 'auth_tokens.dart';

abstract class AuthRepository {
  Future<AuthTokens> exchangeFirebaseForSession({required String firebaseIdToken});
  Future<AuthTokens> refresh({required String refreshToken});
  Future<void> logout({required String refreshToken});
}

