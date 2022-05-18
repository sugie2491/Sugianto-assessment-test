import { BrowserRouter, Routes, Route } from 'react-router-dom' // import react-router-dom for page

import './Assets/Css/Core.scss' // import scss

import Login from './Views/Login.js' // import login page
import CreateEvents from './Views/CreateEvents.js' // import Create events page
import Dashboard from './Views/Dashboard.js' // import dashboard page
import ViewEvent from './Views/ViewEvent' //import View Event Page

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/" element={ <Dashboard /> } />
                <Route path="/create-events" element={ <CreateEvents /> } />
                <Route path="/view-events/:eventId" element={ <ViewEvent /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
