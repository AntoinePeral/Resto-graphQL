import './App.css';
import logo from './images/logo.png';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AppLink, Cities, City, CookingStyles, CookingStyle, Restaurants, Restaurant} from './components';

function App() {
  return (
    <div className="App">
        <header>
            <img src={logo} alt="Rest'o" />
            <ul>
                <li>
                    <AppLink route='/cities' text='Villes' />
                </li>
                <li>
                    <AppLink route='/restaurants' text='Restaurants' />
                </li>
                <li>
                    <AppLink route='/cookingStyles' text='Styles de cuisine' />
                </li>
            </ul>
        </header>
        <main>
            <Routes>
                <Route path='/cities' element={<Cities />} />
                <Route path='/cities/:id' element={<City />} />
                <Route path='/restaurants' element={<Restaurants />} />
                <Route path='/restaurants/:id' element={<Restaurant />} />
                <Route path='/cookingStyles' element={<CookingStyles />} />
                <Route path='/cookingStyles/:id' element={<CookingStyle />} />
                <Route path="*" element={<Navigate to="/cities"/>} />
            </Routes>
        </main>
    </div>
  );
}

export default App;
