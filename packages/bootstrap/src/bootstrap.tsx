import React from "react";
import ReactDOM from "react-dom";
import { DynamicImport } from "./dynamicImport";

// //@ts-expect-error
// import RemoteApp from "monorepo_app/App";

// const Clicker = React.lazy(() => import("monorepo_shared/Clicker"));

const App = () => {
  return (
    <div>
      <h1>hello world!</h1>
      <h2>AWESOME!</h2>
      <DynamicImport scope={"monorepo_app"} module={"App"} />
      <DynamicImport scope={"monorepo_shared"} module={"Clicker"} />
    </div>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("RENDER"));
