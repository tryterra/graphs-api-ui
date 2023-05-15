"use client";
import './UI.css'
import React, { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState("A description of a graph");
  const [userId, setUserId] = useState('')
  const [devId, setDevId] = useState('testing')
  const [API_KEY, setAPI_KEY] = useState("Your API_KEY")
  const [url, setUrl] = useState("")
    const handleChangeUserInput = (event) => {
      setUserInput(event.target.value);
    };
    const hanleChangeUserId = (event) =>{
      setUserId(event.target.value);
    }
    const handleChangeAPI_KEY = (event) =>{
      setAPI_KEY(event.target.value);
    }
    const handleChangeDevId = (event) =>{
      setDevId(event.target.value);
    }
  const options = {
    method: 'GET',
    headers: {
      "dev-id": "testing",
      "x-api-key": "VjUc0jvOJO6JwQuGT8vfW6QMcQasAp9za2MFgSq5",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-us,en;q=0.5",
      "Accept-Encoding": "gzip,deflate",
      "Connection": "keep-alive",
    }
  };
  const makeARequest = (event) =>{
    fetch(`http://127.0.0.1:8080/graphs/render_gpt?user_input=${userInput}&return_url=true&user_id=${userId}`, options)
    // fetch(`http://127.0.0.1:8080/graphs/test_render_gpt?user_input=${userInput}&return_url=true`, options)
      .then(response => response.json())
      .then(response => {
        if(response["status"]=="success"){setUrl(response["url"])}
        if(response["status"]=="error"){setUrl("error")}
      })
      .catch(err => console.error(err));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-2">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Terra GPT - Graph API&nbsp;
          {/* <code className="font-mono font-bold">src/app/page.tsx</code> */}
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#01FAB7] after:dark:opacity-40 before:lg:h-[360px]">
      </div>

      <div className="flex flex-row w-full items-center gap-10">
        <div className="basis-1/4 flex-col">
          <textarea
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              color: "green",
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "10px",
              fontFamily: "monospace"
            }}
            value={API_KEY}
            onChange={handleChangeAPI_KEY}
          />
          <textarea
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              color: "green",
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "10px",
              fontFamily: "monospace"
            }}
            value={devId}
            onChange={handleChangeDevId}
          />
          <textarea
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              color: "green",
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "10px",
              fontFamily: "monospace"
            }}
            value={userId}
            onChange={hanleChangeUserId}
          />
          <textarea
            style={{
              width: "100%",
              height: "150px",
              backgroundColor: "black",
              color: "green",
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "10px",
              fontFamily: "monospace"
            }}
            value={userInput}
            onChange={handleChangeUserInput}
          />
          <button className="button" onClick={makeARequest}>
            {"Generate Graph"}
          </button>
        </div>
        <div className="basis-3/4">
          {url === "error" ? (
            <div>Graph type not available</div>
          ) : (
            <iframe src={url} className="graph" frameBorder="0"></iframe>
          )}
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#01FAB7] after:dark:opacity-40 before:lg:h-[360px]">
      </div>
      <textarea
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "black",
          color: "green",
          border: "1px solid grey",
          borderRadius: "5px",
          padding: "10px",
          fontFamily: "monospace"
        }}
        value={
          `<div>\n<iframe src="${url}" className="graph" frameBorder="0" \\>\n</div>`
        }
        onChange={()=>{}}
      />
    </main>
  )
}
