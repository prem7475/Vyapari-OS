import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md glass rounded-xl2 shadow-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted">Vyapari OS</div>
            <h1 className="text-xl font-semibold tracking-tight">Admin Sign In</h1>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-border grid place-items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-brand" />
          </div>
        </div>

        <div className="mt-6">
          <LoginForm />
        </div>

        <div className="mt-6 text-xs text-subtle leading-relaxed">
          Use your admin credentials. Access is audited and role-restricted.
        </div>
      </div>
    </div>
  );
}

