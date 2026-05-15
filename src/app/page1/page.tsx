"use client"

import { useState } from "react";

export default function Home() {

  const [query, setQuery] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  return (
    <div className="grid grid-columns-5 mx-auto">
      <div>
        Hello
      </div>
      <div className="col-span-4">
        <div>
          messages
        </div>
        <div>
          <textarea value={query} onChange={(e) => {
            setQuery(e.target.value)
          }} className="textarea"></textarea>
          <button className="btn btn-primary" onClick={async () => {
            //call API
            const response = await fetch("/api/assistant1", {
              method: "POST",
              body: JSON.stringify({
                query
              })
            })

            const result = await response.json()
            console.log(result)
            setResponseMessage(result.message)
            // console.log(response)
          }}>Assist!</button>
        </div>
        <div>
          {responseMessage}
        </div>
      </div>
    </div>
  );
}
