import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import { AgGridReact } from '@ag-grid-community/react';
import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";
export type BalanceProps = {
  balancedata:any;
}
const Balance: React.FC<BalanceProps> = props => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [balancedata, setBalanceData] = useState<any>();
  // const balancedetailsref = useRef([]);
  const numberFormatter = (number: any) => {
    return Math.abs(number).toFixed(2)
    .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  function currencyFormatter(params: any) {
    if (params.value >= 0) {
      return  numberFormatter(params.value);
    }
    return '(' + numberFormatter(params.value) + ')';
  }
  const columnDefs: any = [
    {field: 'type', width: 200, headerValueGetter: (params:any) => {return ''}, },
    {field: 'actual', width: 180,headerClass: "ag-center-header",  cellClass: "ag-center-cell", valueFormatter: currencyFormatter, 
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  },
    {field: 'forecast',width: 180,headerClass: "ag-center-header", cellClass: "ag-center-cell", valueFormatter: currencyFormatter, 
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  },
    {field: 'actFor', width: 180,headerClass: "ag-center-header", cellClass: "ag-center-cell", headerValueGetter: (params:any) => {return 'Act vs Fcst'},  valueFormatter: currencyFormatter, 
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  },
  ];
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  
  return (
    <>
    <Typography sx={{ fontSize: 16, color: 'black', fontWeight: 'bold',padding:'10px', margin: '0px',backgroundColor:'#fff7e1' }} color="text.secondary" gutterBottom>
          Balance
        </Typography>
        <Divider style={{ backgroundColor: 'yellow'}} /> 
    <div className="ag-theme-alpine" style={{ height: 270, width: 850 }}>
      <AgGridReact
        rowData={props.balancedata}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
    </>
  );
};

export default Balance;
