import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Avaliation from './components/pages/Avaliation/Avaliation';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Plans from './components/pages/Plans/Plans';
import Signature from './components/pages/Signature/Signature';
import Signup from './components/pages/Signup/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/signature" element={<Signature />} />
        <Route path="/avaliation" element={<Avaliation />} />
      </Routes>
    </BrowserRouter>
  );
}
