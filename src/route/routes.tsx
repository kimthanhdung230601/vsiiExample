import { Route, Routes } from 'react-router-dom';
import ReduxTest from '../page/redux/testRedux';

const RouteProp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReduxTest />} />
      </Routes>
    </>
  );
};

export default RouteProp;
