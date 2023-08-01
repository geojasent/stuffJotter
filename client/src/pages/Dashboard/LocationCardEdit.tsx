import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id:
    | "item"
    | "item_quantity"
    | "item_purchase_price"
    | "item_total_price"
    | "item_purchase_date"
    | "item_description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "item", label: "Item", minWidth: 100 },
  { id: "item_quantity", label: "Quantity", minWidth: 25 },
  {
    id: "item_purchase_price",
    label: "Price",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "item_total_price",
    label: "Total Price",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "item_purchase_date",
    label: "Purchase Date",
    minWidth: 50,
    align: "right",
  },
  {
    id: "item_description",
    label: "Description",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  item_id: number;
  item: string;
  item_quantity: string;
  item_purchase_price: number;
  item_total_price: number;
  item_purchase_date: Date;
  item_description: string;
}

function createData(
  item_id: number,
  item: string,
  item_quantity: string,
  item_purchase_price: number,
  item_total_price: number,
  item_purchase_date: Date,
  item_description: string
): Data {
  return {
    item_id,
    item,
    item_quantity,
    item_purchase_price,
    item_total_price,
    item_purchase_date,
    item_description,
  };
}

// const rows: any = [];

export default function LocationCardEdit() {
  //   const [data, setData] = useState([]);
  const [rows, setRows] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const locationParam = useParams();
  const location = locationParam["location"];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleData = (data: any) => {
    let rows = [];
    for (let item of data) {
      rows.push(
        createData(
          item.item_id,
          item.item,
          item.item_quantity,
          parseInt(item.item_purchase_price),
          parseInt(item.item_total_price),
          item.item_purchase_date.slice(0, 10),
          item.item_description
        )
      );
    }
    setRows(rows);
  };

  useEffect(() => {
    const getLocationItems = async () => {
      try {
        const locationItemData = await fetch(
          `http://localhost:5000/dashboard/edit/${1}/${location}`
        );
        locationItemData.json().then((res) => {
          handleData(res);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getLocationItems();
  }, [location]);

  return (
    <div>
      This is the {location} edit page
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.item_id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
