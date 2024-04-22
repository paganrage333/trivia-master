import React, { useEffect, useState } from "react";
// import { notifyError, notifySuccess } from "../../utils/alerts";
import { get } from "../../utils/axios";
import CategoryChart from "./CategoryChart";
// import AllDataChart from "./AllDataChart";


export default function Perfomance({ setOpenPerfomance, Cats,setAddTrivia,que }) {
  
  
  let [activeTab,setActiveTab] = useState(0)
  let [ReportData,setReportData] = useState({})
  // const data = {
    
  
  // };
  // let data1 = {
  //   labels: ['Wrong', 'Right'],
  //   datasets: [
  //     {
  //       label: 'No question',
  //       data: [10, 20],
        
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
        
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(75, 192, 192, 1)',
          
  //       ],
  //       borderWidth: 2,
  //     },
  //   ],
  // };
 
  const getData = ()=>{
    get('/users/getReport').then((res)=>{
      if(res.data){
        console.log(res.data.map((e)=>{return Cats.find((f)=>{return f.id === e.category})?.name}))
         setReportData(
          {
            labels:  res.data.map((e)=>{return Cats.find((f)=>{return f.id === e.category})?.name}),
    
            datasets: [{
              label: 'Data By Category',
              data: res.data.map((e)=>{return e.no_of_question}),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
         )
        }
    })
  }
 
  useEffect(()=>{
    getData()
  })
  return (
    <>
      <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <button
              onClick={(  ) => {
                setOpenPerfomance(false);
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  cliprule="evenodd"
                />
              </svg>
              <span className="sr-only">Close popup</span>
            </button>
            <div class="flex w-full md:max-w-xl  rounded shadow mt-7">
            <p href="#" onClick={()=>{setActiveTab(0)}} aria-current="false"
        class={`w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2       ${activeTab === 0 ? 'bg-rose-600  text-white ': "text-gray-800 border  bg-white border-gray-200"} `}>
        by Category
        
    </p>
    {/* <p href="#" onClick={()=>{setActiveTab(1)}} aria-current="false"
         class={`w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2      cursor-pointer ${activeTab == 1 ? 'bg-rose-600 hover:bg-red-800 text-white ': "text-gray-800 border hover:bg-gray-100 bg-white border-gray-200"} `}>
        By All Question
        
    </p> */}

</div>
    <div className="py-4">
      {
        // activeTabk == 0 ?
       Object.keys(ReportData).length>0 ?
        <CategoryChart data={ReportData}/>
        :
        <p className="text-center py-4">
          No Data Found
        </p>
        // :
        // <div className="h-96 flex justify-center ">

        // <AllDataChart data={data1} />
        // </div>
      }
    </div>
        </div>
    </div>
</div>
    </>
  );
}
