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

interface formProps extends formData {
  updateFields: (fields: Partial<formData>) => void;
  handleAddFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationCardDialogForm({
  itemQuantity,
  purchasePrice,
  totalAmount,
  itemFilename,
  updateFields,
  handleAddFile,
}: formProps) {
  function calculateTotal(purchasePrice: string, itemQuantity: string) {
    let total = (Number(purchasePrice) * Number(itemQuantity)).toString();
    updateFields({ totalAmount: total });
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <TextField
        id="item-name"
        label="Item"
        sx={{ m: 1, width: "25ch" }}
        variant="standard"
        required
        onChange={(e) => updateFields({ item: e.target.value })}
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
        required
        onChange={(e) => {
          calculateTotal(purchasePrice, e.target.value);
          updateFields({ itemQuantity: e.target.value });
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <TextField
          id="standard-adornment-purchasePrice"
          label="Purchase Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          variant="standard"
          type="number"
          required
          onChange={(e) => {
            updateFields({ purchasePrice: e.target.value });
            calculateTotal(e.target.value, itemQuantity);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-totalAmount">
          Total Amount
        </InputLabel>
        <Input
          id="standard-adornment-totalAmount"
          disabled
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={(e) => updateFields({ totalAmount: e.target.value })}
          value={totalAmount}
        />
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Purchased"
          slotProps={{
            textField: {
              required: true,
            },
          }}
          onChange={(newValue) => updateFields({ datePurchased: newValue })}
        />
      </LocalizationProvider>
      <TextField
        id="standard-multiline-flexible-itemDescription"
        label="Description"
        fullWidth
        maxRows={4}
        variant="standard"
        required
        sx={{ m: 1, width: "52ch" }}
        onChange={(e) => updateFields({ itemDescription: e.target.value })}
      />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={(e) => handleAddFile(e)}
        />

        <Button color="info" variant="contained" component="span">
          Upload Receipt
        </Button>
        {" " + itemFilename}
      </label>
    </Box>
  );
}
