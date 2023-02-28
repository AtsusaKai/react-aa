import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { PhotoInfo } from './components/photos/PhotoInfo';
import { Layout } from './components/layout/Layout';
import { RecentlyAddedPage } from './pages/RecentlyAdded';
import { FavoritesPage } from './pages/Favorites';
import { useDispatch } from 'react-redux';
import { getPhotos } from './api/client';
import { ErrorNotFoundPage } from './components/layout/ErrorNotFound';

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    // Fetch photos
    dispatch(getPhotos())        
  }, [dispatch]);
  
  return (
    <div className="App-xxl">
      <Router>
        <Layout>          
          <Routes>
            <Route path="/" element={<RecentlyAddedPage />}  />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<ErrorNotFoundPage />} />
          </Routes>        
        </Layout>
      </Router>
      <PhotoInfo />
    </div>
  );
}

export default App;
