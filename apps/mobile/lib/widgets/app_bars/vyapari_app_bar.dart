import 'package:flutter/material.dart';

class VyapariAppBar extends StatelessWidget implements PreferredSizeWidget {
  const VyapariAppBar({
    super.key,
    required this.title,
    this.actions,
    this.showBack = true,
  });

  final String title;
  final List<Widget>? actions;
  final bool showBack;

  @override
  Size get preferredSize => const Size.fromHeight(56);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: showBack && Navigator.of(context).canPop()
          ? IconButton(
              onPressed: () => Navigator.of(context).maybePop(),
              icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18),
            )
          : null,
      title: Text(title, style: Theme.of(context).textTheme.titleLarge),
      actions: actions,
    );
  }
}

