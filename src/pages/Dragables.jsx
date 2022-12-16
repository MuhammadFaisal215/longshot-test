import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Dragables() {
  
  const [data, setData] = React.useState([
    "this is text 1",
    "this is text 2",
    "this is text 3",
    "this is text 4",
    "this is text 5",
  ]);
  React.useEffect(() => {
    slist(document.getElementById("sortlist"));
  });
  const _handleAdd = () => {
    const clonedData = [...data];
    clonedData.push("this is text " + (clonedData.length+1))
    setData(clonedData)
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} align="left">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                width: "300px",
              }}
            >
              <ul id="sortlist">
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="addNew" onClick={_handleAdd}>+ Add New</div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const slist = (target) => {
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"),
    current = null;

  for (let i of items) {
    i.draggable = true;

    i.ondragstart = (ev) => {
      current = i;
      for (let it of items) {
        if (it != current) {
          it.classList.add("hint");
        }
      }
    };

    i.ondragenter = (ev) => {
      if (i != current) {
        i.classList.add("active");
      }
    };

    i.ondragleave = () => {
      i.classList.remove("active");
    };

    i.ondragend = () => {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    };

    i.ondragover = (evt) => {
      evt.preventDefault();
    };

    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0,
          droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (i == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
};
