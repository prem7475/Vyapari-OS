import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';

import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/buttons/secondary_button.dart';
import '../../auth/application/auth_controller.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: const VyapariAppBar(title: 'Profile', showBack: false),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 22,
                      backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.10),
                      child: Icon(Icons.person_rounded, color: Theme.of(context).colorScheme.primary),
                    ),
                    const Gap(12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Business Owner', style: Theme.of(context).textTheme.titleMedium),
                          const Gap(4),
                          Text('Verified phone login', style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const Gap(12),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Business details', style: Theme.of(context).textTheme.titleMedium),
                    const Gap(8),
                    Text('Add your legal name, PAN, GSTIN to unlock faster processing.', style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
              ),
            ),
            const Gap(18),
            SecondaryButton(
              label: 'Sign out',
              onPressed: () async {
                await ref.read(authControllerProvider.notifier).signOut();
              },
            ),
          ],
        ),
      ),
    );
  }
}
