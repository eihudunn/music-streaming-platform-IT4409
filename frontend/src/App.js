import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './routes/Login';

function App() {
    return( 
    <div className='App w-screen h-screen'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element= { <div>Hello</div> }/>
                <Route path="/login" element={ <LoginComponent /> } />
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App;
