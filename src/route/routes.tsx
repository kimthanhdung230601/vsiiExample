import { Route, Routes } from 'react-router-dom';

import FormDataTest from '../page/testForm';

const RouteProp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormDataTest />} />
      </Routes>
    </>
  );
};

export default RouteProp;
