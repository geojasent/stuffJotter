import { useState, ChangeEvent, useEffect } from "react";
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
  formInvalid: boolean;
  formType: string;
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
  formInvalid: true,
  formType: "",
};

export default function LocationCardDialog({ closeDialog, ...prop }: any) {
  const [data, setData] = useState(prop || initialFormData);
  const [isInputInvalid, setInputInvalid] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [open, setOpen] = useState(prop.edit || false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (closeDialog) {
      closeDialog();
    }
    setOpen(false);
  };

  const resetFormData = () => {
    setData(initialFormData);
  };

  const area: string = prop.area;
  const word = area.split(" ");
  for (let i = 0; i < word.length; i++) {
    word[i] = word[i][0].toUpperCase() + word[i].slice(1).toLowerCase();
  }
  const areaTitle = word.join(" ");

  function updateFields(fields: Partial<formData>) {
    setData((prev: any) => {
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
    e.stopPropagation();

    handleClose();
    updateFields({ place: e.currentTarget.id });

    if (prop.formType === "create") {
      // handle file post request
      const fileData = new FormData();
      fileData.append("upload-photo", selectedFile);
      (async () => {
        try {
          await fetch(
            `http://localhost:5000/${1}/${prop.area.toLowerCase()}/${
              data.item
            }/${data.itemFilename}`,
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
      //handle new item
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
    }

    if (prop.formType === "edit") {
      (async () => {
        try {
          await fetch(
            `http://localhost:5000/dashboard/edit/${1}/${prop.area.toLowerCase()}/${
              prop.itemId
            }`,
            {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      })();
    }
  };

  useEffect(() => {
    data.item && data.itemQuantity && data.purchasePrice && data.itemDescription
      ? setInputInvalid(false)
      : setInputInvalid(true);
  }, [data.item, data.itemQuantity, data.purchasePrice, data.itemDescription]);

  return (
    <div>
      {!prop.edit ? (
        <IconButton aria-label="add" size="small" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      ) : null}
      <Dialog open={open} onClose={handleClose}>
        <form method="post" id={area.toLowerCase()} onSubmit={handleSubmit}>
          <DialogTitle>
            {prop.edit ? `${areaTitle}: ${prop.item}` : `New ${prop.area} Item`}
          </DialogTitle>
          <DialogContent>
            <LocationCardDialogForm
              {...data}
              updateFields={updateFields}
              handleAddFile={handleAddFile}
            />
          </DialogContent>
          <DialogActions>
            {prop.edit ? (
              <div>
                <Button
                  onClick={() => {
                    handleClose();
                    resetFormData();
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={isInputInvalid} type="submit">
                  Edit
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    handleClose();
                    resetFormData();
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={isInputInvalid} type="submit">
                  Add
                </Button>
              </div>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
