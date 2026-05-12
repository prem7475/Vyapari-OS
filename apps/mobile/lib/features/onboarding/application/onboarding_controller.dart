import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/storage/app_prefs.dart';

final onboardingControllerProvider = StateNotifierProvider<OnboardingController, OnboardingState>((ref) {
  final prefs = ref.watch(appPrefsProvider);
  return OnboardingController(prefs);
});

class OnboardingController extends StateNotifier<OnboardingState> {
  OnboardingController(this._prefs) : super(const OnboardingState());

  final AppPrefs _prefs;

  Future<void> complete() async {
    await _prefs.setOnboardingCompleted(true);
    state = state.copyWith(completed: true);
  }

  void setLanguage(AppLanguage language) {
    state = state.copyWith(language: language);
  }

  void setBusinessCategory(BusinessCategory category) {
    state = state.copyWith(category: category);
  }
}

class OnboardingState {
  const OnboardingState({
    this.language = AppLanguage.english,
    this.category = BusinessCategory.retail,
    this.completed = false,
  });

  final AppLanguage language;
  final BusinessCategory category;
  final bool completed;

  OnboardingState copyWith({AppLanguage? language, BusinessCategory? category, bool? completed}) {
    return OnboardingState(
      language: language ?? this.language,
      category: category ?? this.category,
      completed: completed ?? this.completed,
    );
  }
}

enum AppLanguage { english, hindi }

enum BusinessCategory { retail, services, manufacturing, food, ecommerce }

