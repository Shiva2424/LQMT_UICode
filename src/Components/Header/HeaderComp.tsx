import React,{useState} from 'react'
import RightPanel from '../RightPanel/rightPanel'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const listData = [
    {name: 'LQMT', value: 'LQMT - Aggregate View'},
    {name: 'exception', value: 'LQMT - Exception View'},
    {name: 'limit', value: 'LQMT - Set Limits'},
    {name: 'Limit Breach', value: 'Limit Breach View'}
  ]

function HeaderComp() {
    const [selectedListItem, setSelectedListItem] = useState('LQMT') 
    const listSelectHandler = (listItem: string) => {
      setSelectedListItem(listItem)
    }
  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
        <Navbar />
        {/* <RightPanel selectedListItem={selectedListItem}/> */}

    </div>
  )
}

export default HeaderComp