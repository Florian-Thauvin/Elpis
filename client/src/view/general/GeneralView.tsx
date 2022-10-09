/**
 * ELPIS project - 2022
 */

import { Checkbox, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import { useTranslation } from "react-i18next";
import { IInputKey } from "src/locales/translationKeys";
import TRANSLATION_KEYS from "../../locales";
import ListView  from "./ListView";

export const GENERAL_VIEW_ID = "GeneralViewId";
export const NUMBER_OF_DAY_ID = "NumberOfDayId";
export const SKILLS_ID = "SkillsId";

export function GeneralView(): JSX.Element {
  const { t } = useTranslation();
  const TRADUCTION_KEYS = TRANSLATION_KEYS.GENERAL_PARAMETERS;

  return (
    <div
      style={{ margin: '50px', backgroundColor: 'antiquewhite' }}
      id={GENERAL_VIEW_ID}
    >
      <NumberOfDaysInput {...TRADUCTION_KEYS.NUMBER_OF_DAYS_INPUT}/>      
      <ListView />
    </div>
  );

  function NumberOfDaysInput(labelKeys: IInputKey): JSX.Element {
    return (
      <TextField
        required
        id={NUMBER_OF_DAY_ID}
        label={t(
          labelKeys.LABEL
        )}
        InputProps={{
          endAdornment: <InputAdornment position="end">j</InputAdornment>,
        }}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        defaultValue="15"
        helperText={t(
          labelKeys.HELP
        )}
      />
    );
  }

  
}
