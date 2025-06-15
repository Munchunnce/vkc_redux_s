import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './component/Navbar';
import store from './store/store';



function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
          </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
