//@ts-expect-error
window.configuration = {
  remotes: {
    monorepo_app: "http://localhost:3001",
    monorepo_shared: "http://localhost:3002",
  },
};

import("./bootstrap");
