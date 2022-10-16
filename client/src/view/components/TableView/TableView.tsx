import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  IconButton,
  TableFooter,
  TablePagination,
  TableSortLabel,
  TextField,
  useTheme
} from "@mui/material";
import { AbstractData } from "../../../model/core/AbstractData";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { visuallyHidden } from "@mui/utils";
import { Badge } from "@mui/material";

export enum ETableCellType {
  NUMBER_INPUT = "number",
  STRING_INPUT = "text"
}

interface IFieldConstraints {   
  isMandatory: boolean;
  regexp?: RegExp;
}

export interface ITableHeaderProps<T extends AbstractData> {
  type: ETableCellType; 
  label: string;
  field: keyof T;
  constraints:IFieldConstraints;
}

export interface ITableViewProps<T extends AbstractData> {
  headers: ITableHeaderProps<T>[];
  data: T[];
  newData: () => T;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  unicityGroups: ((keyof T)[])[];
}

type junctionType = "AND" | "OR";
interface specificFilter<T extends AbstractData> {
  field: keyof T;
  value: string | number;
  junction?: junctionType;
}

function filterData<T extends AbstractData>(
  data: T[],
  filters: specificFilter<T>[]
): T[] {
  let filteredData = data;

    filters.forEach((filter: specificFilter<T>) => {
      filteredData = filteredData.filter((item) => {
        return `${item[filter.field]}` === filter.value;
      });
    });
  

  return filteredData;
}

