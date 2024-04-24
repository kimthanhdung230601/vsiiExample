import { Route, Routes } from 'react-router-dom';
import Layout from '../page/layout';
import Manager from '../page/data';
import Exam from '../page/example';

const RouteProp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </>
  );
};

export default RouteProp;
