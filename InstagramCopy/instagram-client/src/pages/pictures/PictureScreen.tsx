import { Button } from "antd";
import { useEffect, useState } from "react";
import { useHttpContext } from "../../context/HttpContext";
import PictureForm from "./PictureForm";

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [open, setOpen] = useState<boolean>(false);

  const getPictures = async () => {
    const result = await get("/picture");
    console.log("pictures", result);
  };

  useEffect(() => {
    //getPictures();
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>
      <PictureForm open={open} setOpen={setOpen} />
    </>
  );
};

export default PictureScreen;
