import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

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
      <TuneIcon
        sx={{ mt: "3px", width: "30px", height: "30px" }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>Customize Timer.</DialogContent>
        <DialogContent>
          {content} <div style={{ fontSize: "10px" }}>Max 60 minutes</div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CustomizableDialog;
