// RoomContext.tsx
import React, { useState } from 'react';

export type UserInfo = {
  name?: string;
  id?: number;
  loggedIn: boolean;
}

interface SessionContextProps {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}

// Provide a definite type for the context and default values
const defaultState: SessionContextProps = {
  user: { loggedIn: false },
  setUser: () => {},  // This is a no-op function, as the default setter should never actually be called
};

const SessionContext = React.createContext<SessionContextProps>(defaultState);

export const SessionProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>({ loggedIn: false });

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
