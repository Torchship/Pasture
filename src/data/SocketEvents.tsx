export interface ServerToClientEvents {
  raw: (msg: string) => void;
  echo: (command: string) => void;
}

export interface ClientToServerEvents {
  login: (username: string, password: string, callback: (msg: string) => void) => void;
  get: (data: string, callback: (msg: string) => void) => void;
  query: (data: string, params: any, callback: (msg: string) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}