/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  RETURN_URL_LOCAL_STORAGE_KEY,
  TOKEN_LOCAL_STORAGE_KEY,
  USER_ID_LOCAL_STORAGE_KEY,
  USER_ROLES_LOCAL_STORAGE_KEY,
  USERNAME_LOCAL_STORAGE_KEY,
} from "../config/cacheConstants";
import { routes } from "../routes/paths";
import { localhost } from "./HttpContextModels";

interface Props {
  children: ReactElement | null;
}

export interface IUseAuthValues {
  username?: string;
  userId?: string;
  userRoles?: string[];
  accessToken?: string;
  initializeLogin: (returnUrl?: string) => Promise<void> | void;
  onLoginSuccess: (newAccessToken: string | undefined) => Promise<void> | void;
  logout: () => Promise<void> | void;
}

const defaultState: IUseAuthValues = {
  initializeLogin: (returnUrl?: string) => {
    throw new Error("Function not implemented!");
  },
  onLoginSuccess: (newAccessToken: string | undefined) => {
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
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userRoles, setUserRoles] = useState<string[]>();

  const initializeLogin = (returnUrl?: string): Promise<void> | void => {
    if (returnUrl && returnUrl !== routes.ROUTE_LOGIN) {
      window.localStorage.setItem(RETURN_URL_LOCAL_STORAGE_KEY, returnUrl);
    }
    logout();
  };

  const onLoginSuccess = (
    newAccessToken: string | undefined
  ): Promise<void> | void => {
    if (!newAccessToken) {
      return;
    }

    const decodedToken = jwtDecode<any>(newAccessToken);
    console.log("decodedToken", decodedToken);
    const newUsername =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
    const newUserId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const newUserRoles =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    if (newUsername !== username) {
      window.localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, newUsername);
      setUsername(newUsername);
    }

    window.localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, newUserId);
    setUserId(newUserId);

    window.localStorage.setItem(USER_ROLES_LOCAL_STORAGE_KEY, newUserRoles);
    setUserRoles(newUserRoles);

    if (newAccessToken !== accessToken) {
      window.localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, newAccessToken);
      setAccessToken(newAccessToken);
    }

    const returnUrl = window.localStorage.getItem(RETURN_URL_LOCAL_STORAGE_KEY);
    if (returnUrl && returnUrl !== routes.ROUTE_LOGIN) {
      window.localStorage.removeItem(RETURN_URL_LOCAL_STORAGE_KEY);
      navigate(returnUrl);
    } else {
      navigate(routes.ROUTE_PICTURES, { replace: true });
    }
  };

  const logout = async (): Promise<void> => {
    await axios.get(`${localhost}/Identity/logout`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    window.localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(USERNAME_LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(USER_ID_LOCAL_STORAGE_KEY);
    window.localStorage.removeItem(USER_ROLES_LOCAL_STORAGE_KEY);
    window.sessionStorage.clear();
    setAccessToken(undefined);
    setUsername(undefined);
    return navigate(routes.ROUTE_LOGIN);
  };

  useEffect(() => {
    setUsername(
      window.localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY) ?? undefined
    );
    setAccessToken(
      window.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) ?? undefined
    );
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          username,
          userId,
          userRoles,
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
