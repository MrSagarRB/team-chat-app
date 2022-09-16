import React from "react";
import Home from "./pages/Home";
import Context from "./Context";

const App = () => {
  return (
    <div className="h-screen w-full ">
      <Context>
        <Home />
      </Context>
    </div>
  );
};

export default App;
