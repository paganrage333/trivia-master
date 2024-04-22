import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { notifyError, notifySuccess } from '../utils/alerts'
import moment from 'moment'
import { post } from '../utils/axios'
import ScroreBoard from './trivia/scroreBoard'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";



export default function MainSection({Cats}) {
  const  [newSession,setNewSession] = useState(sessionStorage.getItem('session'))
  let [ans,setAns] = useState(
    [{
    index:0,
    correct_answer:'',
    selected_answer:''
  }]
  )
  
  const [que,setQue] = useState(sessionStorage.getItem('que') ? JSON.parse(sessionStorage.getItem('que')) : null)
  let [searchParams]= useSearchParams()
  let id  = searchParams.get("cat")

  let [selectedQue,setSelectedQue] = useState(0)
  let [SessionEnd,setSessionEnd] = useState(false)
  const generateSession = () =>{
    let sessionExpired = moment(sessionStorage.getItem('SessionExipre'))
    if(!newSession || (moment().isSameOrAfter(sessionExpired))){

      fetch("https://opentdb.com/api_token.php?command=request").then(async(res)=>{
        let data = await res.json()
        if(data.token ){

          sessionStorage.setItem('session',data.token)
          let date = moment().add(8,'hours')
          
          sessionStorage.setItem('SessionExipre',date)
          setNewSession(data.token)
          generateQuestion(data.token)
        }else{
          notifyError('Please try again...')
        }
      })
    }else{
      generateQuestion(newSession)
    }
  }
 
  const generateQuestion = (token) =>{
      post('/question/getQuestionByCat',{category:id}).then((resp)=>{
        let amt = 20- resp.data.length
      fetch(`https://opentdb.com/api.php?amount=${amt}&category=${id}&encode=url3986&type=multiple&token=${token}`).then(async(res)=>{
        let data1 = await res.json()
        if(data1?.results ){
          let data = shuffle([...data1.results,...resp.data.map((e)=>{return({...e,incorrect_answers:e.incorrect_answers.split("%0")})})])
         let data2 =  data.map((e)=>{
            let opt = shuffle([...e?.incorrect_answers,e?.correct_answer])
            return ({...e,opt:opt})
         })
          setQue(data2)
          sessionStorage.setItem('que',JSON.stringify(data2))
        }else{
          notifyError('Please try again...')
        }
      })
    })
    
  }
  const endSession = ()=>{
    let data = que.slice(0,selectedQue)
    let filter = data.filter((e)=>{return e.QuestionID})
    
      post("/question/ViewQuestion",{view:true,category:id,no_of_question:data.length, QuestionID:filter.map((e)=>{return e.QuestionID})}).then((res)=>{
        console.log('res',res)
        setSessionEnd(true)
        sessionStorage.removeItem('que')
        sessionStorage.removeItem('session')
        sessionStorage.removeItem('SessionExipre')
        window.location.reload(false)
      })
   
  }
  let shuffle =  (unshuffled)=>{
    return unshuffled.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }

  
  
  //  useEffect(()=>{
  //   generateSession()
  //  },[])
  //  useEffect(()=>{
  //   generateQuestion()
  //  },[newSession])

  return (
   <>
   {/* <ScroreBoard/> */}
   <main className="lg:col-span-9 xl:col-span-6 max-h-screen overflow-hidden ">
       
        <div className="">
          {  SessionEnd == false && newSession  ?
          <>
          <div className='flex justify-between'>
            <div>
              <button className='bg-rose-600 text-white px-4 py-2 rounded-lg'>Restart Session</button>
            </div>
            <div>
            <button onClick={()=>{
              console.log('first')
              endSession()}} className='bg-rose-600 text-white px-4 py-2 rounded-lg'>End Session</button>
              
            </div>
            
          </div>

          <ul role="list" className="space-y-4 mt-5">
            { que?.length > 0 &&
                <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                <article aria-labelledby="question-title-81614">
                  <div>
                    <div className="flex space-x-3 text-xl">
                     {que[selectedQue]?.QuestionID && que[selectedQue]?.showUser && que[selectedQue]?.showUser == false ? que[selectedQue]?.question:decodeURIComponent(que[selectedQue]?.question)}
  
                    </div>
                    <div>
                      <form action="" className='mt-3'>
                        {que[selectedQue]?.opt?.map((opt,i)=>(
                          < >
                            <div id={`div-${opt}`} className={`flex  py-1 px-2 rounded-lg  ${ans.find((e)=>{return e.index == selectedQue})?.correct_answer == opt && ans.find((e)=>{return e.index == selectedQue})?.selected_answer == opt  ?'bg-green-400': ans.find((e)=>{return e.index == selectedQue})?.selected_answer == opt ? 'bg-red-400' : ans.find((e)=>{return e.index == selectedQue})?.correct_answer == opt ? 'bg-green-400':"" }`}>
  
                          <input type="radio" checked={ans.find((e)=>{return e.index == selectedQue})?.selected_answer ==opt ? true:false }  disabled={ans.find((e)=>{return e.index == selectedQue})?.correct_answer ? true : false} onChange={(event)=>{
                              setAns((prev)=>{
                                let temp = [...prev]
                                let obj = temp.find((e)=>{return e.index == selectedQue})
                                if(obj){
                                  obj.correct_answer = que[selectedQue].correct_answer
                                  obj.selected_answer = event.target.id
                                }
                                else {
                                  temp.push({
                                    correct_answer:que[selectedQue].correct_answer,
                                    selected_answer :event.target.id,
                                    index:selectedQue
                                  })
                                }
                                return temp
                              })
                            // document.getElementById(`${que[selectedQue].correct_answer}`).disabled = true
                            // que[selectedQue].incorrect_answers.map((val)=>{
                            //   document.getElementById(`${val}`).disabled = true
  
                            // })
                            // if(event.target.id == que[selectedQue].correct_answer){
                            //   document.getElementById(`div-${que[selectedQue].correct_answer}`).classList.add('bg-green-400')
                            // }else{
                            //   document.getElementById(`div-${que[selectedQue].correct_answer}`).classList.add('bg-green-400')
                            //   document.getElementById(`div-${event.target.id}`).classList.add('bg-red-400')
  
                            // }
  
                            if(i == que.length-1){
                              endSession()
                            }
                          }} name={`option`} id={`${opt}`} className='h-7 w-5'  key={i+10}  />
                          <label className='text-lg ml-3' htmlFor={`${opt}`} key={i+20}>{que[selectedQue]?.QuestionID && que[selectedQue]?.showUser && que[selectedQue]?.showUser == false   ? opt: decodeURIComponent(opt)} </label>
                            </div>
                          <br />
                          </>
                          ))
                        }
                      </form>
                    </div>
                  </div>
                  
                </article>
                <div className='flex justify-between items-center '>
                  <div className='flex'>
                  <input type="checkbox" checked={que[selectedQue]?.repeat == true} class="peer sr-only opacity-0" id="toggle" />
                  
<label for="toggle" onClick={()=>{
  let tmp = [...que]
  tmp[selectedQue].repeat = tmp[selectedQue].repeat && tmp[selectedQue].repeat == true ? false : true 
  let incorrect_answers = typeof tmp[selectedQue].incorrect_answers == 'string' ? tmp[selectedQue].incorrect_answers : tmp[selectedQue].incorrect_answers.join("%0") 
  post('/question/AddUpdateQuestion',{QuestionID:tmp[selectedQue].QuestionID,repeat:tmp[selectedQue].repeat ,incorrect_answers,correct_answer:tmp[selectedQue].correct_answer,category:id,question:tmp[selectedQue].question,showUser:false}).then((res)=>{
    notifySuccess('Status updated')
    tmp[selectedQue] = {...res.data,opt:tmp[selectedQue].opt}
  })
//   if(tmp[selectedQue]?.repeat && tmp[selectedQue]?.repeat == true ){

//   }else{
//     // post('/question/AddUpdateQuestion',{,repeat:false}).then((res)=>{
//     //   notifySuccess('Status updated')
//     // })

// }
setQue(tmp)
sessionStorage.setItem('que',JSON.stringify(tmp))
}} class="relative flex h-5 w-9 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-4 before:w-4 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500" htmlFor="toggle ">
      <span class="sr-only">Enable</span>
</label> <p className='text-sm ml-2'>{ que[selectedQue]?.repeat == true ? 'Disable to do not Repeat this Question in next session': 'Enable to Repeat this Question in next session'}</p>

                  </div>
                        <div className='flex'>
                          <button onClick={
                            ()=>{
                                setSelectedQue((prev)=>{
                                  if(prev == 0){
                                    return que
                                  }
                                  console.log('first')
                                  return parseInt(prev)-1
                                })
                            }
                          } disabled={selectedQue ==0} className={`${selectedQue ==0 ? 'bg-zinc-200 text-zinc-300 cursor-not-allowed':'bg-neutral-100 cursor-pointer'} px-4 py-[6px] rounded-lg mr-3 `}>

                        <FaArrowLeft className='' />
                          </button >
                          <button onClick={
                            ()=>{
                                setSelectedQue((prev)=>{
                                  if(prev == que.length-1){
                                    return que
                                  }
                                  return parseInt(prev)+1
                                })
                            }
                          } disabled={selectedQue ==que.length-1}  className={`${que.length-1 == selectedQue ? 'bg-zinc-200 text-zinc-300 cursor-not-allowed':'bg-neutral-100 cursor-pointer'} px-4 py-[6px] rounded-lg `}>

                        <FaArrowRight/>
                          </button>
                        </div>

                </div>
              </li>
          //  :
          //   <>
          //   <div className='w-full flex justify-center'>

          //    <ScroreBoard right={10} wrong={10}/> 
          //   </div>
          //   </>
            }
            
          </ul>
          </> :
            <>
            <div className='text-center items-center mt-56'>
              <h2 className='text-xl'>Category: {Cats.find((e)=>{return e.id == id})?.name }</h2>
              <button onClick={generateSession} className='bg-rose-600 text-white px-5 rounded-md py-2 mt-5'>
                Create new session
              </button>
            </div>
            </>
          }
        </div>
      </main>
   </>
  )
}
