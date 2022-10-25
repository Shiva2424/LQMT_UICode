import { ModeEdit, DeleteOutline } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";

export type ExceptionProps = {
    classes?: any;
    totalamount: any;
    setTotalAmount: any;
  }
   
  const Exception: React.FC<ExceptionProps> = props => {
    const [rowData, setRowData] = useState([])
    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const containerStyle = useMemo(() => ({ width: '99%', height: '90%' }), []);
    const gridStyle = useMemo(() => ({ height: '90%', width: '100%', margin: '10px' }), []);

    useEffect(() => {
        fetch('http://localhost:8080/api/liquidity/exceptions').then(res => res.json()).then(response => {
            setRowData(response);
        })
    }, [])

    const columnDefs: any = [
        { field: 'counterParty', headerClass: "ag-center-header", cellClass: "ag-center-cell" },
        {field: 'paymentType', editable: false, headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'subAccount', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'transactionType', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'amount', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'paymentPriority', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'paymentStatus', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    ];

    const getWidth = (key: string) => {
        switch (key) {
            case 'counterParty':
                return 200;
            case 'subAccount':
                return 150;
            default:
                return 100;
        }
    }

    return (

        <div style={containerStyle}>
            <h2 style={{marginLeft: '10px',marginTop: '17px'}}>LQM - Exception</h2>
            <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef= {{
            flex: 1,
            editable: true
          }}
          suppressClickEdit={true}
          pagination={true}
          paginationPageSize={20}
        />
            </div>
        </div>
    );
}

export default Exception;