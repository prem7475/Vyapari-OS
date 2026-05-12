import 'package:flutter/material.dart';

import 'colors.dart';
import 'typography.dart';

class VyapariTheme {
  VyapariTheme._();

  static ThemeData light() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: VyapariColors.accent,
      brightness: Brightness.light,
      primary: VyapariColors.accent,
      secondary: VyapariColors.accent2,
      surface: VyapariColors.surface,
      error: VyapariColors.danger,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: VyapariColors.surface,
      textTheme: VyapariTypography.textTheme(
        textColor: VyapariColors.text,
        mutedColor: VyapariColors.textMuted,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      cardTheme: CardTheme(
        color: VyapariColors.card,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: VyapariColors.border),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: VyapariColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: VyapariColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: VyapariColors.accent.withOpacity(0.65)),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        hintStyle: const TextStyle(color: VyapariColors.textMuted, fontWeight: FontWeight.w500),
      ),
    );
  }

  static ThemeData dark() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: VyapariColors.accent,
      brightness: Brightness.dark,
      primary: VyapariColors.accent,
      secondary: VyapariColors.accent2,
      surface: VyapariColors.navy2,
      error: VyapariColors.danger,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: VyapariColors.navy,
      textTheme: VyapariTypography.textTheme(
        textColor: Colors.white,
        mutedColor: const Color(0xFFC7CBD6),
      ),
    );
  }
}
