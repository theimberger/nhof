'use client';
import React, { useState } from 'react';
import Title from './Title';
import List from './List';

const App = () => {
  const [count, setCount] = useState(1)

  const updateList = () => {
    setCount(count + 1)
  }

  return (
    <div id="app">
      <Title updateList={ updateList } />
      <List count={ count } />
    </div>
  );
}

export default App;
