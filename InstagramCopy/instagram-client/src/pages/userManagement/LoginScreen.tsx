import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { message } from "antd";
import axios from "axios";
import React from "react";

interface Props {}

const LoginScreen: React.FC<Props> = (props: Props) => {
  const handleLoginSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        tokenId: credentialResponse.credential,
      });
      message.success("Login successful!");
      console.log(res.data);
    } catch (error) {
      message.error("Login failed!");
      console.error(error);
    }
  };

  const handleLoginFailure = () => {
    message.error("Login failed!");
  };
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginScreen;
