import React, { useState } from 'react'
import Cookies from 'universal-cookie';

import {Link, useNavigate } from 'react-router-dom'
import { notifySuccess } from '../utils/alerts';
import CreateTrivia from './trivia/createTrivia';
import Profile from './user/profile';
import Perfomance from './trivia/perfomance';

export default function Header({Cats,setAddTrivia}) {
    let cookie = new Cookies()
    let navigate = useNavigate()
    const [openprofiveDrop,setOpenprofiveDrop] = useState(false)
    const [openProfile,setOpenProfile] = useState(false)
    const [OpenPerfomance,setOpenPerfomance] = useState(false)
    const [openCreateTrivia,setOpenCreateTrivia] = useState(false)
  return (
    <>
     <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
        <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2 py-3">
          <div className="flex flex-shrink-0 items-center">
            <a href="#" className='text-2xl text-rose-600 font-bold  text-center'>
              Trivia
            </a>
          </div>
        </div>
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
          <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0 hidden">
            <div className="w-full">
              {/* <label htmlFor="search" className="sr-only">
                Search
              </label> */}
              <div className="relative">
                {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xDescription="Heroicon name: mini/magnifying-glass"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    ariaHidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-rose-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className=" items-center md:absolute md:inset-y-0 md:right-0 hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
          >
            <span className="sr-only">Open menu</span>
            <svg
              xDescription="Icon when menu is closed.

Heroicon name: outline/bars-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              xDescription="Icon when menu is open.

Heroicon name: outline/x-mark"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
         
        
          {/* Profile dropdown */}
          <div className="relative ml-5 flex-shrink-0">
            <div>
              <button
                type="button"
                className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                id="user-menu-button"
                onMouseEnter={()=>{
                    setOpenprofiveDrop(true)
                }}
                
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-slate-300"
                  src="/images/profile.png"
                  alt=""
                />
              </button>
            </div>
            {

            <div 
            onMouseEnter={()=>{
                setOpenprofiveDrop(true)
            }}
            onMouseLeave={()=>{
               setTimeout(()=>{
                setOpenprofiveDrop(false)
               },200) 
            }}
            className={`${openprofiveDrop ? '' : 'hidden' } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
              <p onClick={()=>{
                setOpenProfile(true)
              }} href="#" className="hover:bg-gray-100 cursor-pointer block py-2 px-4 text-sm text-gray-700">
                Your Profile
              </p>
              <p
              onClick={()=>{
                setOpenPerfomance(true)
              }}
              href="#" className="hover:bg-gray-100 cursor-pointer block py-2 px-4 text-sm text-gray-700">
                Perfomance
              </p>
              <p
              onClick={()=>{
                cookie.remove('token')
                sessionStorage.clear()
                notifySuccess('Logged out successfully!')
                navigate('/signin')
              }}
                href="#"
                className=" hover:bg-gray-100 block py-2 px-4 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Sign out
              </p>
            </div>
            }
          </div>
          <p
          onClick={()=>{setOpenCreateTrivia(true)}}
            href="#"
            className="ml-6 cursor-pointer inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Create Trivia
          </p>
        </div>
      </div>
    </div>
    <nav
      xDescription="Mobile menu, show/hide based on menu state."
      className="lg:hidden"
    >
    
      <div className="border-t border-gray-200 pt-4">
        <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          
          
        </div>
        <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
          <a
            href="#"
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Your Profile
          </a>
          <a
            href="#"
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Settings
          </a>
          <a
            href="#"
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Sign out
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <a
          href="#"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700"
        >
          New Trivia
        </a>
        
      </div>
    </nav>
     </header>
     {
      openCreateTrivia &&
      <CreateTrivia setOpenCreateTrivia={setOpenCreateTrivia} Cats={Cats} setAddTrivia={setAddTrivia} />
     }
     {
      openProfile && 
      <Profile setOpenProfile={setOpenProfile}  />
     }
     {
      OpenPerfomance && 
      <Perfomance setOpenPerfomance={setOpenPerfomance} Cats={Cats} />
     }
    </>
  )
}
