import React, { useEffect, useState } from "react";
import { get } from "../utils/axios";
import CreateTrivia from "./trivia/createTrivia";

export default function RightSideBar({ Cats, AddTrivia, setAddTrivia }) {
  let [que, setQue] = useState([]);
  let [selectedQue, setSelectedQue] = useState(null);

  const [openCreateTrivia, setOpenCreateTrivia] = useState(false);
  useEffect(() => {
    get("/question/getQuestion").then((res) => {
      if (res.success) {
        setQue(res.data);
      }
    });
  }, [AddTrivia]);
  return (
    <>
      <aside className="hidden xl:col-span-4 xl:block max-h-screen">
        <div className="overflow-scroll h-[80%] hide-scrollbar top-4 space-y-4">
          <section aria-labelledby="who-to-follow-heading">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2
                  id="who-to-follow-heading"
                  className="text-base font-medium text-gray-900"
                >
                  Your Trivia Questions
                </h2>
                <div className="mt-6 flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {que.length > 0 ? (
                      que.map((e, i) => (
                        <li className="flex items-center space-x-3 py-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {/* eslint-disable jsx-a11y/anchor-is-valid */}
                              <a href="#">{e.question.substring(0, 20)}</a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a href="#">
                                {
                                  Cats.find((el) => {
                                    return el.id === e.category;
                                  })?.name
                                }
                              </a>
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => {
                                setOpenCreateTrivia(true);
                                setSelectedQue(i);
                              }}
                              type="button"
                              className="inline-flex items-center rounded-full bg-rose-50 px-3 py-0.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
                            >
                              <svg
                                className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                                xDescription="Heroicon name: mini/plus"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                ariaHidden="true"
                              >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <span>View</span>
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <p>No data found</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
      {openCreateTrivia && (
        <CreateTrivia
          Cats={Cats}
          que={que[selectedQue]}
          setOpenCreateTrivia={setOpenCreateTrivia}
          setAddTrivia={setAddTrivia}
        />
      )}
    </>
  );
}
