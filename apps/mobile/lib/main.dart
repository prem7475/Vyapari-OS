import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'app.dart';
import 'core/storage/app_prefs.dart';
import 'core/storage/hive_bootstrap.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Hive.initFlutter();
  await bootstrapHive();

  final prefs = AppPrefs(secureStorage: const FlutterSecureStorage());
  await prefs.init();

  runApp(
    ProviderScope(
      overrides: [
        appPrefsProvider.overrideWithValue(prefs),
      ],
      child: const VyapariApp(),
    ),
  );
}
