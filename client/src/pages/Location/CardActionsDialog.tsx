import { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { DialogContentText, TextField } from "@mui/material";

export default function CardActionsDialog({ handleDialogClose, ...prop }: any) {
  const [open, setOpen] = useState(prop.open || false);
  const currentLocation = prop.location;
  const [newLocation, setNewLocation] = useState(prop.location);
  const [fileName, setFileName] = useState("" || "null");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const { getAccessTokenSilently } = useAuth0();

  const fileData = new FormData();

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return;
    } else {
      const uploadedFile = e.target.files?.[0];
      setFileName(uploadedFile.name);
      setSelectedFile(uploadedFile);
    }
  };

  const handleClose = () => {
    handleDialogClose();
    setOpen(false);
  };

  const putFile = async () => {
    const accessToken = await getAccessTokenSilently();
    fileData.append("upload-photo", selectedFile);
    try {
      await fetch(
        `http://localhost:5000/locations/putFile/${1}/${currentLocation}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: fileData,
        }
      ).then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  const renameLocation = async () => {
    const accessToken = await getAccessTokenSilently();
    try {
      const updateLocation = await fetch(
        `http://localhost:5000/locations/${1}/${currentLocation}/${newLocation}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: newLocation,
        }
      );
      updateLocation.json().then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  const removeLocation = async () => {
    console.log("remove");
    const accessToken = await getAccessTokenSilently();
    try {
      const deleteLocation = await fetch(
        `http://localhost:5000/locations/${1}/${currentLocation}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      deleteLocation.json().then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  const word = currentLocation.split(" ");
  for (let i = 0; i < word.length; i++) {
    word[i] = word[i][0].toUpperCase() + word[i].slice(1).toLowerCase();
  }
  const areaTitle = word.join(" ");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      {prop.action === "photo" && (
        <Box sx={{ width: "315px" }}>
          <DialogTitle> {areaTitle}</DialogTitle>
          <DialogContent>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => {
                  handleAddFile(e);
                  setDisabled(false);
                }}
              />
              <DialogContentText sx={{ marginBottom: "16px" }}>
                Select the photo you want displayed for the {areaTitle}.
              </DialogContentText>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Button color="info" variant="contained" component="span">
                  Select Photo
                </Button>
                {fileName !== "null" ? " " + fileName : ""}
              </div>
            </label>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              onClick={() => {
                putFile();
                handleClose();
              }}
            >
              Upload
            </Button>
          </DialogActions>
        </Box>
      )}
      {prop.action === "rename" && (
        <Box sx={{ width: "315px" }}>
          <DialogTitle>Rename {areaTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Renaming will change all the items in the {areaTitle} to the new
              location.
            </DialogContentText>
            <TextField
              id="location-name"
              label="Location"
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              placeholder={areaTitle}
              required
              onChange={(e) => {
                setDisabled(false);
                setNewLocation(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              onClick={() => {
                renameLocation();
                handleClose();
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      )}
      {prop.action === "remove" && (
        <Box sx={{ width: "315px" }}>
          <DialogTitle>Remove {areaTitle}?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove {areaTitle}? All items in{" "}
              {areaTitle} will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "red" }}
              onClick={() => {
                removeLocation();
                handleClose();
              }}
            >
              Remove
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}
