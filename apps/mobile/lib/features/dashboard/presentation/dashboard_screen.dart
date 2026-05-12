import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/badges/status_badge.dart';
import '../../../widgets/cards/service_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const VyapariAppBar(title: 'Dashboard', showBack: false),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SummaryGrid(),
            const Gap(16),
            Text('Ongoing requests', style: Theme.of(context).textTheme.titleLarge),
            const Gap(10),
            _RequestCard(
              title: 'GST Registration',
              subtitle: 'Docs verified. Filing in progress.',
              badge: const StatusBadge(label: 'In progress', variant: StatusBadgeVariant.info),
            ),
            const Gap(12),
            _RequestCard(
              title: 'FSSAI Basic',
              subtitle: 'Need: Shop photo, owner ID proof.',
              badge: const StatusBadge(label: 'Need docs', variant: StatusBadgeVariant.warning),
            ),
            const Gap(18),
            Text('Recommended for you', style: Theme.of(context).textTheme.titleLarge),
            const Gap(10),
            ServiceCard(
              title: 'Trademark Filing',
              subtitle: 'Protect your brand name for marketplaces.',
              priceLabel: 'From ₹4,999',
              badge: const StatusBadge(label: 'Popular', variant: StatusBadgeVariant.success),
              onTap: () {},
            ),
            const Gap(12),
            ServiceCard(
              title: 'Swiggy / Zomato Onboarding',
              subtitle: 'Faster activation with document checklist.',
              priceLabel: 'From ₹1,499',
              onTap: () {},
            ),
            const Gap(18),
            Text('Quick actions', style: Theme.of(context).textTheme.titleLarge),
            const Gap(10),
            _QuickActions(),
            const Gap(18),
            Text('Documents', style: Theme.of(context).textTheme.titleLarge),
            const Gap(10),
            _DocsStrip(),
            const Gap(18),
            Text('Notifications', style: Theme.of(context).textTheme.titleLarge),
            const Gap(10),
            _NotificationTile(
              title: 'Document verified',
              subtitle: 'PAN card verified for GST request.',
            ),
            const Gap(10),
            _NotificationTile(
              title: 'Payment received',
              subtitle: 'We’ve started processing your trademark.',
            ),
          ],
        ),
      ),
    );
  }
}

class _SummaryGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        Expanded(child: _MetricCard(label: 'Open requests', value: '2')),
        Gap(12),
        Expanded(child: _MetricCard(label: 'Docs uploaded', value: '5')),
        Gap(12),
        Expanded(child: _MetricCard(label: 'Payments', value: '₹6.5k')),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: Theme.of(context).textTheme.bodySmall),
            const Gap(8),
            Text(value, style: Theme.of(context).textTheme.titleLarge),
          ],
        ),
      ),
    );
  }
}

class _RequestCard extends StatelessWidget {
  const _RequestCard({required this.title, required this.subtitle, required this.badge});
  final String title;
  final String subtitle;
  final Widget badge;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 42,
              width: 42,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: Theme.of(context).colorScheme.primary.withOpacity(0.10),
              ),
              child: Icon(Icons.work_outline_rounded, color: Theme.of(context).colorScheme.primary),
            ),
            const Gap(12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(child: Text(title, style: Theme.of(context).textTheme.titleMedium)),
                      badge,
                    ],
                  ),
                  const Gap(6),
                  Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _QuickActions extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: _ActionTile(icon: Icons.upload_file_rounded, label: 'Upload doc', onTap: () {})),
        const Gap(12),
        Expanded(child: _ActionTile(icon: Icons.support_agent_rounded, label: 'Support', onTap: () {})),
        const Gap(12),
        Expanded(child: _ActionTile(icon: Icons.add_task_rounded, label: 'New request', onTap: () {})),
      ],
    );
  }
}

class _ActionTile extends StatelessWidget {
  const _ActionTile({required this.icon, required this.label, required this.onTap});
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: onTap,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 14),
          child: Column(
            children: [
              Icon(icon, color: Theme.of(context).colorScheme.primary),
              const Gap(10),
              Text(label, style: Theme.of(context).textTheme.bodySmall, textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}

class _DocsStrip extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        Expanded(child: _DocPill(label: 'PAN', ok: true)),
        Gap(10),
        Expanded(child: _DocPill(label: 'AADHAAR', ok: true)),
        Gap(10),
        Expanded(child: _DocPill(label: 'PHOTO', ok: false)),
      ],
    );
  }
}

class _DocPill extends StatelessWidget {
  const _DocPill({required this.label, required this.ok});
  final String label;
  final bool ok;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        child: Row(
          children: [
            Icon(ok ? Icons.verified_rounded : Icons.pending_actions_rounded, size: 18, color: ok ? Colors.green : Colors.orange),
            const Gap(8),
            Expanded(child: Text(label, style: Theme.of(context).textTheme.titleMedium)),
          ],
        ),
      ),
    );
  }
}

class _NotificationTile extends StatelessWidget {
  const _NotificationTile({required this.title, required this.subtitle});
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              height: 36,
              width: 36,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: Theme.of(context).colorScheme.primary.withOpacity(0.10),
              ),
              child: Icon(Icons.notifications_none_rounded, color: Theme.of(context).colorScheme.primary),
            ),
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
          ],
        ),
      ),
    );
  }
}
