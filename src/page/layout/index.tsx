import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fnc = () => {
  return 5;
};
const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('/cau1')}>Câu 1</Button>
      <Button onClick={() => navigate('/cau2')}>Câu 2</Button>
    </>
  );
};

export default Layout;
