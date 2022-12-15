import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({columnData, rowData}) {
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