import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthShell from "../../Components/auth/AuthShell";
import PrimaryButton from "../../shared/buttons/PrimaryButtons";

interface LocationState {
  email?: string;
}

const ForgotPasswordSentPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const email = state.email ?? "your email address";

  return (
    <AuthShell>
      <div className="flex h-full max-w-md flex-col justify-center">
        <div className="mb-10 flex h-24 w-24 items-center justify-center self-center rounded-full border-4 border-blue-100 bg-blue-50 text-3xl">
          📩
        </div>

        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Mail Sent!
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center max-w-sm mx-auto">
          We have sent an email to <span className="font-medium">{email}</span>.
          Please verify and reset your password.
        </p>

        <div className="mt-8">
          <PrimaryButton fullWidth>
            Check mail →
          </PrimaryButton>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Didn&apos;t receive the mail?{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:underline"
          >
            Try again
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default ForgotPasswordSentPage;
