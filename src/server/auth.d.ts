export interface ServerSession {
  user?: {
    id: string;
    email: string;
    username?: string;
  } & DefaultSession["user"];
  expires: Date;
  sessionToken: string;
}

export interface DefaultSession {
  user: {
    email: string;
    // add more properties here
  };
}
