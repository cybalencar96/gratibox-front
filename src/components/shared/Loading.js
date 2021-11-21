import { Box, CircularProgress } from "@material-ui/core";

const boxStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  bgcolor: "#6d7ce4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px",
};

export default function Loading() {
  return (
    <Box sx={boxStyle}>
      <CircularProgress size={100} />
    </Box>
  );
}

function ButtonLoading() {
  return <CircularProgress size={30} color="info" />;
}

export { ButtonLoading };
