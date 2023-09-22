import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationCardDialog from "./LocationCardDialog";
import HandleDeleteDialog from "../../components/HandleDeleteDialog";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridEventListener,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { useAuth0 } from "@auth0/auth0-react";

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
  itemFilePath: any;
  formInvalid: boolean;
  formType: string;
}

const initialFormData: formData = {
  place: "",
  fileId: undefined,
  itemId: undefined,
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemFilePath: "",
  formInvalid: false,
  formType: "",
};

export default function LocationCardEdit() {
  const [rowData, setRowData] = useState<any>([]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [dialogEditOpen, setDialogEditOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteRowData, setDeleteRowData] = useState<any>();

  // const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)
  const [rows, setRows] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(initialFormData);

  const locationParam = useParams();
  const location = locationParam["location"];

  let locationHeader = "";
  if (location) {
    const words = location.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
    }
    locationHeader = words.join(" ");
  }

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

  const { user, getAccessTokenSilently } = useAuth0();
  const userSub = user?.sub ? user?.sub.split("|")[1] : "";

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

  const handleEditClose = () => {
    setOpenEdit(false);
    setDialogEditOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const showDeleteDialog = (deleteRowData: any) => () => {
    setDeleteRowData(deleteRowData);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently();
    try {
      await fetch(
        `http://localhost:5000/dashboard/edit/delete/${userSub}/${location}/${deleteRowData.id}`,
        {
          method: "delete",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setDialogEditOpen(!openEdit);
    let selectedRow = rowData.filter((x: any) => {
      return x.item_id === params.row.id;
    });
    const rowItem = selectedRow[0];
    let itemFileName;

    if (rowItem.item_file_path) {
      itemFileName = rowItem.item_file_path.split("/").pop();
    }

    setSelectedData({
      itemId: rowItem.item_id,
      item: rowItem.item,
      place: rowItem.place,
      itemQuantity: rowItem.item_quantity,
      purchasePrice: rowItem.item_purchase_price,
      totalAmount: rowItem.item_total_price,
      datePurchased: rowItem.item_purchase_date,
      itemDescription: rowItem.item_description,
      itemFilePath: rowItem.item_file_path,
      itemFilename: itemFileName,
      formInvalid: false,
      formType: "edit",
    });
  };

  useEffect(() => {
    const getLocationItems = async () => {
      const accessToken = await getAccessTokenSilently();
      if (userSub) {
        try {
          const locationItemData = await fetch(
            `http://localhost:5000/dashboard/edit/${userSub}/${location}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          locationItemData.json().then((res) => {
            handleData(res);
            setRowData(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    getLocationItems();
  }, [location, getAccessTokenSilently, userSub]);

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
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={showDeleteDialog(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>{locationHeader}</h2>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
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
          pageSizeOptions={[20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
        />
        {dialogEditOpen && (
          <LocationCardDialog
            key={location}
            area={location}
            edit={dialogEditOpen}
            closeDialog={handleEditClose}
            {...selectedData}
          />
        )}
      </Box>
      {openDelete && (
        <HandleDeleteDialog
          closeDialog={handleDeleteClose}
          handleDelete={handleDelete}
          data={deleteRowData}
        />
      )}
    </div>
  );
}
