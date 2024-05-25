// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react';
// import './App.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// not implement auth yet
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  // const [count, setCount] = useState(0)

  return (
        <ApolloProvider client={client}>
          <Header />
          <Outlet />
          <Footer />
        </ApolloProvider>
  )
}

export default App
