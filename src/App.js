import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Plans from './components/pages/Plans/Plans';
import Signup from './components/pages/Signup/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  );
}
