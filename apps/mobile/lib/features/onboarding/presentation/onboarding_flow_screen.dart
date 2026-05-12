import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';
import '../../../widgets/buttons/primary_button.dart';
import '../../../widgets/buttons/secondary_button.dart';
import '../application/onboarding_controller.dart';

class OnboardingFlowScreen extends ConsumerStatefulWidget {
  const OnboardingFlowScreen({super.key});

  @override
  ConsumerState<OnboardingFlowScreen> createState() => _OnboardingFlowScreenState();
}

class _OnboardingFlowScreenState extends ConsumerState<OnboardingFlowScreen> {
  final _pageController = PageController();
  int _index = 0;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _next() async {
    if (_index < 3) {
      await _pageController.nextPage(duration: const Duration(milliseconds: 320), curve: Curves.easeOutCubic);
    } else {
      await ref.read(onboardingControllerProvider.notifier).complete();
      if (!mounted) return;
      context.go(AppRoutes.authPhone);
    }
  }

  Future<void> _back() async {
    if (_index <= 0) return;
    await _pageController.previousPage(duration: const Duration(milliseconds: 280), curve: Curves.easeOutCubic);
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(onboardingControllerProvider);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Gap(8),
              _TopProgress(index: _index, total: 4),
              const Gap(16),
              Expanded(
                child: PageView(
                  controller: _pageController,
                  onPageChanged: (i) => setState(() => _index = i),
                  children: [
                    _WelcomeStep(onContinue: _next),
                    _LanguageStep(
                      language: state.language,
                      onSelect: (l) => ref.read(onboardingControllerProvider.notifier).setLanguage(l),
                      onContinue: _next,
                    ),
                    _CategoryStep(
                      category: state.category,
                      onSelect: (c) => ref.read(onboardingControllerProvider.notifier).setBusinessCategory(c),
                      onContinue: _next,
                    ),
                    _WalkthroughStep(onFinish: _next, onBack: _back),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TopProgress extends StatelessWidget {
  const _TopProgress({required this.index, required this.total});
  final int index;
  final int total;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(total, (i) {
        final active = i <= index;
        return Expanded(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            height: 6,
            margin: EdgeInsets.only(right: i == total - 1 ? 0 : 8),
            decoration: BoxDecoration(
              color: active ? Theme.of(context).colorScheme.primary : Theme.of(context).dividerColor.withOpacity(0.5),
              borderRadius: BorderRadius.circular(999),
            ),
          ),
        );
      }),
    );
  }
}

class _OnboardingCard extends StatelessWidget {
  const _OnboardingCard({required this.title, required this.subtitle, required this.child});
  final String title;
  final String subtitle;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: Theme.of(context).textTheme.headlineSmall),
        const Gap(10),
        Text(subtitle, style: Theme.of(context).textTheme.bodyMedium),
        const Gap(18),
        Expanded(
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: child,
            ),
          ),
        ),
      ],
    );
  }
}

class _WelcomeStep extends StatelessWidget {
  const _WelcomeStep({required this.onContinue});
  final VoidCallback onContinue;

  @override
  Widget build(BuildContext context) {
    return _OnboardingCard(
      title: 'Business setup, handled.',
      subtitle: 'Track registrations, documents, and requests like a real operations team is with you.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Gap(8),
          _Bullet(text: 'GST, FSSAI, Trademark, MSME and more'),
          _Bullet(text: 'Upload documents once, reuse across services'),
          _Bullet(text: 'Timeline tracking and professional updates'),
          const Spacer(),
          PrimaryButton(label: 'Continue', onPressed: onContinue),
        ],
      ),
    );
  }
}

class _LanguageStep extends StatelessWidget {
  const _LanguageStep({
    required this.language,
    required this.onSelect,
    required this.onContinue,
  });

  final AppLanguage language;
  final ValueChanged<AppLanguage> onSelect;
  final VoidCallback onContinue;

