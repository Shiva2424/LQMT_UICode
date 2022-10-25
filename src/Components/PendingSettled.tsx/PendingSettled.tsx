import React, { useMemo, useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export type PendingSettledProps = {
  classes?: any;
}

const PendingSettled: React.FC<PendingSettledProps> = props => {
    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const containerStyle = useMemo(() => ({ width: '99%', height: '90%' }), []);
  const gridStyle = useMemo(() => ({ height: '88%', width: '100%', margin: '10px' }), []);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/liquidity/pending-settled").then(res => res.json()).then(res => setRowData(res));
  },[]);
  const columnDefs: any = [
    {field: 'counterParty', editable: false, headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'paymentType', editable: false, headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'subAccount', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'transactionType',headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'amount', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'paymentPriority', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'paymentStatus', headerClass: "ag-center-header", cellClass: "ag-center-cell"},

  ];
  return (
    <div style={containerStyle}>
      <h2 style={{marginLeft: '10px',marginTop: '17px'}}>LQM - Limit Breach</h2>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef= {{
            flex: 1,
          }}
          suppressClickEdit={true}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>   
  );
};
export default PendingSettled;
