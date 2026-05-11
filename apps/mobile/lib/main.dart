import 'package:flutter/material.dart';

void main() {
  runApp(const VyapariApp());
}

class VyapariApp extends StatelessWidget {
  const VyapariApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Vyapari OS',
      home: const Scaffold(
        body: Center(child: Text('Vyapari OS')),
      ),
    );
  }
}

