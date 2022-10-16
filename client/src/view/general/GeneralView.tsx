/**
 * ELPIS project - 2022
 */

import {
  Checkbox,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import { useTranslation, TFunction } from "react-i18next";
import { IInputKey } from "src/locales/translationKeys";
import { AbstractData } from "../../model/core/AbstractData";
import TRANSLATION_KEYS from "../../locales";
import ListView from "./ListView";
import { ETableCellType, TableView } from "../components/TableView/TableView";

export const GENERAL_VIEW_ID = "GeneralViewId";
export const NUMBER_OF_DAY_ID = "NumberOfDayId";
export const SKILLS_ID = "SkillsId";

class tmp extends AbstractData{
  public name: string;
  public value: number;
  
  constructor(name: string, value: number){
    super();
    this.name = name;
    this.value = value;
  }
}

export function GeneralView(): JSX.Element {
  const { t } = useTranslation();
  const TRADUCTION_KEYS = TRANSLATION_KEYS.GENERAL_PARAMETERS;

  const [data, setData] = React.useState<tmp[]>([new tmp('A', 1),new tmp('B', 2),new tmp('C', 2),new tmp('D', 1)]);

  return (
    <div
      style={{ margin: "50px", backgroundColor: "antiquewhite" }}
      id={GENERAL_VIEW_ID}
    >
      <NumberOfDaysInput
        {...{ labelKeys: TRADUCTION_KEYS.NUMBER_OF_DAYS_INPUT, t }}
      />
      <ListView />
      <TableView
        {...{
          headers: [
            { label: "name", type: ETableCellType.STRING_INPUT, field: "name", constraints:{isMandatory: true} },
            { label: "value", type: ETableCellType.NUMBER_INPUT, field: "value", constraints:{isMandatory: true} }
          ],
          data,
          setData,
          newData: () => new tmp('', 0)
        }}
      />
    </div>
  );
}

interface IProps {
  labelKeys: IInputKey;
  t: TFunction;
}

function NumberOfDaysInput(props: IProps): JSX.Element {
  const { t, labelKeys } = props;
  return (
    <TextField
      required
      id={NUMBER_OF_DAY_ID}
      label={t(labelKeys.LABEL)}
      InputProps={{
        endAdornment: <InputAdornment position="end">j</InputAdornment>
      }}
      type="number"
      InputLabelProps={{
        shrink: true
      }}
      defaultValue="15"
      helperText={t(labelKeys.HELP)}
    />
  );
}
