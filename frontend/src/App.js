import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Components/Home/Home';
import PageNotFound from './Components/PageNotFound/PageNotFound';
// import Cart from './Components/Cart/Cart';
// import Header from './Components/Header/Header';
// import ProductCard from './Components/ProductCard/ProductCard';
import { lazy, Suspense } from 'react';
// import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
// import Login from './Components/Login/Login';
const Login = lazy(() => import('./Components/Login/Login'))
const ProtectedRoute = lazy(() => import('./Components/ProtectedRoute/ProtectedRoute'))
const Home = lazy(() => import('./Components/Home/Home'))
const Cart = lazy(() => import('./Components/Cart/Cart'))
const Orders = lazy(() => import('./Components/Orders/Orders'))
const ProductCard = lazy(() => import('./Components/ProductCard/ProductCard'))
const Header = lazy(() => import('./Components/Header/Header'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading.....</div>}>
      <Header/>
      <Routes>
        <Route exact path='/login' Component={Login} />
        <Route exact path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route exact path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route exact path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>} />
        <Route exact path='product/:id' element={<ProtectedRoute><ProductCard/></ProtectedRoute>}/>
        <Route  path='*' Component={PageNotFound} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
