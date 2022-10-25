import React, { useMemo,useState, useRef, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import EditIcon from '@mui/icons-material/Edit';

export type LimitProps = {
  classes?: any;
  totalamount: any;
  setTotalAmount: any;
}
const Limit: React.FC<LimitProps> = props => {
  const {totalamount,setTotalAmount} = props;
  // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const containerStyle = useMemo(() => ({ width: '99%', height: '90%' }), []);
  const gridStyle = useMemo(() => ({ height: '88%', width: '100%', margin: '10px' }), []);
  const gridRef = useRef<any>();
  const [rowData, setRowData] = useState([]);
  // const rowData: any = [
  //   {CounterParty: 'JPMorgan Chase & Co', Account: '78969085XXXX', CreditLimit: '2B', DebitLimit: '1B'},
  //   {CounterParty: 'Wells Fargo & Co', Account: '12346754XXXX', CreditLimit: '2B', DebitLimit: '1B'},
  //   {CounterParty: 'Citigroup Inc', Account: '45673243XXXX', CreditLimit: '1B', DebitLimit: '1B'},
  //   {CounterParty: 'Bank of America', Account: '58943651XXXX', CreditLimit: '1B', DebitLimit: '1B'},
  //   {CounterParty: 'Goldman Sachs Group', Account: '70412867XXXX', CreditLimit: '2B', DebitLimit: '1B'},
  // ];
  useEffect(() => {
    fetch("http://localhost:8080/api/limits/all").then(res => res.json()).then(res => { 
      setRowData(res)});
  },[]);
  const handleEditRecord = (params: any) => {
    console.log(params);
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      // gets the first columnKey
      colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
    });
  }
  const columnDefs: any = [
    {
      headerName: "Action",
      field: "action",
      headerClass: "ag-center-header", cellClass: "ag-center-cell",
      editable: false,
      cellRendererFramework: (params: any) => <div>
        <button style={{margin: '3px'}} onClick={() => handleEditRecord(params)}>
          <EditIcon />
          </button>
      </div>
    },
    {field: 'counterParty', editable: false,headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'account', editable: false, headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'creditLimit', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
    {field: 'debitLimit', headerClass: "ag-center-header", cellClass: "ag-center-cell"},
  ];

  const handleSave = () => {
    let limitData:any = [];
    gridRef.current.api.forEachNode((node:any) => {limitData.push(node.data)});
    const updatedRecords = limitData.filter((obj1:any) => {
return !rowData.some((obj2:any) => {
  return obj2.creditLimit === obj1.creditLimit && obj1.debitLimit === obj2.debitLimit;
})
    });
    console.log('updatedRecords',updatedRecords);
    if (updatedRecords.length > 0) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecords[0]),
    };
    fetch('http://localhost:8080/api/limits', requestOptions);
    }
  };
  const handleAddRecord = () => {}
  return (
    <div style={containerStyle}>
      <h2 style={{marginLeft: '10px',marginTop: '17px'}}>LQM - Set Limit</h2>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          editType="fullRow"
          defaultColDef= {{
            flex: 1,
            editable: true
          }}
          suppressClickEdit={true}
          pagination={true}
          paginationPageSize={20}
        />
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <button style={{margin:'5px',padding: '5px'}}onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Limit;