import {
    React,
    Paper,
    withStyles,
    generateStyles,
    useState,
    useEffect,
    Card,
    Box
  } from '../../Shared/Utils/CommonImports';
  import { rightPanelStyles as componentStyles } from './RightPanelStyles';
import Aggregate from '../Aggregate/Aggregate';
import Limit from '../Limit/Limit';
import Exception from '../Exception/Exception';
import LimitBreachView from '../LimitBreach/LimitBreachView';
import HomeComp from '../Home/HomeComp';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import Sidebar from '../Header/Sidebar';
import PendingSettled from '../PendingSettled.tsx/PendingSettled';
import DecisionPending from '../Decision_Pending/DecisionPending';
import { useRef } from 'react';

  export type IRightPanelProps = {
    classes?: any;
    isopen: boolean;
    setIsOpen: any;
    totalamount: any;
    setTotalAmount: any;
    actualdata: any;
    isthrottle: any;
    setisThrottle: any;
    setActualData: any;
    count: any;
    setCount: any;
    gridRef: any;
  }

  var evtSource:any;

  const RightPanel: React.FC<IRightPanelProps> = props => {
    
    const countRef = useRef<number>(0);
const { gridRef,isopen, setIsOpen, totalamount,setTotalAmount, actualdata,setActualData,isthrottle,setisThrottle, count, setCount} = props;
    return (
        <>
        <div className={'rightPanel'}>
          {/* <div className={'rightPanel'}>
           <h2 style={{textTransform: 'capitalize'}}>{`${selectedListItem} view`}
           {
            selectedListItem === 'LQMT - Aggregate' &&
            <FormControlLabel control={<Switch />} label="Throttle" style={{marginLeft:'5px'}} onClick={(event) =>handleThrottle(event)} />
            
           }
           </h2>
           
           {renderInnerComponent(selectedListItem)} */}

           <BrowserRouter>
           <Sidebar isopen={isopen} setIsOpen={setIsOpen}>
           <Routes>
            <Route path='/home' element={<HomeComp actualdata={actualdata} totalamount={totalamount} setTotalAmount={setTotalAmount} />} />
            <Route path='/aggregateview' element={<Aggregate gridRef={gridRef} count={count} setCount={setCount} setActualData={setActualData} isthrottle={isthrottle} setisThrottle={setisThrottle} actualdata={actualdata} isopen={isopen} setIsOpen={setIsOpen} totalamount={totalamount} setTotalAmount={setTotalAmount}/>} />
            <Route path='/decisionpending' element={<DecisionPending count={count} setCount={setCount} setActualData={setActualData} isthrottle={isthrottle} setisThrottle={setisThrottle} actualdata={actualdata} isopen={isopen} setIsOpen={setIsOpen} totalamount={totalamount} setTotalAmount={setTotalAmount}/>} />
            <Route path='/exceptionview' element={<Exception totalamount={totalamount} setTotalAmount={setTotalAmount} />} />
            <Route path='/limitview' element={<Limit totalamount={totalamount} setTotalAmount={setTotalAmount} />} />
            <Route path='/limitbreachview' element={<LimitBreachView totalamount={totalamount} setTotalAmount={setTotalAmount} />} />
            <Route path='/pendingsettled' element={<PendingSettled/>} />
            <Route path='/' element={<HomeComp actualdata={actualdata} totalamount={totalamount} setTotalAmount={setTotalAmount} />} />
            <Route path='*' element={<Error />} />
           </Routes>
           </Sidebar>
           </BrowserRouter>
           </div>
        </>
    )
  }
  function Error() {
    return (
      <>
      <h2>Page Not Found</h2>
      </>
    )
  }

  export default RightPanel;