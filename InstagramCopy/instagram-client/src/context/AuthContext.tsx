/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, FC, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RETURN_URL_LOCAL_STORAGE_KEY,
  TOKEN_LOCAL_STORAGE_KEY,
  USER_EMAIL_LOCAL_STORAGE_KEY,
  USERNAME_LOCAL_STORAGE_KEY,
} from "../config/constants/cacheConstants";
import { LoginDto } from "../pages/userManagement/LoginDtos";
import { routes } from "../routes/paths";

interface Props {
  children: ReactElement | null;
}

export interface IUseAuthValues {
  userEmail?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  initializeLogin: (returnUrl?: string) => Promise<void> | void;
  onLoginSuccess: (loginDto: LoginDto | undefined) => Promise<void> | void;
  logout: () => Promise<void> | void;
}

const defaultState: IUseAuthValues = {
  initializeLogin: (returnUrl?: string) => {
    throw new Error("Function not implemented!");
  },
  onLoginSuccess: (loginDto: LoginDto | undefined) => {
    throw new Error("Function not implemented!");
  },
  logout: () => {
    throw new Error("Function not implemented!");
  },
};

const AuthContext = createContext<IUseAuthValues>(defaultState);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const initializeLogin = (returnUrl?: string): Promise<void> | void => {
    if (returnUrl && returnUrl !== routes.ROUTE_LOGIN) {
      window.localStorage.setItem(RETURN_URL_LOCAL_STORAGE_KEY, returnUrl);
    }
    logout();
  };

  const onLoginSuccess = (
    loginDto: LoginDto | undefined
  ): Promise<void> | void => {
    if (!loginDto) return;

    const newEmail = loginDto.email;
    const newUsername = loginDto.username;
    const newAccessToken = loginDto.accessToken;

    if (newEmail !== userEmail) {
      window.localStorage.setItem(USER_EMAIL_LOCAL_STORAGE_KEY, newEmail);
      setUserEmail(newEmail);
    }
    if (newUsername !== username) {
      window.localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, newUsername);
      setUsername(newUsername);
    }
    if (newAccessToken !== accessToken) {
      window.localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, newAccessToken);
      setAccessToken(newAccessToken);
    }

    const returnUrl = window.localStorage.getItem(RETURN_URL_LOCAL_STORAGE_KEY);

    if (returnUrl && returnUrl !== routes.ROUTE_LOGIN) {
      window.localStorage.removeItem(RETURN_URL_LOCAL_STORAGE_KEY);
      navigate(returnUrl);
    } else {
      navigate(routes.ROUTE_MAIN);
    }
  };

  const logout = (): Promise<void> | void => {
    window.localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(USER_EMAIL_LOCAL_STORAGE_KEY);
    window.sessionStorage.clear();
    setAccessToken(undefined);
    setUserEmail(undefined);
    setUsername(undefined);
    return navigate(routes.ROUTE_LOGIN);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          userEmail,
          username,
          accessToken,
          initializeLogin,
          onLoginSuccess,
          logout,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};