  @override
  Widget build(BuildContext context) {
    return _OnboardingCard(
      title: 'Choose your language',
      subtitle: 'You can change this anytime in your profile.',
      child: Column(
        children: [
          _ChoiceTile(
            title: 'English',
            subtitle: 'Recommended for business documentation',
            selected: language == AppLanguage.english,
            onTap: () => onSelect(AppLanguage.english),
          ),
          const Gap(12),
          _ChoiceTile(
            title: 'हिंदी',
            subtitle: 'सरल और तेज़ अनुभव',
            selected: language == AppLanguage.hindi,
            onTap: () => onSelect(AppLanguage.hindi),
          ),
          const Spacer(),
          PrimaryButton(label: 'Continue', onPressed: onContinue),
        ],
      ),
    );
  }
}

class _CategoryStep extends StatelessWidget {
  const _CategoryStep({
    required this.category,
    required this.onSelect,
    required this.onContinue,
  });

  final BusinessCategory category;
  final ValueChanged<BusinessCategory> onSelect;
  final VoidCallback onContinue;

  @override
  Widget build(BuildContext context) {
    return _OnboardingCard(
      title: 'What do you do?',
      subtitle: 'We’ll recommend the right registrations and onboarding steps.',
      child: Column(
        children: [
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              _Chip(
                label: 'Retail',
                selected: category == BusinessCategory.retail,
                onTap: () => onSelect(BusinessCategory.retail),
              ),
              _Chip(
                label: 'Services',
                selected: category == BusinessCategory.services,
                onTap: () => onSelect(BusinessCategory.services),
              ),
              _Chip(
                label: 'Manufacturing',
                selected: category == BusinessCategory.manufacturing,
                onTap: () => onSelect(BusinessCategory.manufacturing),
              ),
              _Chip(
                label: 'Food',
                selected: category == BusinessCategory.food,
                onTap: () => onSelect(BusinessCategory.food),
              ),
              _Chip(
                label: 'E-commerce',
                selected: category == BusinessCategory.ecommerce,
                onTap: () => onSelect(BusinessCategory.ecommerce),
              ),
            ],
          ),
          const Spacer(),
          PrimaryButton(label: 'Continue', onPressed: onContinue),
        ],
      ),
    );
  }
}

class _WalkthroughStep extends StatelessWidget {
  const _WalkthroughStep({required this.onFinish, required this.onBack});
  final VoidCallback onFinish;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return _OnboardingCard(
      title: 'How Vyapari OS works',
      subtitle: 'A premium ops workflow—clear, fast, and trackable.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Gap(4),
          _Bullet(text: 'Pick a service → share details'),
          _Bullet(text: 'Upload documents securely'),
          _Bullet(text: 'Track request timeline and updates'),
          _Bullet(text: 'Pay only when required with Razorpay'),
          const Spacer(),
          Row(
            children: [
              Expanded(child: SecondaryButton(label: 'Back', onPressed: onBack)),
              const Gap(12),
              Expanded(child: PrimaryButton(label: 'Get started', onPressed: onFinish)),
            ],
          ),
        ],
      ),
    );
  }
}

class _ChoiceTile extends StatelessWidget {
  const _ChoiceTile({
    required this.title,
    required this.subtitle,
    required this.selected,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? Theme.of(context).colorScheme.primary : Theme.of(context).dividerColor,
            width: selected ? 1.4 : 1,
          ),
          color: selected ? Theme.of(context).colorScheme.primary.withOpacity(0.06) : Colors.transparent,
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: Theme.of(context).textTheme.titleMedium),
                  const Gap(4),
                  Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
                ],
              ),
            ),
            const Gap(10),
            Icon(selected ? Icons.radio_button_checked : Icons.radio_button_off, color: Theme.of(context).colorScheme.primary),
          ],
        ),
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.label, required this.selected, required this.onTap});
  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(999),
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: selected ? Theme.of(context).colorScheme.primary : Theme.of(context).dividerColor),
          color: selected ? Theme.of(context).colorScheme.primary.withOpacity(0.08) : Colors.white,
        ),
        child: Text(label, style: Theme.of(context).textTheme.labelLarge),
      ),
    );
  }
}

class _Bullet extends StatelessWidget {
  const _Bullet({required this.text});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(Icons.check_circle_rounded, size: 18, color: Theme.of(context).colorScheme.primary),
          const Gap(10),
          Expanded(child: Text(text, style: Theme.of(context).textTheme.bodyMedium)),
        ],
      ),
    );
  }
}
