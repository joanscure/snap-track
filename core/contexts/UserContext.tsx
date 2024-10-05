import { UserContext, UserContextDefault } from "@/interfaces/user";
import React, { useContext, useState } from "react";

interface Guest {
  user: UserContext;
  setUser: (value: Partial<UserContext>) => void;
}

type Context = Guest | null;

export const GuestContext = React.createContext<Context>(null);

export const useUserContext = (): Guest => {
  const guestContext = useContext(GuestContext);
  if (!guestContext) {
    throw new Error("Using auth context outside of the provider");
  }
  return guestContext;
};

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserContext>(UserContextDefault);
  const _setUserGuest = React.useCallback(
    async (value: Partial<UserContext>) => {
      setUser({
        ...user,
        ...value,
      });
    },
    [user]
  );

  const guestContext = React.useMemo(
    () => ({
      setUser: _setUserGuest,
      user,
    }),
    [_setUserGuest, user]
  );

  return (
    <GuestContext.Provider value={guestContext}>
      {children}
    </GuestContext.Provider>
  );
};
