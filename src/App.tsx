import {
  React,
  Paper,
  withStyles,
  generateStyles,
  useState,
  useEffect,
  Card,
  List,
  ListItem
} from './Shared/Utils/CommonImports';
import './App.css';
import LeftPanel from './Components/LeftPanel/leftPanel';
import RightPanel from './Components/RightPanel/rightPanel';
import { __String } from 'typescript';
import HeaderComp from './Components/Header/HeaderComp';
import axios from 'axios';
import { useRef } from 'react';


const listData = [
  {name: 'LQMT - Aggregate', value: 'LQMT - Aggregate View'},
  {name: 'LQMT - Exception', value: 'LQMT - Exception View'},
  {name: 'LQMT - Limit Breach', value: 'LQMT - Limit Breach View'},
  {name: 'LQMT - Set Limits', value: 'LQMT - Set Limits View'},
]

function App() {
  const [selectedListItem, setSelectedListItem] = useState('LQMT - Aggregate');
  const [isopen, setIsOpen] = useState<boolean>(false);
   const [actualdata, setActualData] = useState<any>([]);
   const gridRef = useRef<any>();
  // const [totalamount, setTotalAmount] = useState({aggregatetotal: 0, 
  //   exceptiontotal: 0, limitbreachtotal: 0,limitTotal: 0})
  const [totalamount, setTotalAmount] = useState<string>('0');
 const [isthrottle, setisThrottle] = useState(false);
const [count, setCount] = useState(0);
    // const handleThrottle = (event: any) => {
    //   setisThrottle(event.target.checked);
    // }

  return (
      <>
      <HeaderComp />
      <RightPanel gridRef={gridRef} count={count} setCount={setCount} setActualData={setActualData} isopen={isopen} setIsOpen={setIsOpen} actualdata={actualdata} totalamount={totalamount} setTotalAmount={setTotalAmount} isthrottle={isthrottle} setisThrottle={setisThrottle}/>
      </>
  );
}

export default App;
