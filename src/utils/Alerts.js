import { Alert, AlertTitle, Snackbar } from "@material-ui/core";

function SuccessAlert({ open, onClose, htmlText }) {
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={onClose}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success!</AlertTitle>
        {htmlText || (
          <>
            Yeey!! The action was <strong>successfully completed</strong>!
          </>
        )}
      </Alert>
    </Snackbar>
  );
}

function ErrorAlert({ open, onClose, htmlText }) {
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={onClose}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>Error</AlertTitle>
        {htmlText || (
          <>
            Opss... The action was <strong>not completed</strong>!
          </>
        )}
      </Alert>
    </Snackbar>
  );
}

export { SuccessAlert, ErrorAlert };
