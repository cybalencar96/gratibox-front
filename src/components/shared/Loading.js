import { useState } from "react";
import { Modal, Box, CircularProgress } from "@material-ui/core";

const boxStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  bgcolor: "rgb(183, 115, 235, 0.5)",
};

export default function Loading() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}
