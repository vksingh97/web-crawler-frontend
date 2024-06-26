import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/login/index';
import SignupComponent from './components/signup/index';
import CrawlerComponent from './components/crawler/index';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/signup' element={<SignupComponent />} />{' '}
        <Route path='/crawler' element={<CrawlerComponent />} />
      </Routes>
    </div>
  );
}

export default App;
