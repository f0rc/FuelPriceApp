import {
  createContext,
  type ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { type ServerSession } from "~/server/auth";
import { api } from "~/utils/api";

export const AuthContext = createContext<{
  session: ServerSession | null;
  setSession: (session: ServerSession | null) => void;
}>({
  session: null,
  setSession: () => {
    throw new Error("not implemented");
  },
});

export function SessionProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<ServerSession | null>(null);

  const { data: sessionToken } = api.auth.getSession.useQuery();

  useEffect(() => {
    // console.log("calling sesstion use effect");
    // console.log("session", session?.sessionToken);
    setSession(sessionToken || null);
  }, [sessionToken]);

  return (
    <AuthContext.Provider value={{ session: session, setSession: setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  // maybe add setUser ?!
  const { session } = useContext(AuthContext);

  return { session };
}

type AuthProviderProps = {
  children: ReactNode;
};
