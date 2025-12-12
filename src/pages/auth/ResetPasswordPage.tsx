import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthShell from "../../Components/auth/AuthShell";
import PasswordField from "../../shared/form/PasswordField";
import PrimaryButton from "../../shared/buttons/PrimaryButtons";

type ResetParams = {
  token?: string;
};

const ResetPasswordPage: React.FC = () => {
  useParams<ResetParams>();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: call your real reset endpoint
      // await api.post("/auth/reset-password", { token, password });
      await new Promise((r) => setTimeout(r, 800));
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="max-w-md">
        <h1 className="text-xl font-semibold text-gray-900">
          Reset Password
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Please create your new password and try not to share it with anyone.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <PasswordField
            label="Create new password"
            placeholder="New password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordField
            label="Confirm new password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="pt-1 text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="pt-2">
            <PrimaryButton type="submit" fullWidth loading={loading}>
              Confirm →
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthShell>
  );
};

export default ResetPasswordPage;
