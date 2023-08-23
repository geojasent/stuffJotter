import { useState, ChangeEvent, useEffect } from "react";
import LocationCardDialogForm from "./LocationCardDialogForm";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface formData {
  place: string;
  fileId: undefined | number;
  itemId: undefined | number;
  item: string;
  itemQuantity: string;
  purchasePrice: string;
  totalAmount: string;
  datePurchased: any;
  itemDescription: string;
  itemFilename: string;
  itemFilePath: any;
  formInvalid: boolean;
  formType: string;
}

const initialFormData: formData = {
  place: "",
  fileId: 0,
  itemId: 0,
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemFilename: "",
  itemFilePath: "",
  formInvalid: true,
  formType: "",
};

export default function LocationCardDialog({ closeDialog, ...prop }: any) {
  const [data, setData] = useState(prop || initialFormData);
  const [isInputInvalid, setInputInvalid] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [open, setOpen] = useState(prop.edit || false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fileData = new FormData();

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
    window.location.reload();
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
    setSelectedFile(uploadedFile);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    handleClose();
    updateFields({ place: e.currentTarget.id });

    const postItemRequest = async () => {
      try {
        await fetch(
          `http://localhost:5000/postItem/${1}/${prop.area.toLowerCase()}/null`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        ).then(() => window.location.reload());
      } catch (err) {
        console.log(err);
      }
    };

    const postItemAndFileRequest = async (filePath: string | null) => {
      try {
        await fetch(
          `http://localhost:5000/postItem/${1}/${prop.area.toLowerCase()}/${filePath}`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((item) => postFileRequest(item));
      } catch (err) {
        console.log(err);
      }
    };

    const postFileRequest = async (item_id: number) => {
      fileData.append("upload-photo", selectedFile);
      try {
        await fetch(
          `http://localhost:5000/dashboard/postFile/${1}/${prop.area.toLowerCase()}/${item_id}`,
          {
            method: "post",
            body: fileData,
          }
        )
          .then((res) => res.json())
          .then((filePath) => {
            if (filePath) putItemRequest(filePath, item_id);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const putItemRequest = async (filePath: string | null, item_Id: number) => {
      console.log(data);
      try {
        await fetch(
          `http://localhost:5000/dashboard/edit/putItem/${1}/${prop.area.toLowerCase()}/${item_Id}/${filePath}`,
          {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        ).then(() => window.location.reload());
      } catch (err) {
        console.log(err);
      }
    };

    //file put request then use res as item put request
    const putItemAndFileRequest = async () => {
      try {
        fileData.append("upload-photo", selectedFile);
        await fetch(
          `http://localhost:5000/dashboard/edit/putItemAndFile/${1}/${prop.area.toLowerCase()}/${
            prop.itemId
          }/${prop.itemFilePath}`,
          {
            method: "put",
            body: fileData,
          }
        )
          .then((res) => res.json())
          .then((filePath) => putItemRequest(filePath, data.itemId));
      } catch (err) {
        console.log(err);
      }
    };

    //handle post request from dashboard page
    if (prop.formType === "create" && selectedFile) {
      postItemAndFileRequest(null);
    } else if (prop.formType === "create" && !selectedFile) {
      postItemRequest();
    }

    //handle put request from edit page
    if (prop.formType === "edit" && selectedFile) {
      putItemAndFileRequest();
    } else if (prop.formType === "edit" && !selectedFile) {
      putItemRequest(prop.itemFilePath, prop.itemId);
    }
  };

  useEffect(() => {
    data.item && data.itemQuantity && data.purchasePrice && data.itemDescription
      ? setInputInvalid(false)
      : setInputInvalid(true);
  }, [
    data.item,
    data.itemQuantity,
    data.purchasePrice,
    data.itemDescription,
    data.itemFilePath,
  ]);

  return (
    <div>
      {!prop.edit ? (
        <IconButton aria-label="add" size="small" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      ) : null}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
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
