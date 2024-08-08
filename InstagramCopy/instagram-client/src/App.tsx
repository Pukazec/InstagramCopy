import moment from "moment";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { routeElements } from "./routes/routeElements";

const App: React.FC = () => {
  useEffect(() => {
    //Set local time to start week with monday.
    moment.locale("en", {
      week: {
        dow: 1,
      },
    });
  }, []);

  const routing = useRoutes(routeElements);

  return <>{routing}</>;
};

export default App;
