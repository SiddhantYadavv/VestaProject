import React, { useEffect ,useState} from 'react'
import axios from "axios"
import Chart from 'chart.js/auto'
import Linechart from './component/Linechart'


const App = () => {

  const [Data,setData]= useState({
    labels:[],
    datasets:[{
      label:"Requests",
      data:[]
    }]
  })
  
  useEffect(() => {
    try {
        const fetchData=async()=>{
            const response= await axios.get("https://checkinn.co/api/v1/int/requests")

            const hotelCount = {};
            response.data.requests.forEach(request => {
              const hotelName = request.hotel.name;
              hotelCount[hotelName] = (hotelCount[hotelName] || 0) + 1;
            });

            const hotelCountArray = Object.entries(hotelCount).map(([name, count]) => ({
              name,
              count
            }));

           setData((prevData)=>({
            ...prevData,
            labels:hotelCountArray.map(data=>data.name),
            datasets: [{
              ...prevData.datasets[0],
              data: hotelCountArray.map(data=>data.count)
            }]
         } ))
    
        }
        fetchData()
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
    <div className='graphDiv'>
      <div className='graphStyle'>
      <Linechart Chartdata={Data}/>
      </div>
    </div>

  )
}

export default App