import 'package:flutter/material.dart';

class OtpInput extends StatefulWidget {
  const OtpInput({
    super.key,
    required this.length,
    required this.onCompleted,
    this.onChanged,
    this.enabled = true,
  });

  final int length;
  final ValueChanged<String> onCompleted;
  final ValueChanged<String>? onChanged;
  final bool enabled;

  @override
  State<OtpInput> createState() => _OtpInputState();
}

class _OtpInputState extends State<OtpInput> {
  late final List<TextEditingController> _controllers;
  late final List<FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(widget.length, (_) => TextEditingController());
    _focusNodes = List.generate(widget.length, (_) => FocusNode());
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    for (final f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  void _emit() {
    final value = _controllers.map((c) => c.text).join();
    widget.onChanged?.call(value);
    if (value.length == widget.length) widget.onCompleted(value);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(widget.length, (index) {
        return SizedBox(
          width: 48,
          child: TextField(
            controller: _controllers[index],
            focusNode: _focusNodes[index],
            enabled: widget.enabled,
            keyboardType: TextInputType.number,
            textInputAction: index == widget.length - 1 ? TextInputAction.done : TextInputAction.next,
            textAlign: TextAlign.center,
            maxLength: 1,
            style: theme.textTheme.titleLarge,
            decoration: const InputDecoration(counterText: ''),
            onChanged: (v) {
              if (v.isNotEmpty && index < widget.length - 1) {
                _focusNodes[index + 1].requestFocus();
              }
              if (v.isEmpty && index > 0) {
                _focusNodes[index - 1].requestFocus();
              }
              _emit();
            },
          ),
        );
      }),
    );
  }
}

