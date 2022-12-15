import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function Dragables() {
  const data = [
    "this is text one",
    "this is text two",
    "this is text three",
    "this is text four",
    "this is text five",
  ];
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
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} align="center">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {data.map((i, index) => (
                <Draggable
                  key={index}
                  axis="y"
                  defaultPosition={{ x: 0, y: 0 }}
                  position={null}
                  grid={[15, 25]}
                  scale={1}
                  onStart={(a, b, c, d) => {
                    console.log("onStart");
                    console.log(a, b, c, d);
                  }}
                  onDrag={(a, b, c, d) => {
                    console.log("onDrag");
                    console.log(a, b, c, d);
                  }}
                  onStop={(a, b, c, d) => {
                    console.log("onStop");
                    console.log(a, b, c, d);
                  }}
                >
                  <ListItem key={index} component="div" disablePadding>
                    <ListItemButton>
                      <ListItemText primary={i} />
                    </ListItemButton>
                  </ListItem>
                </Draggable>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
