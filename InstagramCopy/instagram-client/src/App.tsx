import { Button } from "antd";
import React, { useState } from "react";
import "./App.css";
import PictureForm from "./pages/userManagement/pictures/PictureForm";

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>
      <PictureForm open={open} setOpen={setOpen} />
    </>
  );
};

export default App;
