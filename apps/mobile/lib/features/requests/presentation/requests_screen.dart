import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/badges/status_badge.dart';

class RequestsScreen extends StatelessWidget {
  const RequestsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const VyapariAppBar(title: 'Requests', showBack: false),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: const [
            _RequestRow(title: 'GST Registration', subtitle: 'Assigned to ops team', badge: StatusBadge(label: 'Assigned', variant: StatusBadgeVariant.info)),
            Gap(12),
            _RequestRow(title: 'FSSAI Basic', subtitle: 'Waiting for documents', badge: StatusBadge(label: 'Need docs', variant: StatusBadgeVariant.warning)),
          ],
        ),
      ),
    );
  }
}

class _RequestRow extends StatelessWidget {
  const _RequestRow({required this.title, required this.subtitle, required this.badge});
  final String title;
  final String subtitle;
  final Widget badge;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Icon(Icons.receipt_long_rounded, color: Theme.of(context).colorScheme.primary),
            const Gap(12),
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
            badge,
          ],
        ),
      ),
    );
  }
}

