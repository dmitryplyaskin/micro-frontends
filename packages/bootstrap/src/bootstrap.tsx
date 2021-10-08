import React from "react";
import ReactDOM from "react-dom";

//@ts-expect-error
import RemoteApp from "monorepo_app/App";

const App = () => {
  return (
    <div>
      <h1>hello world!</h1>
      <h2>AWESOME!</h2>
      <RemoteApp />
    </div>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("RENDER"));
