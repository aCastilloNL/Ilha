import {React, useState, useEffect} from 'react';
import { Component } from 'react';
import { Line } from '@reactchartjs/react-chart.js'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { confidence } from './data';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {useSelector} from 'react-redux';
import './Analytics.css'



const saveCanvas =()=> {
  //save to png
  const canvasSave = document.getElementById('stackD');
  canvasSave.toBlob(function (blob) {
      saveAs(blob, "study-time.png")
  })
}



const LineChart =()=>  { 
  const userId = useSelector((state) => state.authentication.userId);
  const [time, setTime] = useState([]); 

  useEffect(()=>{
    axios.get(`http://localhost:5000/users/`)
      .then((response) => {
        const filteredData = response.data.filter(data=> data._id === userId)
        setTime(filteredData[0].totaltime);
},[userId]);

 
  })

//dummy data
// const daysOfMonth = confidence.map(item => item.date);
// const hoursStudied = confidence.map(item => item.military);

//real data coming from BE
const daysOfMonth = time.map(item=>item.date.substr(3,2));
const hoursStudied = time.map(item => item.time);
let dailyAverage = (hoursStudied.reduce((a,b)=> a + b, 0))/ hoursStudied.length;


const data = {
  labels: daysOfMonth,
  datasets: [
    {
      label: 'Hours of study',
      data: hoursStudied,
      fill: false,
      responsive: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}


    return(
      <div className='analytics-container'>
    
     <Paper className='chart-paper'>
     <button className='download-btn' onClick={saveCanvas}>Download as PNG</button>
      <Line id="stackD" width={700} height={300} data={data} options={options}  responsive={true}
/>
      </Paper>

      <div className='paper-container'>
        <Paper className="paper">
          <Typography>Daily average</Typography>
          <Typography variant='h4' style={{textAlign:'center'}}>{dailyAverage.toFixed(0)}</Typography>
        </Paper>

        <Paper className="paper">
        <Typography>Most played song</Typography>
        <Typography variant='h3' style={{textAlign:'center'}}>🎸</Typography>
        </Paper>
      </div>

    </div>
    )
  
  }
 


export default LineChart