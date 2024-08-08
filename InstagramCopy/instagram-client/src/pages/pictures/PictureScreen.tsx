import { Button } from "antd";
import { useState } from "react";
import PictureForm from "./PictureForm";

const PictureScreen: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>
      <PictureForm open={open} setOpen={setOpen} />
    </>
  );
};

export default PictureScreen;
