import { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  InputLabel,
  InputAdornment,
  FormControl,
  Input,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

interface formProps extends formData {
  updateFields: (fields: Partial<formData>) => void;
}

export default function LocationCardDialogForm({
  location,
  item,
  itemQuantity,
  purchasePrice,
  totalAmount,
  datePurchased,
  itemDescription,
  itemPurchaseProof,
  updateFields,
}: formProps) {
  //   const [itemName, setItemName] = useState<string>("");
  //   const [itemQuantity, setItemQuantity] = useState<number>(0);
  //   const [itemAmount, setItemAmount] = useState<number>(0);
  //   const [totalAmount, setTotalAmount] = useState<number>(0);
  //   const [itemDescription, setItemDescription] = useState<string>("");
  //   const [filename, setFilename] = useState("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    updateFields({ itemPurchaseProof: name });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <TextField
        id="item-name"
        label="Item"
        sx={{ m: 1, width: "25ch" }}
        variant="standard"
      />
      <TextField
        id="item-quantity"
        label="Quantity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ m: 1, width: "25ch" }}
        variant="standard"
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-purchasePrice">
          Purchase Price
        </InputLabel>
        <Input
          id="standard-adornment-purchasePrice"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-totalAmount">
          Total Amount
        </InputLabel>
        <Input
          id="standard-adornment-totalAmount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      <TextField
        id="standard-multiline-flexible-itemDescription"
        label="Description"
        fullWidth
        maxRows={4}
        variant="standard"
        sx={{ m: 1, width: "52ch" }}
      />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleFileUpload}
        />

        <Button color="info" variant="contained" component="span">
          Upload Receipt
        </Button>
        {" " + itemPurchaseProof}
      </label>
    </Box>
  );
}
