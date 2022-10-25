import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useEffect, useRef, useState } from "react";
import ProjectedFedBalance from "./ProjectedFedBalance";
import Balance from "./Balance";
import PieChart from "./PieChart";
import './HomeComp.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DateandTime from "./DateandTime";
import Summary from "./Summary";
import axios from "axios";

export type HomeCompProps = {
  classes?: any;
  totalamount: any,
  setTotalAmount: any,
  actualdata: any;
}

const initialPositions = [
  {
    col: 1,
    colSpan: 4,
    rowSpan: 2,
  },
  {
    col: 5,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 7,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 3,
  },
  {
    col: 5,
    colSpan: 3,
    rowSpan: 3,
  },
];

const getPositions = (initialPositions: any) => {
  return (
    initialPositions
  );
};

const HomeComp: React.FC<HomeCompProps> = props => {
    const {totalamount,setTotalAmount,actualdata} = props;
  const [positions, setPositions] = useState(getPositions(initialPositions));
  const [summarydata, setSummaryData] = useState<any>([]);
  const balancedetailsref = useRef([]);
  const [balancedata, setBalanceData] = useState<any>([]);
  const [piebalancedata, setPieBalanceData] = useState<any>([]);
  //const [piedata, setPieData] = useState<any>(true);
const piedataRef = useRef(true);
  useEffect(() => {
    let balancedetails: any = [];
    let projectedbaldetails: any;
    // setInterval(() => {
      fetch("http://localhost:8080/api/liquidity/getBal").then(res => res.json()).then(result => {
    //console.log(result);  
    balancedetailsref.current = result;
    });
      fetch("http://localhost:8080/api/liquidity/getFedBal").then(res => res.json()).then(res => {
        projectedbaldetails = res;
        const resupdate = {actual: res[0].calcActual, forecast: res[0].calcForecast, actFor: res[0].calcActualForecast, type: "Calculated Fed Balance"}
       if (balancedetailsref.current.length > 0) {
        setBalanceData([...balancedetailsref.current, resupdate])
       }
       if (piedataRef.current && balancedetailsref.current.length > 0) {
        piedataRef.current = false;
       // console.log("inside Pie Chart", piedataRef.current)
        setPieBalanceData([...balancedetailsref.current, resupdate]);
        
       }
    });
    // },1000)
    
    // console.log(balancedata)
  },[])

  const widgets = [
    {
      item: <Balance balancedata={balancedata} />,
    },
       {
      item: <Summary actualdata={actualdata} totalamount={totalamount} setTotalAmount={setTotalAmount} summarydata={summarydata}/>,
    },
    {
      item: <DateandTime />,
    },
    {
      item: <ProjectedFedBalance />,
    },
    {
      item: <PieChart  balancedata={piebalancedata}/>,
    },
  ];

 
  
  const handleReposition = (e: any) => {
    setPositions(e.value);
    localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
  };

  return (
    <div>
      <TileLayout
        columns={7}
        rowHeight={150}
        positions={positions}
        gap={{ rows: 10, columns: 10 }}
        items={widgets}
        onReposition={handleReposition}
      />
    </div>
  );
}

export default HomeComp;
