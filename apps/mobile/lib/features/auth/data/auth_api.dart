import 'package:dio/dio.dart';

import '../domain/auth_tokens.dart';

class AuthApi {
  AuthApi(this._dio);

  final Dio _dio;

  Future<AuthTokens> exchangeFirebaseForJwt({required String firebaseIdToken}) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/v1/auth/firebase',
      data: {'idToken': firebaseIdToken},
    );

    final root = response.data ?? const <String, dynamic>{};
    final data = (root['data'] as Map?)?.cast<String, dynamic>() ?? const <String, dynamic>{};
    final tokens = (data['tokens'] as Map?)?.cast<String, dynamic>() ?? const <String, dynamic>{};

    final access = tokens['accessToken'] as String?;
    final refresh = tokens['refreshToken'] as String?;

    if (access == null || refresh == null || access.isEmpty || refresh.isEmpty) {
      throw DioException(
        requestOptions: response.requestOptions,
        response: response,
        type: DioExceptionType.badResponse,
        error: 'Invalid token response',
      );
    }

    return AuthTokens(accessToken: access, refreshToken: refresh);
  }

  Future<AuthTokens> refresh({required String refreshToken}) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/v1/auth/refresh',
      data: {'refreshToken': refreshToken},
    );

    final root = response.data ?? const <String, dynamic>{};
    final data = (root['data'] as Map?)?.cast<String, dynamic>() ?? const <String, dynamic>{};
    final tokens = (data['tokens'] as Map?)?.cast<String, dynamic>() ?? const <String, dynamic>{};

    final access = tokens['accessToken'] as String?;
    final refresh = tokens['refreshToken'] as String?;
    if (access == null || refresh == null || access.isEmpty || refresh.isEmpty) {
      throw DioException(
        requestOptions: response.requestOptions,
        response: response,
        type: DioExceptionType.badResponse,
        error: 'Invalid token response',
      );
    }
    return AuthTokens(accessToken: access, refreshToken: refresh);
  }

  Future<void> logout({required String refreshToken}) async {
    await _dio.post<Map<String, dynamic>>(
      '/v1/auth/logout',
      data: {'refreshToken': refreshToken},
    );
  }
}
