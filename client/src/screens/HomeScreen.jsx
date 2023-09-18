import React from 'react';
import Welcome from '../components/Welcome';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomeScreen = ({ isAuthenticated }) => {
  if (isAuthenticated) return (<Navigate to="/profile" />);


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
};

HomeScreen.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomeScreen);