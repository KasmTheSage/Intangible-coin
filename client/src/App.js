import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-5' style={{ background: '#EDEFFFFF'}}>
        <Container>
          <div className='text-center'>
            <h1 className='display-4 mb-4'>Welcome to Intangible Coin</h1>
            <p className='lead'>
              Experience the future of online relationships with Intangible Coin.
            </p>
          </div>
          <Welcome />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;