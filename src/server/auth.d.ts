export interface ServerSession {
  id: string;
  email: string;
  username?: string;
  email: string;
  expires: Date;
  sessionToken: string;
}
