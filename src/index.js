import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/StudentContext";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';

const root = createRoot(document.getElementById("root"));
root.render(
	<AppProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AppProvider>
);
