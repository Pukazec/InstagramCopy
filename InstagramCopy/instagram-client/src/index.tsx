import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { HttpContextProvider } from "./context/HttpContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
      <AuthContextProvider>
        <HttpContextProvider>
          <App />
        </HttpContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
