import React from "react";
import { useEffect, useMemo, useState,useRef } from "react";
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { AgGridReact } from 'ag-grid-react';


export type DecisionPendingProps = {
  classes?: any;
  isopen: boolean;
  setIsOpen: any;
  totalamount: any;
  setTotalAmount:any;
  actualdata: any;
  isthrottle: any;
  setisThrottle: any;
  setActualData: any;
  count: any;
  setCount: any;
};

var evtSource:any;

const DecisionPending: React.FC<DecisionPendingProps> = React.memo((props) => {
  const { isopen, setIsOpen, actualdata, isthrottle, setisThrottle, setActualData, count, setCount, totalamount, setTotalAmount } = props;
  // const containerStyle = useMemo(() => ({ width: '100%', height: '100%', margin: '0px',padding: '0px' }), []);
  const containerStyle = useMemo(() => ({ width: '99%', height: '90%', marginLeft: '10px', padding: '0px' }), []);
  const gridStyle = useMemo(() => ({ height: '80%', width: '100%', position: 'relative', bottom: '30px', padding: '0px', margin: '10px' }), []);
  const [rowData, setRowData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
const [democount, setDemoCount] = useState(0);
  useEffect(() => {
    console.log("I am Aggregate View");
  },[])
  
  useEffect(() => {
    
      try {
         fetch('http://localhost:8080/api/liquidity/decision-pending').then(res => res.json()).then(response => {
          setRowData(response);
      })
      // evtSource = new EventSource('http://localhost:8080/api/liquidity/decision-pending');
      //   evtSource.onmessage = function(event:any) {
      //     setActualData(((prevdata:any) => [...prevdata, JSON.parse(event.data)] ))
      //}
    }
      catch(err) {
      }
    },[])
 
  const gridRef = useRef<any>();
  // const [totalamount, setTotalAmount] = useState<string>('0');
  const countRef = useRef<number>(0);
  const [countvalue, setCountValue] = useState(0);
  let counterpartyamount: number = 0;
  const formatNumber = (number: number) => {
    return Math.abs(number).toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  function currencyFormatter(params: any) {
    counterpartyamount = Number((counterpartyamount + params.value).toFixed(2));
    let counterpartyamountformatted = formatNumber(counterpartyamount);
    if (params.value >= 0) {
      return '$' + formatNumber(params.value);
    }
    localStorage.setItem("CounterPartyValue", counterpartyamount.toString());
    if (counterpartyamount >= 0) {
      setTotalAmount(`$ ${counterpartyamountformatted}`);
      
    } else {
      setTotalAmount(`-$ ${counterpartyamountformatted}`);
    }
    return '-$' + formatNumber(params.value);
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: 'counterParty', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'paymentType', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'subAccount', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'transactionType', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    {
      headerValueGetter: (params: any) => { return 'Total Amount' },
      field: 'amount', headerClass: "ag-center-header", cellClass: "ag-center-cell", aggFunc: 'sum', suppressAggFuncInHeader: true, headerName: 'Total Amount', cellStyle: (params: any) => {
        if (params.value >= 0) {
          return { color: 'green' }
        }
        else {
          return { color: 'red' }
        }
      },
      valueFormatter: currencyFormatter,
    },
    { field: 'paymentPriority', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'paymentStatus', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'statusDescription', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'timestamp', headerClass: "ag-center-header", cellClass: "ag-center-cell" }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      sortable: true,
      resizable: true,
      //enableRowGroup: true,
    };
  }, []);
  const ws = useRef<any>();

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
      display: 'flex',
      justifyContent: 'center',
    };
  }, []);
  const numberwithcommas = (num: any) => {
    return num.toLocaleString();
  }
  const handleThrottle = (event: any) => {
    setisThrottle(event.target.checked);
  }
  //console.log('gridref value', gridRef);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginLeft: '10px', marginTop: '17px' }}>LQM - Decision Pending
        </h2>
      </div>
      <div style={containerStyle}>
        <div style={{ height: '90%', width: '100%', position: 'relative', bottom: '30px', padding: '0px', marginTop: '30px', marginBottom: '300px', overflow: 'hidden' }} className="ag-theme-alpine">
          {/* {isLoaded && */}
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressContextMenu={true}
            suppressAggFuncInHeader={true}
            pagination={true}
            paginationPageSize={20}
          ></AgGridReact>
          {/* } */}b
        </div>
      </div>
    </>
  );
});

export default DecisionPending;
