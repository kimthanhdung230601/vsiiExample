import { Route, Routes } from 'react-router-dom';
import Layout from '../page/layout';
import Value from '../page/useRefExample';
import ExampleTwo from '../page/cau2';
import ManageData from '../page/data';
import FormExample from '../page/formExample';

const RouteProp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/data" element={<ManageData />} />
        <Route path="/cau1" element={<Value />} />
        <Route path="/cau2" element={<ExampleTwo />} />
        <Route path="/formExample" element={<FormExample />} />
      </Routes>
    </>
  );
};

export default RouteProp;
