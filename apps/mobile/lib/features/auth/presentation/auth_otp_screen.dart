import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';
import '../../../widgets/app_bars/vyapari_app_bar.dart';
import '../../../widgets/buttons/primary_button.dart';
import '../../../widgets/inputs/otp_input.dart';
import '../application/auth_controller.dart';

class AuthOtpScreen extends ConsumerStatefulWidget {
  const AuthOtpScreen({super.key, required this.phoneE164});

  final String phoneE164;

  @override
  ConsumerState<AuthOtpScreen> createState() => _AuthOtpScreenState();
}

class _AuthOtpScreenState extends ConsumerState<AuthOtpScreen> {
  String _otp = '';
  String? _error;

  Future<void> _verify() async {
    if (_otp.length != 6) {
      setState(() => _error = 'Enter 6-digit OTP');
      return;
    }

    setState(() => _error = null);
    final ctrl = ref.read(authControllerProvider.notifier);
    await ctrl.verifyOtp(smsCode: _otp);

    final state = ref.read(authControllerProvider);
    if (state.status == AuthStatus.authenticated) {
      if (!mounted) return;
      context.go(AppRoutes.dashboard);
    } else if (state.status == AuthStatus.failure) {
      setState(() => _error = state.errorMessage);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authControllerProvider);
    final isLoading = auth.status == AuthStatus.verifyingOtp;

    return Scaffold(
      appBar: const VyapariAppBar(title: 'Verify OTP'),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('OTP sent to', style: Theme.of(context).textTheme.bodyMedium),
              const Gap(6),
              Text(widget.phoneE164, style: Theme.of(context).textTheme.headlineSmall),
              const Gap(18),
              OtpInput(
                length: 6,
                enabled: !isLoading,
                onChanged: (v) => setState(() => _otp = v),
                onCompleted: (v) => setState(() => _otp = v),
              ),
              if (_error != null) ...[
                const Gap(12),
                Text(_error!, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Theme.of(context).colorScheme.error)),
              ],
              const Spacer(),
              PrimaryButton(
                label: 'Verify & Continue',
                isLoading: isLoading,
                onPressed: isLoading ? null : _verify,
              ),
              const Gap(10),
              Text('Didn’t receive OTP? Resend from previous screen.', style: Theme.of(context).textTheme.bodySmall),
              const Gap(8),
            ],
          ),
        ),
      ),
    );
  }
}

