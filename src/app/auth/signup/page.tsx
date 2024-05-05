import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <SignUp routing="hash" />
  );
}

export default SignUpPage;