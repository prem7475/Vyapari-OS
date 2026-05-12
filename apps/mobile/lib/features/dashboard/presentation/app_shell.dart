import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';
import '../../../widgets/navigation/vyapari_bottom_nav.dart';

class AppShell extends StatelessWidget {
  const AppShell({super.key, required this.child, required this.location});

  final Widget child;
  final String location;

  int _indexForLocation(String location) {
    if (location.startsWith(AppRoutes.services)) return 1;
    if (location.startsWith(AppRoutes.requests)) return 2;
    if (location.startsWith(AppRoutes.profile)) return 3;
    return 0;
  }

  void _onNavTap(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go(AppRoutes.dashboard);
        return;
      case 1:
        context.go(AppRoutes.services);
        return;
      case 2:
        context.go(AppRoutes.requests);
        return;
      case 3:
        context.go(AppRoutes.profile);
        return;
    }
  }

  @override
  Widget build(BuildContext context) {
    final index = _indexForLocation(location);

    return Scaffold(
      body: child,
      bottomNavigationBar: VyapariBottomNav(
        index: index,
        onChanged: (i) => _onNavTap(context, i),
      ),
    );
  }
}
