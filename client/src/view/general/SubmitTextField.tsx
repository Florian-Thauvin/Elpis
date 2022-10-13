import { IconButton, TextField } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface ISubmitTextFieldProps {
    onAdd: (value: string) => void;
}

export function SubmitTextField(props: ISubmitTextFieldProps) {
  const [add, setAdd] = React.useState<string>("");

  return (
    <div>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        value={add}
        onChange={(e) => setAdd(e.target.value)}
      />

      <IconButton
        aria-label="add"
        size="large"
        style={{ color: add !== "" ? "royalblue" : "grey" }}
        disabled={add === ""}
        onClick={() => {
          props.onAdd(add);
          setAdd("");
        }}
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  );
}
