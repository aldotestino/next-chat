import { SignIn } from '@clerk/nextjs';

function SignInPage() {
  return (
    <SignIn routing="hash" forceRedirectUrl="/chat" />
  );
}

export default SignInPage;