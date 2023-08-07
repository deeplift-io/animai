import SignInForm from "../components/forms/sign-in-form";

export default function Page() {
  return (
    <div>
      <div className="text-xl mb-4">Sign in to your account</div>
      <div className="mb-6 leading-2 text-slate-700 font-light">Please sign in to your account to access your dashboard.</div>
      <SignInForm />
    </div>
  );
}
