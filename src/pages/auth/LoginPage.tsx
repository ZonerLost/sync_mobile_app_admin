import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../Components/auth/AuthShell";
import TextField from "../../shared/form/TextField";
import PasswordField from "../../shared/form/PasswordField";
import PrimaryButton from "../../shared/buttons/PrimaryButtons";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Enter both email and password to continue.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real backend call
      // const res = await api.post("/auth/login", { email, password });
      await new Promise((r) => setTimeout(r, 800));

      login({
        token: "dev-token", // replace with real token
        user: { id: "admin-user", name: "Admin", email },
        remember: rememberMe,
      });

      const redirectTo =
        (location.state as { from?: string })?.from ?? "/dashboard";

      navigate(redirectTo, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="w-full my-auto">
        <h1 className="mt-10 text-xl font-semibold text-gray-900">
          Admin Login 
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Please enter the admin credentials to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-1 flex items-center justify-between text-sm">
            <label className="inline-flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-700"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={loading}
              disabled={!email || !password}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Continue
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
