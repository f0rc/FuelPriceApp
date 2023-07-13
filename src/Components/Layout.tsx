import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";
import { useSession } from "~/pages/auth/SessionProvider";
import { api } from "~/utils/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession();
  // const router = useRouter();

  const { mutateAsync } = api.auth.logout.useMutation({
    onSuccess: () => {
      console.log("logged out");
      window.location.href = "/";
    },
  });

  const handleLogout = async () => {
    await mutateAsync();
  };
  return (
    <div className="flex min-h-screen flex-col bg-[#EFEFF1]">
      <nav className="flex h-20 flex-row justify-center border-b border-black">
        <div className="flex w-full max-w-[95rem] items-center justify-between">
          <ul className="flex flex-row items-center gap-4 text-center align-middle text-xl font-medium">
            <Link href="/" className="mb-1 pr-4 text-2xl font-semibold">
              [FUEL]
            </Link>
            <Link href="/newquote">New Quote</Link>
            <Link href="/history">Quote History</Link>
            <Link href="/about">About</Link>
            <Link href="/profile">Profile</Link>
          </ul>

          {
            // conditional rendering of login/logout buttons based on session
            session && session.sessionToken ? (
              <div className="flex flex-row gap-4 pr-10">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-[#303133] px-4 py-2 font-semibold text-[#EFEFF1] hover:bg-dark-color/90 focus:ring-4 focus:ring-[#FFDA18] focus:ring-opacity-50"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-4 pr-10">
                <Link
                  href="/auth/login"
                  className="rounded-2xl bg-[#303133] px-4 py-2 font-semibold text-[#EFEFF1] hover:bg-dark-color/90 focus:ring-4 focus:ring-[#FFDA18] focus:ring-opacity-50"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-2xl bg-[#FFDA18] px-4 py-2 font-semibold hover:bg-yellow-300 focus:ring-4 focus:ring-[#303133] focus:ring-opacity-90"
                >
                  Sign Up
                </Link>
              </div>
            )
          }
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
