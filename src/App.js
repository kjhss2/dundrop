import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';

// Actions
import { setDimension } from './actions/commonAction';

// Import
import { IS_MOBILE_WIDTH } from './config';

// Common
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import RouteChangeTracker from './RouteChangeTracker';

// Pages
import ItemSearch from './pages/ItemSearch';
import ItemSearch105 from './pages/ItemSearch105';
import CharacterSearch from './pages/CharacterSearch';
import CharacterDetail from './pages/CharacterDetail';

function App() {

  const dispatch = useDispatch();

  // handleResize 함수를 debounce로 감싸고, 시간을 설정합니다 
  const handleResize = debounce(() => {
    dispatch(setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < IS_MOBILE_WIDTH
    }));
  }, 100);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => { // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // React Google Analytics
  RouteChangeTracker();

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          padding: 5,
          minHeight: '80vh'
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<CharacterSearch />} />
          <Route path="/character/:serverId/:characterId" element={<CharacterDetail />} />
          <Route path="/search105" element={<ItemSearch105 />} />
          <Route path="/search" element={<ItemSearch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;