import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/auth_phone_screen.dart';
import '../../features/auth/presentation/auth_otp_screen.dart';
import '../../features/dashboard/presentation/app_shell.dart';
import '../../features/dashboard/presentation/dashboard_screen.dart';
import '../../features/onboarding/presentation/onboarding_flow_screen.dart';
import '../../features/splash/presentation/splash_screen.dart';
import '../../features/services/presentation/services_screen.dart';
import '../../features/requests/presentation/requests_screen.dart';
import '../../features/profile/presentation/profile_screen.dart';
import '../storage/app_prefs.dart';
import 'routes.dart';

final goRouterProvider = Provider<GoRouter>((ref) {
  final prefs = ref.watch(appPrefsProvider);

  return GoRouter(
    initialLocation: AppRoutes.splash,
    refreshListenable: prefs,
    redirect: (context, state) {
      final isOnboardingDone = prefs.onboardingCompleted;
      final isAuthed = prefs.hasSession;

      final location = state.matchedLocation;

      final isSplash = location == AppRoutes.splash;
      final isOnboarding = location.startsWith(AppRoutes.onboarding);
      final isAuth = location.startsWith('/auth');

      if (isSplash) return null;

      if (!isOnboardingDone && !isOnboarding) return AppRoutes.onboarding;
      if (isOnboardingDone && !isAuthed && !isAuth) return AppRoutes.authPhone;
      if (isOnboardingDone && isAuthed && (isAuth || isOnboarding)) return AppRoutes.dashboard;

      return null;
    },
    routes: [
      GoRoute(
        path: AppRoutes.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: AppRoutes.onboarding,
        builder: (context, state) => const OnboardingFlowScreen(),
      ),
      GoRoute(
        path: AppRoutes.authPhone,
        builder: (context, state) => const AuthPhoneScreen(),
      ),
      GoRoute(
        path: AppRoutes.authOtp,
        builder: (context, state) {
          final phone = state.uri.queryParameters['phone'] ?? '';
          return AuthOtpScreen(phoneE164: phone);
        },
      ),
      ShellRoute(
        builder: (context, state, child) => AppShell(child: child, location: state.matchedLocation),
        routes: [
          GoRoute(
            path: AppRoutes.dashboard,
            builder: (context, state) => const DashboardScreen(),
          ),
          GoRoute(
            path: AppRoutes.services,
            builder: (context, state) => const ServicesScreen(),
          ),
          GoRoute(
            path: AppRoutes.requests,
            builder: (context, state) => const RequestsScreen(),
          ),
          GoRoute(
            path: AppRoutes.profile,
            builder: (context, state) => const ProfileScreen(),
          ),
        ],
      ),
    ],
  );
});
