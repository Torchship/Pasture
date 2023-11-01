export interface ServerToClientEvents {
  raw: (msg: string) => void;
}

export interface ClientToServerEvents {
  login: (username: string, password: string, callback: (msg: string) => void) => void;
  get: (data: string, callback: (msg: string) => void) => void;
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}