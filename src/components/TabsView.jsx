import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Table from './Table';
import { intentMap, pageData } from '../common/data/data';
import * as _ from 'lodash';
import { addPrefixToNumber, convertToCamelCase } from '../common/helper';

export default function TabsView(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Broad Match" {...a11yProps(0)} />
              <Tab label="Related" {...a11yProps(1)} />
              <Tab label="Questions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Table columnData={mapColumns(pageData.columnNames)} rowData={mapRows(_.cloneDeep(pageData.raw_broadmatch_data), pageData.columnNames)}/>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table columnData={mapColumns(pageData.columnNames)} rowData={mapRows(_.cloneDeep(pageData.raw_related_data), pageData.columnNames)}/>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table columnData={mapColumns(pageData.columnNames)} rowData={mapRows(_.cloneDeep(pageData.raw_question_data), pageData.columnNames)}/>
            </Paper>
          </TabPanel>
        </Box>
      );
}

const mapColumns = (columnData) => {
  return columnData.map(col => ({ field: convertToCamelCase(col), headerName: col}));
}

const mapRows = (rowData, columnData) => {
  return rowData.map((row, rowindex) => {
    let mappedRow = {}
    row.map((rowItem, index) => {
      if(index == 5)
        mappedRow[convertToCamelCase(columnData[index])] = addPrefixToNumber(rowItem, 2)
      else if(index == 2)
        mappedRow[convertToCamelCase(columnData[index])] = intentMapWord(rowItem)
      else
        mappedRow[convertToCamelCase(columnData[index])] = rowItem
    })
    mappedRow = {...mappedRow, id:rowindex};
    return mappedRow;
  })
}

const intentMapWord = (rowItem) => {
  return intentMap[parseInt(rowItem)]?.type[0] || rowItem
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }