import React, { useState } from "react";
import "./App.css";
import MakePic from "./components/make-pic";

function App() {
  const [count] = useState();
  return (
    <div className="App">
      <MakePic />
    </div>
  );
}

export default App;
