import React, { useState } from "react";
import Static from "./static";
import Cases from "./cases";
import Last from "./last";
import Bubble from "./bubble";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  window.addEventListener("load", () => {
    setIsLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <Bubble />
      ) : (
        <React.Fragment>
          <Static />
          <Cases />
          <Last />
        </React.Fragment>
      )}
    </>
  );
};

export default App;
