export interface ServerSession {
  id: string;
  username: string;
  expires: Date;
  sessionToken: string;
}
