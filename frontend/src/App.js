import React, { useState } from "react"
import Header from "./Components/Header"
import Content from "./Components/Content"

function App() {
  const [list,setList] = useState()
  return (
    <div className="App">
      <Header setList={setList}/>
      <Content list={list}/>
    </div>
  );
}

export default App;
