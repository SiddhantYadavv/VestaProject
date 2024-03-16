import React from 'react'
import {Line} from "react-chartjs-2"

const Linechart = (props) => {
  return (
<Line data={props.Chartdata}/> 
     )
}

export default Linechart