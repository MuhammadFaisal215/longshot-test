import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { convertToCamelCase } from '../common/helper';

const mapRows = (rowData, columnData) => {
  return rowData.map((row, rowindex) => {
    let mappedRow = {}
    row.map((rowItem, index) => {
      mappedRow[convertToCamelCase(columnData[index])] = rowItem
    })
    mappedRow = {...mappedRow, id:rowindex};
    return mappedRow;
  })
}
export default function Table({columnData, rowData}) {
  // const columns = columnData.map(col => ({ field: convertToCamelCase(col), headerName: col}))
  // const rows = mapRows(rowData, columnData)
  return (
    <div style={{ height:400, width: '100%' }}>
      <DataGrid
        rows={rowData}
        columns={columnData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}