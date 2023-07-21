import { useState } from "react";
import LocationCardDialogForm from "./LocationCardDialogForm";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface formData {
  location: string;
  item: string;
  itemQuantity: string;
  purchasePrice: string;
  totalAmount: string;
  datePurchased: any;
  itemDescription: string;
  itemPurchaseProof: any;
}

const initialFormData: formData = {
  location: "",
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemPurchaseProof: "",
};

export default function LocationCardDialog(prop: any) {
  const [data, setData] = useState(initialFormData);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    updateFields({ location: prop.area.toLowerCase() });
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
    e.preventDefault(); //refresh to reset form
    updateFields({ location: e.currentTarget.id });
    console.log(data);
    // (async () => {
    //   try {
    //     await fetch("http://localhost:5000/", {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(location),
    //     });
    //     window.location.reload();
    //   } catch (err) {
    //     console.log(err);g
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
