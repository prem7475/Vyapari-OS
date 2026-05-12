import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/router/router.dart';
import 'core/theme/theme.dart';

class VyapariApp extends ConsumerWidget {
  const VyapariApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(goRouterProvider);

    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Vyapari OS',
      theme: VyapariTheme.light(),
      darkTheme: VyapariTheme.dark(),
      routerConfig: router,
    );
  }
}
