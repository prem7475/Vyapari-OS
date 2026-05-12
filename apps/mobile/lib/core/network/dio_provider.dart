import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../storage/app_prefs.dart';
import 'api_config.dart';

final dioProvider = Provider<Dio>((ref) {
  final prefs = ref.read(appPrefsProvider);

  final dio = Dio(
    BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeoutMs),
      receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeoutMs),
      headers: {'content-type': 'application/json'},
    ),
  );

  final refreshDio = Dio(
    BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeoutMs),
      receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeoutMs),
      headers: {'content-type': 'application/json'},
    ),
  );

  Future<_RefreshedTokens?> doRefresh() async {
    final refresh = prefs.refreshToken;
    if (refresh == null || refresh.isEmpty) return null;
    try {
      final resp = await refreshDio.post<Map<String, dynamic>>(
        '/v1/auth/refresh',
        data: {'refreshToken': refresh},
      );
      final data = resp.data?['data'] as Map?;
      final tokens = (data?['tokens'] as Map?)?.cast<String, dynamic>();
      final access = tokens?['accessToken'] as String?;
      final nextRefresh = tokens?['refreshToken'] as String?;
      if (access == null || nextRefresh == null || access.isEmpty || nextRefresh.isEmpty) return null;
      await prefs.setSessionTokens(accessToken: access, refreshToken: nextRefresh);
      return _RefreshedTokens(accessToken: access, refreshToken: nextRefresh);
    } catch (_) {
      return null;
    }
  }

  Future<_RefreshedTokens?>? refreshing;
  Future<_RefreshedTokens?> refreshOnce() {
    refreshing ??= doRefresh().whenComplete(() => refreshing = null);
    return refreshing!;
  }

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) {
        final access = prefs.accessToken;
        if (access != null && access.isNotEmpty) {
          options.headers['authorization'] = 'Bearer $access';
        }
        return handler.next(options);
      },
      onError: (e, handler) async {
        final status = e.response?.statusCode;
        final isUnauthorized = status == 401;
        final isRefreshCall = e.requestOptions.path.endsWith('/v1/auth/refresh') ||
            e.requestOptions.path.endsWith('/v1/auth/firebase') ||
            e.requestOptions.path.endsWith('/v1/auth/logout');

        final alreadyRetried = e.requestOptions.extra['__retry'] == true;

        if (isUnauthorized && !alreadyRetried && !isRefreshCall) {
          final tokens = await refreshOnce();
          if (tokens != null) {
            final opts = e.requestOptions;
            opts.extra['__retry'] = true;
            opts.headers['authorization'] = 'Bearer ${tokens.accessToken}';
            try {
              final resp = await dio.fetch(opts);
              return handler.resolve(resp);
            } catch (err) {
              return handler.reject(err is DioException ? err : e);
            }
          } else {
            await prefs.clearSession();
          }
        }

        return handler.next(e);
      },
    ),
  );

  return dio;
});

class _RefreshedTokens {
  const _RefreshedTokens({required this.accessToken, required this.refreshToken});
  final String accessToken;
  final String refreshToken;
}
