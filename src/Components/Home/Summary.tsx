import React, { useEffect, useMemo, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import {
  GridReadyEvent,
  GridApi,
  ColumnApi,
  ColDef,
  ICellRendererParams
} from "ag-grid-community";

export type SummaryProps = {
  classes?: any;
  totalamount: any,
  setTotalAmount: any,
  summarydata: any;
  actualdata: any;
}

  const Summary: React.FC<SummaryProps> = props => {
    const {totalamount, setTotalAmount,summarydata, actualdata} = props
  const columnDefs: any = [
    { field: 'viewName',cellRenderer: "LinkComponent", headerClass: "ag-center-header", cellClass: "ag-center-cell",  headerValueGetter: (params:any) => {return ''},},
    { field: 'grandTotal', headerClass: "ag-center-header", cellClass: "ag-center-cell", valueFormatter: currencyFormatter, cellStyle: (params: any) => { 
      if (params.value >= 0) {
        return {color: 'green', fontWeight: 'bold'}
              }
              else {
                return {color: 'red',fontWeight: 'bold'}
              }
    },  }
];
const [rowData, setRowData] = useState<any>([]);
const [aggregategrandtotal, setAggrTotal] = useState(0)
let aggregatecount = 0;
    let exceptioncount = 0;
    let limitbreachcount = 0;
    let limitcount = 0;
    let pendingsettledcount = 0;
useEffect(() => {
  let aggregatetotal: any = 0;
  let exeptiongrandtotal: any = 0;
    let lbgrandtotal: any = 0;
    let lgrandtotal: any = 0;
    let pendingsettledtotal: any = 0;
  const requestOne = axios.get("http://localhost:8080/api/liquidity/exceptions");
const requestTwo = axios.get("http://localhost:8080/api/liquidity/limit-breached");
const requestThree = axios.get("http://localhost:8080/api/limits/all");
const requestFour = axios.get("http://localhost:8080/api/liquidity/pending-settled");
    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responesThree = responses[2]
      const responesFour = responses[3]
      responseOne.data.forEach((item:any) => {
        exeptiongrandtotal += Number(item.amount);
        exceptioncount += 1;
      })
      responseTwo.data.forEach((item:any) => {
        lbgrandtotal += item.amount;
        limitbreachcount += 1;
      })
      responesThree.data.forEach((item:any) => {
        lgrandtotal += Number(item.balance);
        limitcount += 1;
      })
      responesFour.data.forEach((item:any) => {
        pendingsettledtotal += item.amount;
        pendingsettledcount += 1;
      })
      //setTotalAmount({...totalamount, exceptiontotal: Number(exeptiongrandtotal.toFixed(2)), limitbreachtotal: Number(lbgrandtotal.toFixed(2)), limitTotal: Number(lgrandtotal.toFixed(2)) })
      actualdata.forEach((item:any) => {
        aggregatetotal += item.amount;
        aggregatecount +=1
      })
      //const aggviewname = `Aggregate (${aggregatecount})`;
      setRowData([{viewName: 'Actual', grandTotal: aggregatetotal.toFixed(2)},
      {viewName: 'Exception', grandTotal: Number(exeptiongrandtotal.toFixed(2))},
      {viewName: 'Limit Breach', grandTotal:Number(lbgrandtotal.toFixed(2))},
      {viewName: 'Forecast', grandTotal: Number(pendingsettledtotal.toFixed(2))},
       {viewName: 'Limit', grandTotal: Number(lgrandtotal.toFixed(2))},
      ]);
    })).catch(errors => {
      // react on errors.
    })
}, []);
const numberFormatter = (number: any) => {
    return Math.abs(number).toFixed()
    .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  const numberFormat = (number: any) => {
    return Math.abs(number).toFixed(2)
    .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  function currencyFormatter(params: any) {
    if (params.value >= 0) {
      return  numberFormat(params.value);
    }
    return '(' + numberFormat(params.value) + ')';
  }
const defaultColDef = useMemo(() => {
  return {
    resizable: true,
    flex: 1,
  };
}, []);
function LinkComponent(props: ICellRendererParams) {
  if ( props.value.includes('Actual')) {
    return (
      <NavLink
      to='/aggregateview'
    > 
    Actual ({numberFormatter(aggregatecount/2)})
    </NavLink>
    );
  }
  if ( props.value.includes('Exception')) {
    return (
      <NavLink
      to='/exceptionview'
    > 
    Exception ({numberFormatter(exceptioncount/2)})
    </NavLink>
    );
  }
  if ( props.value.includes('Limit Breach')) {
    return (
      <NavLink
      to='/limitbreachview'
    > 
    Limit Breach ({numberFormatter(limitbreachcount/2)})
    </NavLink>
    );
  }
  if ( props.value.includes('Forecast')) {
    return (
      <NavLink
      to='/pendingsettled'
    > 
    Forecast ({numberFormatter(pendingsettledcount/2)})
    </NavLink>
    );
  }
  if ( props.value.includes('Limit')) {
    return (
      <NavLink
      to='/limitview'
    > 
    Limit ({numberFormatter(limitcount/2)})
    </NavLink>
    );
  }
}
  return (
    <div>
      <Typography
        sx={{
          fontSize: 16,
          color: "black",
          fontWeight: "bold",
          padding: "10px",
          margin: "0px",
          backgroundColor: "#fff7e1",
        }}
        color="text.secondary"
        gutterBottom
      >
        Summary
      </Typography>
      <Divider style={{ backgroundColor: "yellow" }} />
      <div className="ag-theme-alpine" style={{ height: 270, width: 400 }}>
      <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          suppressClickEdit={true}
          defaultColDef={defaultColDef}
          frameworkComponents={{
            LinkComponent
          }}
        />
        </div>
    </div>
  );
}

export default Summary;
