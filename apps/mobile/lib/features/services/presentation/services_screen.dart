import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/badges/status_badge.dart';
import '../../../widgets/cards/service_card.dart';

class ServicesScreen extends StatelessWidget {
  const ServicesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const VyapariAppBar(title: 'Services', showBack: false),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text('Marketplace', style: Theme.of(context).textTheme.headlineSmall),
            const Gap(10),
            Text('Premium, guided services for Indian compliance and onboarding.', style: Theme.of(context).textTheme.bodyMedium),
            const Gap(16),
            ServiceCard(
              title: 'GST Registration',
              subtitle: 'Turnover-ready compliance setup with document checklist.',
              priceLabel: 'From ₹2,999',
              badge: const StatusBadge(label: 'Fast', variant: StatusBadgeVariant.success),
              onTap: () {},
            ),
            const Gap(12),
            ServiceCard(
              title: 'FSSAI License',
              subtitle: 'For food businesses: basic/state/central guidance.',
              priceLabel: 'From ₹1,999',
              onTap: () {},
            ),
            const Gap(12),
            ServiceCard(
              title: 'Trademark Filing',
              subtitle: 'Brand protection with expert review and tracking.',
              priceLabel: 'From ₹4,999',
              badge: const StatusBadge(label: 'Popular', variant: StatusBadgeVariant.info),
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}

