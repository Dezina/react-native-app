import React from 'react';
import AppNavigator from './components/navigation/AppNavigator';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <AppNavigator />
    </>
  );
};

export default App;
