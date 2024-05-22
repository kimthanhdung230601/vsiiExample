import { Route, Routes } from 'react-router-dom';
import ReduxExample from '../page/redux';

const RouteProp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReduxExample />} />
      </Routes>
    </>
  );
};

export default RouteProp;
