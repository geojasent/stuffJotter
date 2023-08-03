import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridEventListener,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";

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
];

export default function LocationCardEdit() {
  const [rowData, setRowData] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

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
          column.field !== "place" && column.field !== "item_file_path"
      )
      .map((column) => column.field);
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    let selectedRow = rowData.filter((x: any) => {
      return x.item_id === params.row.id;
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
      </Box>
    </div>
  );
}
