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

export default function CardActionsDialog({ handleDialogClose, ...prop }: any) {
  const [open, setOpen] = useState(prop.open || false);
  const [fileName, setFileName] = useState("server filename" || "null");
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
    console.log(selectedFile);
  };

  const putFile = async (location: string) => {
    const accessToken = await getAccessTokenSilently();
    fileData.append("upload-photo", selectedFile);
    try {
      await fetch(`http://localhost:5000/locations/putFile/${1}/${location}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: fileData,
      })
        .then((res) => res.json())
        .then((filePath) => console.log(filePath));
    } catch (err) {
      console.log(err);
    }
  };

  const word = prop.location.split(" ");
  for (let i = 0; i < word.length; i++) {
    word[i] = word[i][0].toUpperCase() + word[i].slice(1).toLowerCase();
  }
  const areaTitle = word.join(" ");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle> {areaTitle}</DialogTitle>
      {prop.action === "photo" && (
        <Box>
          {/* <form method="put" id={prop.location} onSubmit={putFile}> */}
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
              <Button color="info" variant="contained" component="span">
                Select Photo
              </Button>
            </label>
            {fileName !== "null" ? " " + fileName : ""}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                // resetFormData();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              type="submit"
              onClick={() => {
                putFile(prop.location);
                handleClose();
              }}
            >
              Upload
            </Button>
          </DialogActions>
          {/* </form> */}
        </Box>
      )}
      {prop.action === "rename" && <DialogContent>rename</DialogContent>}
      {prop.action === "delete" && <DialogContent>delete</DialogContent>}
    </Dialog>
  );
}
