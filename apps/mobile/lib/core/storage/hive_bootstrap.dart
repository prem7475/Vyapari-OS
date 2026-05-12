import 'package:hive/hive.dart';

import '../constants/constants.dart';

Future<void> bootstrapHive() async {
  await Hive.openBox(AppConstants.hiveBoxAuth);
  await Hive.openBox(AppConstants.hiveBoxUserCache);
  await Hive.openBox(AppConstants.hiveBoxDrafts);
}

