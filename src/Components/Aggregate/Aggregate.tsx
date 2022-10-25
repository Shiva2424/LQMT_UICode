import React, { useCallback, useMemo, useRef, useState, useEffect, memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './Aggregate.css'
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { data } from '../../Shared/Utils/payments';
import { axios } from '../../Shared/Utils/CommonImports';
import kafka from 'kafka-node'
import { config } from './config'
import { json } from 'stream/consumers';
import { debounce, throttle } from "lodash";
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
//const kafka = require('kafka-node');
//const config = require('./config');

export type AggregateProps = {
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
  gridRef: any;
};

const Aggregate: React.FC<AggregateProps> = React.memo((props) => {
  const {gridRef, isopen, setIsOpen, actualdata, isthrottle, setisThrottle, setActualData, count, setCount, totalamount, setTotalAmount } = props;
  const containerStyle = useMemo(() => ({ width: '99%', height: '90%', marginLeft: '10px', padding: '0px' }), []);
  const gridStyle = useMemo(() => ({ height: '80%', width: '100%', position: 'relative', bottom: '30px', padding: '0px', margin: '10px' }), []);
  const [rowData, setRowData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
const [democount, setDemoCount] = useState(0);
const actualRef = useRef<any>();
useEffect(() => {
  if(!isthrottle) {
    fetch(`http://localhost:8080/api/transaction/payments?isThrottleEnabled=${isthrottle}`)
    }
  //fetch("http://localhost:8080/api/transaction/payments?isThrottleEnabled=true")
}, [isthrottle])
useEffect(() => {
  if(!isLoaded) {
    fetch("http://localhost:8080/api/transaction/getRecords").then(res => res.json()).then(res => {
      setActualData(res);
      setIsLoaded(true);
      setCountValue(res.length);
      countRef.current = res.length;
    })
  }
}, [isLoaded])
 
  // const gridRef = useRef<any>();
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
      // if (counterpartyamount >= 0) {
      //   setTotalAmount(`$ ${counterpartyamountformatted}`);
      // } else {
      //   setTotalAmount(`-$ ${counterpartyamountformatted}`);
      // }
      return '$' + formatNumber(params.value);
    }
    // counterpartyamount = Number((counterpartyamount + params.value).toFixed(2));
    // setTotalAmount(counterpartyamount)
    localStorage.setItem("CounterPartyValue", counterpartyamount.toString());
    if (counterpartyamount >= 0) {
      setTotalAmount(`$ ${counterpartyamountformatted}`);
      
    } else {
      setTotalAmount(`-$ ${counterpartyamountformatted}`);
    }
    return '-$' + formatNumber(params.value);
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: 'counterParty', rowGroup: true, hide: true, headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'paymentType', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'subAccount', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
    { field: 'transactionType', rowGroup: true, hide: true, headerClass: "ag-center-header", cellClass: "ag-center-cell" },
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
      enableRowGroup: true,
    };
  }, []);
  const ws = useRef<any>();

  useEffect(() => {
    console.log(typeof ws.current);
    // if (typeof ws.current !== 'undefined') {
    //   ws.current.close();
    // }
    //actualRef.current = gridRef.current;
    if (!isthrottle) {
    ws.current = new WebSocket("ws://localhost:8081");
    fetch("http://localhost:8080/api/transaction/payments?isThrottleEnabled=false")
    ws.current.onopen = () => {
      console.log("Connection opened");
    };


    ws.current.onmessage = (event: any) => {
      const data = JSON.parse(JSON.parse(event.data));
      let kafkaData:any = [];
      if (data.paymentStatus === 'SETTLED') {
        kafkaData = data;
        countRef.current += 1;
      //  setActualData(((prevdata:any) => [...prevdata, kafkaData] ))
      setTimeout(() => {
        gridRef?.current?.api?.applyTransactionAsync({
          add: [kafkaData]
        })
        //setCountValue(countRef.current);
      }, 500)
      }


      // const data = JSON.parse(event.data);
      // const kafkaData:any = JSON.parse(data);
      // countRef.current += 1;
      // setTimeout(() => {
      //   gridRef?.current?.api?.applyTransactionAsync({
      //     add: [kafkaData]
      //   })
      //   setCountValue(countRef.current);
      // }, 0)
    };
      // if(kafkaData.transactionType === "DEBIT") {
      //   kafkaData.amount = -kafkaData.amount
      // }
      
    }
   else {
    //ws.current.close();
    ws.current = new WebSocket("ws://localhost:8082");
    //gridRef.current = actualRef.current;
    fetch("http://localhost:8080/api/transaction/payments?isThrottleEnabled=true")
  }

    return () => {
      console.log("Cleaning up...");
      //ws.current.close();
    };
  }, [isthrottle]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
      // display: 'flex',
      // justifyContent: 'center',
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
        <h2 style={{ marginLeft: '10px', marginTop: '17px' }}>LQM - Actual
          <FormControlLabel control={<Switch />} checked={isthrottle} label="Throttle" style={{ marginLeft: '5px' }} onClick={(event) => handleThrottle(event)} />
        </h2>
        <div style={{ marginTop: '30px', position: 'absolute', left: '50%' }}>
          Counter Party Value: {totalamount}
        </div>
        <div style={{ marginTop: '20px', position: 'absolute', left: '85%' }}>
          <span style={{ padding: '5px', marginTop: '2px', display: 'flex' }}>
            <DataThresholdingIcon />
            <span style={{marginBottom: '2px'}}>
            All Payments: {countRef.current} </span>
            </span>
        </div>
      </div>
      <div style={containerStyle}>
        <div style={{ height: '90%', width: '100%', position: 'relative', bottom: '30px', padding: '0px', marginTop: '30px', marginBottom: '300px', overflow: 'hidden' }} className="ag-theme-alpine">
          {/* {isLoaded && */}
          {/* <AgGridReact
            rowGroupPanelShow='always'
            rowData={actualdata}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            suppressContextMenu={true}
            ref={gridRef}
            suppressAggFuncInHeader={true}
            pagination={true}
            paginationPageSize={20}
          ></AgGridReact> */}
          <AgGridReact
          rowGroupPanelShow='always'
           rowData={actualdata}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          suppressContextMenu={true}
          ref={gridRef}
        ></AgGridReact>
          {/* } */}
        </div>
      </div>
    </>
  );
});

export default Aggregate;