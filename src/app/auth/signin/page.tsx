import { SignIn } from '@clerk/nextjs';

function SignInPage() {
  return (
    <SignIn routing="hash" />
  );
}

export default SignInPage;