import { createContext, useState, FC, Dispatch, useEffect } from "react";
import { auth } from "DB/FirebaseDB";

interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<boolean>;
}

export const LoginContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
});

const AuthContextProvider: FC = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default AuthContextProvider;
