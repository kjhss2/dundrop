import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';

// Actions
import { setDimension } from './actions/commonAction';

// Pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import ItemSearch105 from './pages/ItemSearch105';
import NotFound from './pages/NotFound';

function App() {

  const dispatch = useDispatch();

  // handleResize 함수를 debounce로 감싸고, 시간을 설정합니다 
  const handleResize = debounce(() => {
    dispatch(setDimension({
      width: window.innerWidth,
      height: window.innerHeight
    }));
  }, 100);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => { // cleanup 
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

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
          <Route path="/search" element={<Search />}>
            <Route path=":itemName" element={<Search />} />
          </Route>
          <Route path="/search105" element={<ItemSearch105 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;