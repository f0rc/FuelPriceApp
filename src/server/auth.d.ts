export interface ServerSession {
  id: string;
  expires: Date;
  sessionToken: string;
  User: User;
}

export interface User {
  id: string;
  username: string;
  profileComplete: boolean;
  // add more things to the user also add in ./utils/session.ts
}
