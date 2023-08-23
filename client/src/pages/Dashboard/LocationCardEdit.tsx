import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationCardDialog from "./LocationCardDialog";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridEventListener,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";

interface formData {
  place: string;
  itemId: undefined | number;
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
  itemId: undefined,
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemPurchaseProof: "",
  itemFilename: "",
  formInvalid: false,
  formType: "",
};

export default function LocationCardEdit() {
  const [rowData, setRowData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(initialFormData);

  const locationParam = useParams();
  const location = locationParam["location"];

  const handleData = (data: any) => {
    let rows = [];
    for (let item of data) {
      rows.push({
        id: item.item_id,
        item: item.item,
        item_quantity: item.item_quantity,
        item_purchase_price: parseInt(item.item_purchase_price),
        item_total_price: parseInt(item.item_total_price),
        item_purchase_date: item.item_purchase_date.slice(0, 10),
        item_description: item.item_description,
      });
    }
    setRows(rows);
  };

  const getTogglableColumns = (columns: GridColDef[]) => {
    return columns
      .filter(
        (column) =>
          column.field !== "place" &&
          column.field !== "item_file_path" &&
          column.field !== "actions"
      )
      .map((column) => column.field);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogOpen(false);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log("handle delete");
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setDialogOpen(!open);
    let selectedRow = rowData.filter((x: any) => {
      return x.item_id === params.row.id;
    });
    const rowItem = selectedRow[0];
    setSelectedData({
      itemId: rowItem.item_id,
      item: rowItem.item,
      place: rowItem.place,
      itemQuantity: rowItem.item_quantity,
      purchasePrice: rowItem.item_purchase_price,
      totalAmount: rowItem.item_total_price,
      datePurchased: rowItem.item_purchase_date,
      itemDescription: rowItem.item_description,
      itemPurchaseProof: rowItem.item_file_path,
      itemFilename: "placeholder",
      formInvalid: false,
      formType: "edit",
    });
  };

  useEffect(() => {
    const getLocationItems = async () => {
      try {
        const locationItemData = await fetch(
          `http://localhost:5000/dashboard/edit/${1}/${location}`
        );
        locationItemData.json().then((res) => {
          handleData(res);
          setRowData(res);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getLocationItems();
  }, [location]);

  const columns: GridColDef[] = [
    {
      field: "item",
      headerName: "Item",
      width: 150,
    },
    {
      field: "item_quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "item_purchase_price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "item_total_price",
      headerName: "Total Price",
      width: 120,
    },
    {
      field: "item_purchase_date",
      headerName: "Purchase Date",
      width: 150,
    },
    {
      field: "item_description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "place",
      headerName: "Place",
      width: 200,
    },
    {
      field: "item_file_path",
      headerName: "Purchase Proof",
      width: 200,
      hideable: false,
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      hideable: false,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <h2>{location}</h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            columns: {
              columnVisibilityModel: {
                place: false,
                item_file_path: false,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            columnsPanel: {
              getTogglableColumns,
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
        />
        {dialogOpen ? (
          <LocationCardDialog
            key={location}
            area={location}
            edit={dialogOpen}
            closeDialog={handleClose}
            {...selectedData}
          />
        ) : null}
      </Box>
    </div>
  );
}
