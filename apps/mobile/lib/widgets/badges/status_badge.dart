import 'package:flutter/material.dart';

import '../../core/theme/colors.dart';

class StatusBadge extends StatelessWidget {
  const StatusBadge({
    super.key,
    required this.label,
    required this.variant,
  });

  final String label;
  final StatusBadgeVariant variant;

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = switch (variant) {
      StatusBadgeVariant.success => (VyapariColors.accent.withOpacity(0.12), VyapariColors.accent2),
      StatusBadgeVariant.warning => (VyapariColors.warning.withOpacity(0.14), VyapariColors.warning),
      StatusBadgeVariant.danger => (VyapariColors.danger.withOpacity(0.14), VyapariColors.danger),
      StatusBadgeVariant.info => (VyapariColors.info.withOpacity(0.14), VyapariColors.info),
      StatusBadgeVariant.neutral => (Colors.black.withOpacity(0.06), VyapariColors.textMuted),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(color: fg, fontWeight: FontWeight.w700),
      ),
    );
  }
}

enum StatusBadgeVariant { success, warning, danger, info, neutral }
