import AuthNavbar from '@/components/auth-navbar';
import React, { Children } from 'react';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-screen-md mx-auto p-4 space-y-16">
      <AuthNavbar />
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;