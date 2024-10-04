import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import "dayjs/locale/uz";
import "./index.css";
import App from "./App";

dayjs.locale("uz");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
