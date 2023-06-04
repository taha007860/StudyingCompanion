import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import {Button} from "@mui/material";

const CustomizableDialog = ({ content }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        size="medium"
        variant="outlined"
        sx={{
          backgroundColor:"#EFF7FF",
          borderRadius: "50px",
          borderColor: "White",
          color: "Black",
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
        }}
        onClick={handleClickOpen}>Custom</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {content} <div style={{ fontSize: "10px" }}>Max 120 minutes</div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CustomizableDialog;
