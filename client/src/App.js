import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <main className='py-5' style={{ background: '#EDEFFFFF'}}>
        <Container>
          <Alert />
          <Outlet />
        </Container>
      </main>
      <Footer />
    </Provider>
  );
};

export default App;