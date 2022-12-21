import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginform";
import App from './App';


ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='App' element={<App />} />


            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);