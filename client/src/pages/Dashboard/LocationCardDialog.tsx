import { useState, ChangeEvent } from "react";
import LocationCardDialogForm from "./LocationCardDialogForm";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface formData {
  location: string;
  item: string;
  itemQuantity: number;
  purchasePrice: number;
  totalAmount: number;
  datePurchased: Date;
  itemDescription: string;
  itemPurchaseProof: any;
}

const initialFormData: formData = {
  location: "",
  item: "",
  itemQuantity: 0,
  purchasePrice: 0,
  totalAmount: 0,
  datePurchased: new Date(),
  itemDescription: "",
  itemPurchaseProof: "",
};

export default function LocationCardModal(prop: any) {
  const [data, setData] = useState(initialFormData);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const area: string = prop.area;

  function updateFields(fields: Partial<formData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submitted" + area);
    const formData = new FormData();
    formData.append("purchaseProof", data.itemPurchaseProof);
    e.preventDefault();
    // (async () => {
    //   try {
    //     await fetch("http://localhost:5000/", {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(location),
    //     });
    //     window.location.reload();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
  }

  return (
    <div>
      <IconButton aria-label="add" size="small" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form method="post" id={area.toLowerCase()} onSubmit={handleSubmit}>
          <DialogTitle>New {area} Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <LocationCardDialogForm {...data} updateFields={updateFields} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
