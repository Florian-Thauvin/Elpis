import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubmitTextField } from "./SubmitTextField";

export default function CheckboxList() {
  const [items, setItems] = React.useState(["Java", "Ts"]);

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div id="TITI" style={{ backgroundColor: "antiquewhite" }}>
      <SubmitTextField {...{onAdd: (value: string) => {setItems([...items, value])}}}/>


      <List sx={{ width: "100%", maxWidth: 360 }}>
        {items.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeItem(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton dense>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
