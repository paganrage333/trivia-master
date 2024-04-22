import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ScroreBoard({right,wrong}) {
   let data = {
        labels: ['Wrong', 'Right'],
        datasets: [
          {
            label: 'No of question',
            data: [right, wrong],
            
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
              
            ],
            borderWidth: 2,
          },
        ],
      };
//     let generateChart = ()=>{
//     var ctx = document.getElementById("myChart").getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow'],
//             datasets: [{
//                 data: [30, 40, 20],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.7)',
//                     'rgba(54, 162, 235, 0.7)',
//                     'rgba(255, 206, 86, 0.7)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             legend: {
//                 position: 'bottom',
//                 labels: {
//                     fontColor: 'black',
//                     fontSize: 14,
//                     padding: 20
//                 }
//             }
//         }
//     });
// }
  return (
    <>
    <div className='w-96 z-50'>
        <p className='text-center text-2xl mt-5'>Your ScoreBoard</p>
     <Doughnut data={data} options={{}}   />
    </div>
    </>
  )
}
