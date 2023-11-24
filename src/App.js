import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventEmitter } from './Utils/Events';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer } from 'react-notifications';
import { BeatLoader } from 'react-spinners';
import FormPage from './Pages/FormPage';
import { useDispatch } from 'react-redux';
import { getCategoriesAction } from './Redux/Actions';
import { showSpinner } from './Utils/Helper';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
};

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  EventEmitter.subscribe('isLoading', (event) => setLoading(event));

  useEffect(() => {
     showSpinner()
     dispatch(getCategoriesAction())
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='App'>
        <div className='content' id='main'>
          <Routes>
              <Route exact path='/*' element={<FormPage />}/>
          </Routes>
        </div>
        <div className={loading ? "overlay-loader" : "d-none"}>
          <BeatLoader
            cssOverride={override}
            size={30}
            color={"#1BD0A5"}
            loading={loading}
          />
        </div>
        <ToastContainer />
        <NotificationContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
