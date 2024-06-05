import { colors } from "@/constants";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box, Stack, Typography } from "@mui/material";

type TTTAlertProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  onYesClick: () => void;
};

const TTAlert = ({ open, setOpen, message, onYesClick }: TTTAlertProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ backgroundColor: colors.PRIMARY, py: "3px", color: colors.WHITE }}
      >
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Box
            sx={{
              border: `1px solid ${colors.WHITE}`,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 1,
            }}
          >
            <PriorityHighIcon sx={{ fontSize: "12px" }} />
          </Box>
          <Typography component={"span"}>Alert</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <DialogContentText sx={{ py: 5 }} id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pt: 0 }}>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={onYesClick} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TTAlert;
