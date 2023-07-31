import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SessionProvider } from "../Components/auth/SessionProvider";
import { type ServerSession } from "~/server/auth";
import Layout from "~/Components/Layout";

const MyApp: AppType<{ session: ServerSession | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
