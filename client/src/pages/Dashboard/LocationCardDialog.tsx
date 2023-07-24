import { useState, ChangeEvent } from "react";
import LocationCardDialogForm from "./LocationCardDialogForm";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface formData {
  place: string;
  item: string;
  itemQuantity: string;
  purchasePrice: string;
  totalAmount: string;
  datePurchased: any;
  itemDescription: string;
  itemPurchaseProof: any;
  itemFilename: string;
}

const initialFormData: formData = {
  place: "",
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemPurchaseProof: "",
  itemFilename: "",
};

export default function LocationCardDialog(prop: any) {
  const [data, setData] = useState(initialFormData);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    updateFields({ place: prop.area.toLowerCase() });
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
  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const uploadedFile = e.target.files[0];
    const { name } = uploadedFile;
    updateFields({ itemFilename: name });
    updateFields({ itemPurchaseProof: uploadedFile });
    setSelectedFile(uploadedFile);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFields({ place: e.currentTarget.id });

    //handle file post request
    const fileData = new FormData();
    fileData.append("upload-photo", selectedFile);

    (async () => {
      try {
        await fetch(
          `http://localhost:5000/${1}/${prop.area.toLowerCase()}/${data.item}/${
            data.itemFilename
          }`,
          {
            method: "post",
            body: fileData,
          }
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    })();

    //handle form post request
    (async () => {
      try {
        await fetch(`http://localhost:5000/${1}/${prop.area.toLowerCase()}`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div>
      <IconButton aria-label="add" size="small" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form method="post" id={area.toLowerCase()} onSubmit={handleSubmit}>
          <DialogTitle>New {area} Item</DialogTitle>
          <DialogContent>
            <LocationCardDialogForm
              {...data}
              updateFields={updateFields}
              handleAddFile={handleAddFile}
            />
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
