/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, notification, Spin } from "antd";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { TOKEN_LOCAL_STORAGE_KEY } from "../config/constants/cacheConstants";
import { useAuthContext } from "./AuthContext";
import { RequestType } from "./HttpContextModels";

interface Props {
  children: ReactElement | null;
}

export interface IUseHttpValues {
  get: <T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
  post: <T>(
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
  put: <T>(
    url: string,
    body?: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
  delete: <T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
  setLoading: (newState: boolean) => void;
  getIdentity: <T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
  postIdentity: <T>(
    url: string,
    body: any,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => Promise<T | undefined>;
}

const defaultState: IUseHttpValues = {
  get: (
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
  post: (
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
  put: (
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
  delete: (
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
  setLoading: (newState: boolean) => {
    throw new Error("Function not implemented!");
  },
  getIdentity: (
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
  postIdentity: (
    url: string,
    body: any,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ) => {
    throw new Error("Function not implemented!");
  },
};

const HttpContext = createContext<IUseHttpValues>(defaultState);
export const useHttpContext = () => useContext(HttpContext);

export const HttpContextProvider: FC<Props> = (props: Props) => {
  const { accessToken, initializeLogin } = useAuthContext();
  const localhost = "https://localhost:7258";
  const [loading, setLoading] = useState(false);
  const [loadingRequestsNumber, setLoadingRequestsNumber] = useState(0);

  async function get<T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(RequestType.get, url, showLoader, headers);
  }

  async function post<T>(
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.post,
      url,
      showLoader,
      body,
      headers,
      showNotification
    );
  }

  async function put<T>(
    url: string,
    body?: any,
    showLoader?: boolean,
    showNotification?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.put,
      url,
      showLoader,
      body,
      headers,
      showNotification
    );
  }

  async function deleteEntity<T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(RequestType.delete, url, showLoader, headers);
  }

  async function getIdentity<T>(
    url: string,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.getIdentity,
      url,
      showLoader,
      headers
    );
  }

  async function postIdentity<T>(
    url: string,
    body: any,
    showLoader?: boolean,
    headers?: RawAxiosRequestHeaders
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.postIdentity,
      url,
      showLoader,
      body,
      headers
    );
  }

  const handleRequest = async <T,>(
    requestType: RequestType,
    url: string,
    showLoader?: boolean,
    body?: any,
    headers?: RawAxiosRequestHeaders,
    showNotification?: boolean
  ) => {
    let resp: T | undefined = undefined;
    if (showLoader !== false) {
      setLoadingRequestsNumber((prev) => prev + 1);
    }

    if (body?._intermediateData) {
      delete body._intermediateData;
    }

    await executeRequest<T>(requestType, url, body, headers)
      .then((response) => {
        const isIdentityRequest =
          requestType === RequestType.getIdentity ||
          requestType === RequestType.postIdentity;
        const isGetRequest =
          requestType === RequestType.get ||
          requestType === RequestType.getIdentity;

        resp = handleResponse(
          response,
          showNotification ?? !isGetRequest,
          isIdentityRequest
        );
      })
      .catch((reason) => {
        handleResponseError<T>(reason, initializeLogin);
      })
      .finally(() => {
        if (showLoader !== false) {
          setLoadingRequestsNumber((prev) => prev - 1);
        }
      });

    return resp;
  };

  async function executeRequest<T>(
    requestType: RequestType,
    url: string,
    body?: any,
    headers?: RawAxiosRequestHeaders
  ): Promise<any> {
    const currentAccessToken =
      accessToken ?? window.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    switch (requestType) {
      case RequestType.get:
        return await axios.get<T>(
          `${localhost}${url}`,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      case RequestType.post:
        return await axios.post<T>(
          `${localhost}${url}`,
          body,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      case RequestType.put:
        return await axios.put<T>(
          `${localhost}${url}`,
          body,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      case RequestType.delete:
        return await axios.delete<T>(
          `${localhost}${url}`,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      case RequestType.getIdentity:
        return await axios.get<T>(
          `${localhost}${url}`,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      case RequestType.postIdentity:
        return await axios.post<T>(
          `${localhost}${url}`,
          body,
          getGenericRequestConfig(currentAccessToken!, headers)
        );
      default:
        break;
    }
  }

  const handleResponse = <T,>(
    response: any,
    showNotification: boolean = false,
    isIdentityRequest: boolean = false
  ): T | undefined => {
    if (isIdentityRequest) return response.data;
    const dto: T = response.data;
    if (!dto) {
      Modal.error({
        title: "Error!",
      });
    } else {
      if (showNotification) {
        notification.success({
          message: "Success!",
          duration: 3,
        });
      }
      return dto as T;
    }
  };

  const handleResponseError = <T,>(
    reason: any,
    initializeLogin: (returnUrl?: string) => Promise<void> | void
  ): void => {
    if (reason.code === "ERR_NETWORK" || reason.response.status === 401) {
      console.log("error");
      //initializeLogin(window.location.pathname);
    } else if (reason.response.status === 403) {
      Modal.error({
        title: "Unauthorized",
        content: reason.response.data,
      });
    } else if (reason.response.status === 409) {
      Modal.error({
        title: "Concurrent modification",
        content: reason.response.data.message,
      });
    } else if (reason.response.status === 500) {
      Modal.error({
        title: "Internal server error",
      });
    } else if (reason.response.status < 200 || reason.response.status > 299) {
      Modal.error({
        title: "Default http error",
        content: reason.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (loadingRequestsNumber === 0 && loading === true) {
      setLoading(false);
    } else if (loading === false && loadingRequestsNumber > 0) {
      setLoading(true);
    }
  }, [loadingRequestsNumber]);

  return (
    <>
      <Spin
        spinning={loading}
        size="large"
        style={{ zIndex: "1001", maxHeight: "100%" }}
      >
        <HttpContext.Provider
          value={{
            get,
            post,
            put,
            delete: deleteEntity,
            setLoading,
            getIdentity,
            postIdentity,
          }}
        >
          {props.children}
        </HttpContext.Provider>
      </Spin>
    </>
  );
};

const getGenericRequestConfig = (
  accessToken: string,
  headers?: RawAxiosRequestHeaders
): AxiosRequestConfig<any> => {
  const initialHeaders: RawAxiosRequestHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (!headers) {
    return {
      headers: {
        ...initialHeaders,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  } else {
    return {
      headers: {
        ...headers,
        ...initialHeaders,
      },
    };
  }
};
