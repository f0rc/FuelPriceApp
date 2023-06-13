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
  user: ServerSession | null;
  setUser: (session: ServerSession | null) => void;
}>({
  user: null,
  setUser: () => {
    throw new Error("not implemented");
  },
});

export function SessionProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ServerSession | null>(null);

  const { data: session } = api.auth.getSession.useQuery();

  useEffect(() => {
    // console.log("calling sesstion use effect");
    // console.log("session", session?.sessionToken);
    setUser(session || null);
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  // maybe add setUser ?!
  const { user } = useContext(AuthContext);

  return { user };
}

type AuthProviderProps = {
  children: ReactNode;
};
