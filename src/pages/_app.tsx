import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SessionProvider } from "./auth/SessionProvider";
import { type ServerSession } from "~/server/auth";

const MyApp: AppType<{ session: ServerSession | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
