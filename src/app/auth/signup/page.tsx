import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <SignUp routing="hash" forceRedirectUrl="/chat" />
  );
}

export default SignUpPage;