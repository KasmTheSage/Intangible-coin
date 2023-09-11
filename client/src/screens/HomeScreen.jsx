import React from 'react';
import Welcome from '../components/Welcome';

const HomeScreen = () => {
  return (
    <>
     <div className='text-center'>
        <h1 className='display-4 mb-4'>Welcome to Intangible Coin</h1>
            <p className='lead'>
                Experience the future of online relationships with Intangible Coin.
            </p>
     </div>
      <Welcome />
    </>
  )
}

export default HomeScreen;