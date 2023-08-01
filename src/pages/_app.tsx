import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SessionProvider } from "../Components/auth/SessionProvider";
import { type ServerSession } from "~/server/auth";
import Layout from "~/Components/Layout";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: ServerSession | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <SessionProvider>
      <Layout>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
