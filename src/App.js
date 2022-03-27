import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

// Actions
import { setDimension } from './actions/commonAction';

// Rotues
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Header from './pages/Header';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;