import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./components/Home/pages/Home"
import { isUserAuthenticated } from './components/Login/helper/LoginHelper';
import Login from "./components/Login/components/Login"
import Sidebar from './common/Sidebar/Sidebar';
import Encuestas from './components/Encuesta/page/Encuestas';
import CreateCuenta from './components/User/components/CreateCuenta';
import Perfil from './components/User/components/Perfil';
import ChirpChat from './components/ChirpChat/components/ChirpChat';
import Noticia from './components/Noticia/components/Noticia';
import Live from './components/Live/components/Live';
import Friend from "./components/Amistad/components/Friend";
import FriendshipList from "./components/Amistad/components/FriendshipList";
import Mensaje from "./components/Mensajeria/components/Mensaje";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex ">
        <div className="col-auto">
          {isUserAuthenticated() && <Sidebar />}
        </div>
        <div className='flex-grow-1 '>
          <Routes>

            <Route path="/" element={isUserAuthenticated() ? <Home /> : <Login />}/>
            <Route paht="/login" element={isUserAuthenticated() ? (<Login />) : (<Navigate to="/" replace={true}/>)}/>
            <Route path="/home" element={isUserAuthenticated() ? (<Home />) : (<Navigate to="/" replace={true} />)}/>

            <Route path='/encuesta' element={<Encuestas />} />
            <Route path='/register' element={<CreateCuenta />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/chat' element={<ChirpChat></ChirpChat>} />
            <Route path='/noticia' element={<Noticia />} />
            <Route path='/live' element={<Live></Live>} />
            <Route path='/amigo' element={<Friend />} />
            <Route path='/amistades' element={<FriendshipList />} />
            <Route path='/mensaje' element={<Mensaje/>} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
