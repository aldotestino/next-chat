import AuthNavbar from '@/components/auth-navbar';
import React, { Children } from 'react';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-screen-md mx-auto space-y-16 px-4 md:px-0">
      <AuthNavbar />
      <main className="flex justify-center">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;