import Link from 'next/link';
import React from 'react';

function AuthNavbar() {
  return (
    <header className="w-full py-4">
      <Link href="/">
        <h1 className="text-lg font-semibold">next-chat</h1>
      </Link>
    </header>
  );
}

export default AuthNavbar;