import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:hive/hive.dart';

import '../constants/constants.dart';

final appPrefsProvider = Provider<AppPrefs>((ref) {
  throw UnimplementedError('appPrefsProvider must be overridden from main() after bootstrap.');
});

class AppPrefs extends ChangeNotifier {
  AppPrefs({required FlutterSecureStorage secureStorage})
      : _box = Hive.box(AppConstants.hiveBoxUserCache),
        _auth = Hive.box(AppConstants.hiveBoxAuth),
        _secure = secureStorage;

  final Box _box;
  final Box _auth;
  final FlutterSecureStorage _secure;

  static const _kOnboardingCompleted = 'onboarding_completed';
  static const _kSessionPresent = 'session_present';
  static const _kSecureAccessToken = 'vy_access_token';
  static const _kSecureRefreshToken = 'vy_refresh_token';

  String? _accessToken;
  String? _refreshToken;

  Future<void> init() async {
    _accessToken = await _secure.read(key: _kSecureAccessToken);
    _refreshToken = await _secure.read(key: _kSecureRefreshToken);
    await _auth.put(_kSessionPresent, hasSession);
    notifyListeners();
  }

  bool get onboardingCompleted => (_box.get(_kOnboardingCompleted) as bool?) ?? false;

  bool get hasSession {
    final access = _accessToken;
    final refresh = _refreshToken;
    return (access != null && access.isNotEmpty) && (refresh != null && refresh.isNotEmpty);
  }

  String? get accessToken => _accessToken;
  String? get refreshToken => _refreshToken;

  Future<void> setOnboardingCompleted(bool value) async {
    await _box.put(_kOnboardingCompleted, value);
    notifyListeners();
  }

  Future<void> setSessionTokens({required String accessToken, required String refreshToken}) async {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    await _secure.write(key: _kSecureAccessToken, value: accessToken);
    await _secure.write(key: _kSecureRefreshToken, value: refreshToken);
    await _auth.put(_kSessionPresent, true);
    notifyListeners();
  }

  Future<void> updateAccessToken(String accessToken) async {
    _accessToken = accessToken;
    await _secure.write(key: _kSecureAccessToken, value: accessToken);
    notifyListeners();
  }

  Future<void> clearSession() async {
    _accessToken = null;
    _refreshToken = null;
    await _secure.delete(key: _kSecureAccessToken);
    await _secure.delete(key: _kSecureRefreshToken);
    await _auth.put(_kSessionPresent, false);
    notifyListeners();
  }
}
