import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss'; 

// root-elementet
const container = document.getElementById('root');
// Skapa en root-instans med createRoot för att kunna rendera React-komponenter
const root = createRoot(container);
root.render(<App />);