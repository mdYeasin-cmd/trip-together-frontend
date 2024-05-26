import { Breakpoint } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { colors } from "@/constants";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  maxWidth?: Breakpoint;
  fullWidth?: boolean;
};

const TTModal = ({
  open,
  setOpen,
  title,
  children,
  maxWidth = "sm",
  fullWidth = false,
}: TProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth={maxWidth}
      open={open}
      fullWidth={fullWidth}
    >
      <Box sx={{ backgroundColor: colors.PRIMARY }}>
        <DialogTitle sx={{ m: 0, p: 2, color: colors.WHITE }}>
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.WHITE,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default TTModal;
