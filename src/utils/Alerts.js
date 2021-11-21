import { Alert, AlertTitle, Snackbar } from "@material-ui/core";

function SuccessAlert({ open, onClose, htmlText }) {
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={onClose}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success!</AlertTitle>
        {htmlText}
      </Alert>
    </Snackbar>
  );
}

function ErrorAlert({ open, onClose, htmlText }) {
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={onClose}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>Error</AlertTitle>
        {htmlText}
      </Alert>
    </Snackbar>
  );
}

function InfoAlert({ open, onClose, htmlText }) {
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={onClose}>
      <Alert severity="info" sx={{ width: "100%" }}>
        <AlertTitle>Hey!</AlertTitle>
        {htmlText}
      </Alert>
    </Snackbar>
  );
}

export { SuccessAlert, ErrorAlert, InfoAlert };
