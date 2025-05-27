import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;