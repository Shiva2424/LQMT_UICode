import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";

const ProjectedFedBalance = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [pendingbalancedata, setPendingBalanceData] = useState<any>([]);
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
    {field: 'type', width: 220, headerValueGetter: (params:any) => {return ''}, cellStyle: (params: any) => { return {fontSize: '15px'}} },
    {field: 'calcActual', width: 180,headerClass: "ag-center-header", cellClass: "ag-center-cell", headerValueGetter: (params:any) => {return 'Actual'}, valueFormatter: currencyFormatter,
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  },
    {field: 'calcForecast',width: 180,headerClass: "ag-center-header",cellClass: "ag-center-cell",  headerValueGetter: (params:any) => {return 'Forecast'}, valueFormatter: currencyFormatter,
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  },
    {field: 'calcActualForecast', width: 180,headerClass: "ag-center-header", cellClass: "ag-center-cell",headerValueGetter: (params:any) => {return 'Act vs Fcst'}, valueFormatter: currencyFormatter,
    cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  }
  ];
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };
  React.useEffect(() => {
      fetch("http://localhost:8080/api/liquidity/getFedBal").then(res => res.json()).then(res => {
        let availablebalamount = res[0].calcActual - 50000;
        let wellsfargolimit = {type: 'Wells Fargo Balance Limit', calcActual: 50000, calcForecast: 0, calcActualForecast: 0}
        let availablebal = {type: 'Available Balance', calcActual: availablebalamount, calcForecast: 0, calcActualForecast: 0}
     res[0].type = 'Projected Fed Balance';
      setPendingBalanceData([...res, wellsfargolimit,availablebal]);
    });
    

      // fetch("http://localhost:8080/api/liquidity/getPendingTransactions").then(res => res.json()).then(res => {
        // let wellsfargolimit = {type: 'Wells Fargo Balance Limit', calcActual: res}
        // let availablebalamount = res + projectedbaldetails[0].calcActual
        // let availablebal = {type: 'Available Balance', calcActual: availablebalamount}
        // setPendingBalanceData([...pendingbalancedata, wellsfargolimit]);
        // console.log(res)});

  },[])
  return (
    <>
    <Typography sx={{ fontSize: 16, color: 'black', fontWeight: 'bold',padding:'10px', margin: '0px',backgroundColor:'#fff7e1' }} color="text.secondary" gutterBottom>
          Projected Fed Balance
        </Typography>
        <Divider style={{ backgroundColor: 'yellow'}} />
    <div className="ag-theme-alpine" style={{ height: 270, width: 850 }}>
      <AgGridReact
        rowData={pendingbalancedata}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
    </>
  );
};

export default ProjectedFedBalance;