export function TableView<T extends AbstractData>(props: ITableViewProps<T>) {
  type keys = keyof T | null;

  const { headers } = props;

  const [data, setData] = React.useState(props.data);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keys>(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [hasError, onError] = React.useState<boolean>(false);

  const [unicityViolations, setUnicityViolations] = React.useState<string[][]>([]);

  const [specificFilters, setSpecificFilters] = React.useState<
    specificFilter<T>[]
  >([]);

  const rows: T[] = calculateRows<T>(data, specificFilters, orderBy, order, rowsPerPage, page);
  const rowCount = rows.length;

  const createSortHandler =
    (property: keys) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.getId());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeItem = () => {
    const newItems = data.filter(
      (value: T) => !selected.includes(value.getId())
    );
    setData(newItems);
    setSelected([]);
  };

  const onAddData = ()=> {
    const newData = props.newData();
    const newDataList = [...data, newData];
    const newPage = calculateNewPage(newData, newDataList, specificFilters, orderBy, order, rowsPerPage, page);
    setData(newDataList);
    setPage(newPage);
  };

  const onDataChanged = (value: string | number, id: string, field: keyof T) => {
    const dataValue = data.find(d => d.getId() === id);
    if(dataValue !== undefined){
      (dataValue[field] as string | number) = value;
    }

    setUnicityViolations(checkDuplicatedData(data, props.unicityGroups));
  };

  return (
    <div>
      <div>
        <IconButton
          aria-label="add"
          size="large"
          onClick={onAddData}
          disabled = {hasError}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton aria-label="delete" size="large" onClick={removeItem} disabled = {data.length === 0 || selected.length === 0}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="filter" size="large"  disabled = {data.length === 0}>
          <FilterAltIcon />
        </IconButton>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < rowCount
                  }
                  checked={rowCount > 0 && selected.length === rowCount}
                  onChange={handleSelectAllClick}disabled = {data.length === 0}
                  inputProps={{
                    "aria-label": "select all items"
                  }}
                />
              </TableCell>
              {headers.map((header) => {
                return (
                  <TableCell align="left">
                    <TableSortLabel
                      active={orderBy === header.label}
                      direction={orderBy === header.label ? order : "asc"}
                      onClick={createSortHandler(header.field)}
                    >
                      {header.label}
                      {orderBy === header.label ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                    <TextField
                      required
                      disabled = {data.length === 0}
                      id={header.label}
                      variant="standard"
                      size="small"
                      type={header.type.toString()}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        let index = 0;
                        const existingFilter = specificFilters.find(
                          (filter, filterIndex) => {
                            if (filter.field === header.field) {
                              index = filterIndex;
                              return true;
                            }
                            return false;
                          }
                        );
                        if (existingFilter) {
                          if (value !== "") {
                            existingFilter.value = value;
                          } else {
                            const newFilters =  [...specificFilters]
                            newFilters.splice(index, 1);
                            setSpecificFilters(newFilters);                    
                          }
                        } else {
                          setSpecificFilters([
                            ...specificFilters,
                            { field: header.field, value }
                          ]);
                        }
                      }}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableViewBody {...{ rows, page, headers, selected, setSelected, onError, onDataChanged, unicityViolations }} />
        </Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page"
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    </div>
  );
}

function calculateRows<T extends AbstractData>(data: T[], specificFilters: specificFilter<T>[], orderBy: keyof T | null, order: Order, rowsPerPage: number, page: number) {
  const sortedData = filterAndSortData<T>(data, specificFilters, orderBy, order);
  const rows: T[] = rowsPerPage > 0
    ? getRowsForPage(sortedData, rowsPerPage, page)
    : sortedData;
  return rows;
}

function calculateNewPage<T extends AbstractData>(newData: T, data: T[], specificFilters: specificFilter<T>[], orderBy: keyof T | null, order: Order, rowsPerPage: number, page: number): number {
  let newPage = 0;
  const sortedData = filterAndSortData<T>(data, specificFilters, orderBy, order);

  if(rowsPerPage > 0){
    const numberOfPages = Math.ceil(sortedData.length / rowsPerPage);

    for(let i = 0; i <= numberOfPages; i++){
      const pageAtI = getRowsForPage(sortedData, rowsPerPage, i);
      if(newData.isInList(pageAtI)){
        newPage = i;
        break;
      }
    }
  }

  return newPage;
}

function getRowsForPage<T extends AbstractData>(sortedData: T[], rowsPerPage: number, page: number): T[]{
  return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

function filterAndSortData<T extends AbstractData>(data: T[], specificFilters: specificFilter<T>[], orderBy: keyof T | null, order: Order) {
  const filteredData = filterData(data, specificFilters);
  const sortedData = orderBy !== null
    ? filteredData.sort(getComparator(order, orderBy))
    : filteredData;
  return sortedData;
}

function checkDuplicatedData<T extends AbstractData>(data: T[], unicityGroups: ((keyof T)[])[]): (string[])[]{
  const objectsInConflict: (string[])[] =  [];

  unicityGroups.forEach((group) => {
    const idByUnicity: Map<string, string[]>  = new Map();

    data.map((item) => {
      const unicity = group.map((uniqueField) => item[uniqueField]);
      const unicityCalculated = unicity.join('_');

      if(idByUnicity.has(unicityCalculated)){
        idByUnicity.get(unicityCalculated)?.push(item.getId());
      } else {
        idByUnicity.set(unicityCalculated, [item.getId()]);
      }
    });

    idByUnicity.forEach((value: string[]) => {
      if(value.length > 1){
        objectsInConflict.push(value);
      }
    });
  });

  return objectsInConflict;
}

function descendingComparator<T extends AbstractData>(
  a: T,
  b: T,
  orderBy: keyof T
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T extends AbstractData>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface ITableViewBodyProps<T extends AbstractData> {
  rows: T[];
  headers: ITableHeaderProps<T>[];
  selected: readonly string[];
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
  onError: (hasError: boolean) => void;
  onDataChanged: (value: string | number, id: string, field: keyof T) => void,
  unicityViolations: string[][]
}

function getUnicityId(id: string, unicityViolations: string[][]): number[] {
  let unicityId: number[] = [];
  
  unicityViolations.forEach((value: string[], index: number)=> {
    if(value.includes(id)){
      unicityId.push(index);
    }
  });

  return unicityId;
}

function TableViewBody<T extends AbstractData>(props: ITableViewBodyProps<T>): JSX.Element {
  const { rows, headers, selected, setSelected, onError, onDataChanged, unicityViolations } = props;
  const isSelected = (name: string) => selected.includes(name);
  
  const rowsOnError: number[] = [];

  const onRowError = (isRowOnError: boolean, row: number) => {    
    const index = rowsOnError.indexOf(row);
    if(isRowOnError){
      if(index === -1){
        rowsOnError.push(row);
      }
    } else {
      if(index !== -1){
        rowsOnError.splice(index, 1);
      }
    }

    onError(rowsOnError.length !== 0);    
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <TableBody>
      {rows.map((item: T) => {
        const id = item.getId();
        const isItemSelected = isSelected(id);
        const unicityFailed = getUnicityId(id, unicityViolations);

        return (
          <TableRow
            key={id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              
              <Badge color="secondary" badgeContent={unicityFailed.length === 1 ? `${unicityFailed[0]}` : 'N'} invisible={unicityFailed.length === 0}>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onClick={(event) => handleClick(event, id)}
                  inputProps={{
                    "aria-labelledby": `label_${id}`
                  }}
                />              
              </Badge>
            </TableCell>
            {headers.map((header, index) => {
              const dataToDisplay = Object.entries(item).find(
                (d) => d[0] === header.field
              );

              return dataToDisplay ? (
                <TableCell align="left">
                    <TableItem
                      {...{ ...header, data: dataToDisplay[1],onDataChanged: (value: string | number) => onDataChanged(value, id, header.field), onRowError: (onError: boolean) => onRowError(onError, index) }}
                    ></TableItem>
                </TableCell>
              ) : (
                <></>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface TableItemProps<T extends AbstractData> extends ITableHeaderProps<T> {
  data: string | number ;
  onDataChanged:(newValue: string | number) => void;
  onRowError: (onError: boolean) => void;
}

function isValid(value: string | number, 
  type: ETableCellType, constraints: IFieldConstraints){
  let isValid = false;
  if(value === null){
     isValid = !constraints.isMandatory;
  } else if(type === ETableCellType.STRING_INPUT){
    const valueString = value as string;
    isValid = valueString.length > 0 && (constraints.regexp ? constraints.regexp.test(valueString) :  true);
  } else {
    isValid = true;
  }

  return isValid;
}

function TableItem<T extends AbstractData> (props: TableItemProps<T>): JSX.Element {
  const [value, setValue] = React.useState(props.data);
  const [onError, setOnError] = React.useState(false);

  React.useEffect(() => {
    const isOnError = !isValid(value, props.type, props.constraints);
    props.onRowError(isOnError);
    setOnError(isOnError);
    props.onDataChanged(value);
  }, [value]);

  return (
    <TextField
      id="standard-basic"
      variant="standard"
      size="small"
      defaultValue={value}
      error={onError}
      type={props.type.toString()}
      onChange={(e) => setValue(e.target.value)}
    />
  );
  
}
