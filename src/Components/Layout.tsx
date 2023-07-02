import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";
import { useSession } from "~/pages/auth/SessionProvider";
import { api } from "~/utils/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {session} = useSession();
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

  const baseRoutes = [
    { path: "/", label: "Home", isNav: false },
    { path: "signup", label: "Signup", isNav: false },
    { path: "login", label: "Login", isNav: false },
    { path: "/about", label: "About", isNav: true },
  ]

  const authRoutes = [
    
    { path: "/newquote", label: "New Quote", isNav: true },
    { path: "/history", label: "Quote History", isNav: true },
    
    { path: "/profile", label: "Profile", isNav: true },
    ...baseRoutes,
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#EFEFF1]">
      <nav className="flex h-20 flex-row border-b border-black justify-center">
        <div className="flex w-full items-center justify-between max-w-[95rem]">
          <ul className="flex flex-row gap-4 text-xl font-medium text-center align-middle items-center">
            <Link href="/" className="pr-4 text-2xl font-semibold mb-1">
              [FUEL]
            </Link>
            {(session && session.sessionToken) ? (
                authRoutes.filter((route) => route.isNav).map((route) => (
                  <li key={route.path}>
                    <Link href={route.path} className="pr-4 text-xl">
                      {route.label}
                    </Link>
                  </li>
                ))
              ) : baseRoutes.filter((route) => route.isNav).map((route) => (
                <li key={route.path}>
                  <Link href={route.path} className="pr-4 text-xl">
                    {route.label}
                  </Link>
                </li>
              ))
            }
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
