import React, { useEffect, useState, } from 'react'
import { Link,useSearchParams } from 'react-router-dom'

export default function LeftSideBar({Cats}) {
  let [searchParams]= useSearchParams()
  let id  = searchParams.get("cat")
  
  // https://opentdb.com/api.php?amount=20&category=9&type=multiple&token=a5001220d4388b0f4cc81f547868de5aa1506ee77c775596104e11b49d31e263
  
  return (
    <>
      <div className="hidden max-h-screen  lg:col-span-3 lg:block xl:col-span-2">
        <nav
          aria-label="Sidebar"
          className=" overflow-scroll h-[80%] hide-scrollbar overflow-x-hidden top-4 divide-y divide-gray-300"
        >
          <div className="pt-10">
            <p
              className="px-3 text-xl font-medium text-gray-500"
              id="communities-headline"
            >
              Category
            </p>
            <div
              className="mt-3 ml-1 space-y-2"
              aria-labelledby="communities-headline"
            >
              {
                Cats.map((e,i)=>(
              <Link
              key={i}
                 to={`/dashboard?cat=${e.id}`}
                className={` group flex  items-center rounded-md px-3 py-2 text-sm font-medium ${ id == e.id ? 'bg-rose-600 text-white':''} text-gray-700 hover:bg-rose-600 hover:text-white`}
              >
                <span className="truncate">{e?.name}</span>
              </Link>
              ))
              }
           
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
