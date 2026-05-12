import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';
import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/buttons/primary_button.dart';
import '../../../widgets/inputs/app_text_field.dart';
import '../application/auth_controller.dart';

class AuthPhoneScreen extends ConsumerStatefulWidget {
  const AuthPhoneScreen({super.key});

  @override
  ConsumerState<AuthPhoneScreen> createState() => _AuthPhoneScreenState();
}

class _AuthPhoneScreenState extends ConsumerState<AuthPhoneScreen> {
  final _controller = TextEditingController();
  String? _error;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  String _toE164(String input) {
    final digits = input.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.length == 10) return '+91$digits';
    if (digits.startsWith('91') && digits.length == 12) return '+$digits';
    if (input.startsWith('+')) return input;
    return '+91$digits';
  }

  Future<void> _send() async {
    final raw = _controller.text.trim();
    if (raw.isEmpty) {
      setState(() => _error = 'Enter your mobile number');
      return;
    }

    final phone = _toE164(raw);
    setState(() => _error = null);

    final ctrl = ref.read(authControllerProvider.notifier);
    await ctrl.sendOtp(phoneE164: phone);

    final state = ref.read(authControllerProvider);
    if (state.status == AuthStatus.codeSent) {
      if (!mounted) return;
      context.go('${AppRoutes.authOtp}?phone=$phone');
    } else if (state.status == AuthStatus.failure) {
      setState(() => _error = state.errorMessage);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authControllerProvider);
    final isLoading = auth.status == AuthStatus.sendingOtp;

    return Scaffold(
      appBar: const VyapariAppBar(title: 'Login', showBack: false),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Enter your phone number', style: Theme.of(context).textTheme.headlineSmall),
              const Gap(8),
              Text('We’ll send an OTP to verify.', style: Theme.of(context).textTheme.bodyMedium),
              const Gap(18),
              AppTextField(
                label: 'Mobile number',
                hintText: '10-digit number',
                controller: _controller,
                keyboardType: TextInputType.phone,
                textInputAction: TextInputAction.done,
                prefixText: '+91 ',
                maxLength: 10,
                errorText: _error,
              ),
              const Spacer(),
              PrimaryButton(
                label: 'Send OTP',
                isLoading: isLoading,
                onPressed: isLoading ? null : _send,
              ),
              const Gap(10),
              Text(
                'By continuing you agree to our terms and privacy policy.',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const Gap(8),
            ],
          ),
        ),
      ),
    );
  }
}

