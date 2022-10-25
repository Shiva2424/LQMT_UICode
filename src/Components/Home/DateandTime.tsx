import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import './HomeComp.css'

const DateandTime = () => {
    const todaydate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[todaydate.getMonth()];
    let year = todaydate.getFullYear();
    let date = todaydate.getDate();
    const [hours,setHours] = useState(todaydate.getHours());
    const [minutes, setMinutes] = useState(todaydate.getMinutes());
    const [seconds, setSeconds] = useState(todaydate.getSeconds());
    React.useEffect(() => {
        setInterval(() => {
          const date = new Date();
          setHours(date.getHours());
          setMinutes(date.getMinutes());
          setSeconds(date.getSeconds());
        },1000)
      }, []);
return (<>
<div className='datedisplay'>
      {date} {month} {year}
        </div>  
        <div className='timesection'>
<Typography style={{display: 'flex', justifyContent: 'center',color: '#767090',fontWeight: 'bold',fontSize: '14px'}}>Hours Fed Open</Typography>
<div style={{display: 'flex', justifyContent: 'center'}}>
  <div className='time'>{hours}</div>
  <div className='col'>:</div>
  <div className='time'>{minutes}</div>
  <div className='col'>:</div>
  <div className='time'>{seconds}</div>
</div>
<div style={{display: 'flex', justifyContent: 'center'}}>
  <div className='timenotation' style={{marginRight:'18px'}}>HH</div>
  <div className='timenotation' style={{marginRight:'5px'}}>MM</div>
  <div className='timenotation' style={{marginLeft:'10px'}}>SS</div>
</div>
        </div>
</>);
}

export default DateandTime;