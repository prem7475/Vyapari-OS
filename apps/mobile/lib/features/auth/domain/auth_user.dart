class AuthUser {
  const AuthUser({
    required this.id,
    required this.phone,
    this.email,
    this.name,
    this.role,
  });

  final String id;
  final String phone;
  final String? email;
  final String? name;
  final String? role;
}

