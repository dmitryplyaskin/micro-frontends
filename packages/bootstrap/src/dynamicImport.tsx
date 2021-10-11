import React from "react";

function loadComponent(scope: string, module: string) {
  return async () => {
    //@ts-expect-error
    await __webpack_init_sharing__("default");

    //@ts-expect-error
    const container = window[scope];

    //@ts-expect-error
    await container.init(__webpack_share_scopes__.default);

    //@ts-expect-error
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");

    element.src = url + "/remoteEntry.js";
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

export function DynamicImport(props: { scope: string; module: string }) {
  //@ts-expect-error
  const url = window.configuration.remotes[props.scope];

  const { ready, failed } = useDynamicScript(url);

  if (!props.scope) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}
