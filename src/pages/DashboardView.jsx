import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { intentMap, pageData } from "../common/data/data";
import { addPrefixToNumber, keywordDifficulty } from "../common/helper";
import * as _ from "lodash";
import TabsView from "../components/TabsView";


const DifficultyContainer = ({ pageData, selectedData }) => {
    const [dataToRender, setDataToRender] = React.useState({});
    React.useEffect(() => {
      setDataToRender(keywordDifficulty(selectedData?.[6]));
    }, [selectedData]);
  
    return (
      <React.Fragment>
        <p>Keyword Difficulty</p>
        <Grid container xs={12} md={12} lg={12}>
          <Grid item xs={12} md={3} lg={3}>
            <span>
              <b>{selectedData?.[6]}%</b>
            </span>
            <p>{dataToRender.rating}</p>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <span>chart to render</span>
          </Grid>
        </Grid>
        <Grid container xs={12} md={12} lg={12}>
          <Grid item xs={12} md={12} lg={12}>
            <p>{dataToRender.text}</p>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };



export default function DashboardView () {

    const [selectedData, setSelectedData] = React.useState([]);
    React.useEffect(() => {
        const data =
          pageData.raw_broadmatch_data.find((it) =>
            it.find((item) => item == pageData.topic)
          ) ||
          pageData.raw_related_data.find((it) =>
            it.find((item) => item == pageData.topic)
          ) ||
          pageData.raw_question_data.find((it) =>
            it.find((item) => item == pageData.topic)
          );
        setSelectedData(data);
      }, []);


    return <Box
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
    <Container maxWidth={1500} align="start">
      <Grid container spacing={3} xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} lg={6}>
          <p><span style={{color:'#9f9f9f'}}>Keyword Explorer {`>`} </span>Keyword Overview</p>
          <div
          style={{
            padding: 2,
            paddingLeft: 5,
            display: "flex",
            flexDirection: "column",
            height: 'auto',
            textAlign: "start",
          }}
          >
            <h2><b>Keyword:</b> <span style={{color:'#9f9f9f'}}>{pageData.topic}</span></h2>
            <p style={{marginTop: 0, color:'#9f9f9f'}}>Database: <span>{pageData.country}</span></p>
          </div>

        </Grid>
      </Grid>
    </Container>
    <Divider />
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} align="center">
      <Grid container spacing={3} xs={12} md={10} lg={10}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              pl: 5,
              display: "flex",
              flexDirection: "column",
              height: 380,
              textAlign: "start",
            }}
          >
            <p>Volume</p>
            <span>
              <b>{selectedData?.[1]} </b>
              {pageData.country}
            </span>
            <Divider />
            <DifficultyContainer
              pageData={_.cloneDeep(pageData)}
              selectedData={selectedData}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 120,
                textAlign: "start",
              }}
            >
              <p>Intent</p>
              <span
                style={{
                  background: `${
                    intentMap?.[selectedData?.[2]]?.color?.bg || "#fce081"
                  }`,
                  color: `${
                    intentMap?.[selectedData?.[2]]?.color?.text ||
                    "#ca994a"
                  }`,
                  padding: "5px 10px",
                  borderRadius: "25px",
                  width: "fit-content",
                  textAlign: "center",
                }}
              >
                {intentMap?.[selectedData?.[2]]?.type}
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                my: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 120,
                textAlign: "start",
              }}
            >
              <p>Results</p>
              <span>
                <b>{addPrefixToNumber(selectedData?.[5], 3)}</b>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 120,
                textAlign: "start",
              }}
            >
              <Grid container xs={12} md={12} lg={12}>
                <Grid item xs={12} md={6} lg={6}>
                  <p>CPC</p>
                  <span>
                    <b>${selectedData?.[3]}</b>
                  </span>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <p>Com.</p>
                  <span>
                    <b>{selectedData?.[4]}</b>
                  </span>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabsView />
        </Grid>
      </Grid>
    </Container>
  </Box>

}

