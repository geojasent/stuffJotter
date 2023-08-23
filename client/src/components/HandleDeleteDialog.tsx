import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function HandleDeleteDialog({
  closeDialog,
  handleDelete,
  data,
}: any) {
  const [open] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    closeDialog();
  };

  const deleteRow = () => {
    handleDelete();
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <form>
        <DialogContent>
          Are you sure you want to delete:
          {<h4 style={{ margin: "15px 0px 0px 0px" }}>{data.item}</h4>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteRow}>Yes</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
