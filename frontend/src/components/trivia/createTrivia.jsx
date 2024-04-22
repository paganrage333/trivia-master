import React, { useState } from "react";
import { notifyError, notifySuccess } from "../../utils/alerts";
import { post } from "../../utils/axios";

export default function CreateTrivia({ setOpenCreateTrivia, Cats,setAddTrivia,que }) {
  let initial = que ?
   {  ...que,
    incorrect_answers: que.incorrect_answers.split('%0'),
  }
  :
  {
    incorrect_answers: [...Array(3)],
    correct_answer:'',
    category:Cats[0]?.id,
    question:""
  }
  let [data, setData] = useState({...initial})
  
  
  const onSave = ()=>{
    if(data.incorrect_answers.filter((e)=>{return e && e}).length<3 || data.correct_answer.length == 0 || data.category.length == 0 || data.question.length == 0){
      return notifyError('All fields are required')
    }
    post('/question/AddUpdateQuestion',{...data,incorrect_answers:data.incorrect_answers.join("%0")}).then((res)=>{
      if(res.success){
        notifySuccess(res.msg)
        setOpenCreateTrivia(false)
        setAddTrivia((prev)=>{
          return !prev
        })
      }else{
        notifyError(res.msg)
      }
    })
  }
  return (
    <>
      <div
        id="login-popup"
        tabIndex={-1}
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => {
                setOpenCreateTrivia(false);
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
            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium" />
              <p className="mb-4 text-sm font-normal text-gray-800" />
              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  {que ? 'Update Trivia' :'Create Trivia'}
                </p>
              </div>

              
                <label
                  htmlFor="email"
                  className=" text-sm  ml-1 text-zinc-500 font-bold"
                >
                  Question:
                </label>
                <textarea
                  name="email"
                  required=""
                  className="block mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:ring-offset-1"
                  placeholder="Enter Question"
                  defaultValue=""
                  value={data.question}
                  onChange={(e)=>{
                    setData({...data,question:e.target.value})
                  }}
                />
                <label
                  htmlFor="cat"
                  className=" text-sm  ml-1 text-zinc-500 font-bold"
                >
                  Category:
                </label>
                <br />
                <select
                  name="cat"
                  id="cat"
                  value={data.category}
                  onChange={(e)=>{
                    
                    setData({...data,category:e.target.value})
                  }}
                  dir="down"
                  className=" py-2 outline outline-1 rounded-md border border-gray-300 px-3 text-sm shadow-sm outline-none placeholder:text-gray-400 focus:ring-1  focus:ring-black focus:ring-offset-1"
                >
                  {Cats.map((e) => (
                    <option value={e.id}>{e.name}</option>
                  ))}
                </select>
                <br className="pb-2" />
                <br className="pb-2" />
                <label
                  htmlFor="email"
                  className=" text-sm  ml-1 text-zinc-500 font-bold"
                >
                  Wrong Options :
                </label>
                {data.incorrect_answers.map((e, i) => (
                  <div className="flex mt-2 ">
                    <p className="w-10 ml-2">{i + 1}.</p>
                    <input
                      name="password"
                      type="text"
                      value={e}
                      onChange={(e) => {
                        setData((prev) => {
                          prev.incorrect_answers[i] = e.target.value;
                          return prev;
                          // return prev.wrongOption[i] = e.target.value
                        });
                      }}
                      autoComplete="current-password"
                      required=""
                      className=" block w-full rounded-lg border border-gray-300 px-3 text-sm shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Option"
                      defaultValue=""
                    />
                  </div>
                ))}
                <br />
                <label
                  htmlFor="email"
                  className=" text-sm   ml-1 text-zinc-500 font-bold"
                >
                  Right Options :
                </label>
                <div className="flex mt-2 ">
                  <p className="w-10 ml-2">{1}.</p>
                  <input
                    name="password"
                    type="text"
                    value={data?.correct_answer}
                    onChange={(e) => {
                      setData({...data,correct_answer : e.target.value});
                    }}
                    autoComplete="current-password"
                    required=""
                    className=" block w-full rounded-lg border border-gray-300 px-3 text-sm shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Option"
                    defaultValue=""
                  />
                </div>

                <button
                onClick={onSave}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-rose-600 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  {que ? 'Update' :'Create'}
                </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
