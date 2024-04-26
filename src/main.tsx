import * as React from "react";
import { createRoot } from "react-dom/client";
import { TransitMapApplication } from "./components/app/app";

const root = createRoot(document.getElementById("root")!);

root.render(<TransitMapApplication />);