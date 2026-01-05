import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/archivo-black";
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/newsreader";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
