import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

export enum ETableCellType {
  LABEL,
  NUMBER_INPUT,
  STRING_INPUT
}

export interface ITableHeader {
  label: string;
  type: ETableCellType;
  field: string;
}

type TableType = { [x: string]: string | number };
export interface ITableViewProps<T extends Object> {
  headers: ITableHeader[];
  data: TableType[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

export function TableView<T extends Object>(props: ITableViewProps<T>) {
  const { headers, data } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              return <TableCell align="right">{header.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => {
                const dataToDisplay = Object.entries(item).find(
                  (d) => d[0] === header.field
                );
                console.log("Data", dataToDisplay);
                return dataToDisplay ? (
                  <TableCell align="right">
                    <TableItem
                      {...{ type: header.type, data: dataToDisplay[1] }}
                    ></TableItem>
                  </TableCell>
                ) : (
                  <></>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface TableItemProps {
  type: ETableCellType, data: string | number | number
}

function TableItem(props: TableItemProps) {
  switch (props.type) {
    case ETableCellType.LABEL:
      return <>{props.data}</>;
    case ETableCellType.STRING_INPUT:
    case ETableCellType.NUMBER_INPUT:
      return (
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          defaultValue={props.data}
        />
      );
  }
}
