import React, { useEffect, useState } from 'react'
import Header from "../header"
import LeftSideBar from "../leftSideBar"
import MainSection from "../mainSection"
import RightSideBar from "../rightSideBar"
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Main() {
  const [Cats,setCats] = useState([])
  const  [AddTrivia,setAddTrivia] = useState(false)
  let [searchParams]= useSearchParams()
  let id  = searchParams.get("cat")
  let navigate = useNavigate()
  const getCats = ()=>{
    fetch('https://opentdb.com/api_category.php').then(async(res)=>{
      let data = await res.json()
      if(data?.trivia_categories){
        if(!id){
          navigate(`/dashboard?cat=${data?.trivia_categories[0]?.id}`)
        }
        setCats(data.trivia_categories)
      }
    })
  }
  useEffect(()=>{
getCats()
  },[])
  return (
    <>
    <div className="min-h-full">
  {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
  <Header Cats={Cats} setAddTrivia={setAddTrivia} />
  <div className="py-10">
    <div className="mx-auto  max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
    <LeftSideBar Cats={Cats}/>
    <MainSection Cats={Cats} />
    <RightSideBar Cats={Cats} AddTrivia={AddTrivia} setAddTrivia = {setAddTrivia} />
      
     
    </div>
  </div>
</div>

    </>
  )
}
