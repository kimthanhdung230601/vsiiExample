import { useState } from 'react';
import Button from './button';
import Home from './Home';
import ButtonAdd from './buttonAdd';

const Layout = () => {
  const [value, setValue] = useState(1);
  const handleSetValue = (value: number) => {
    setValue(value + 1);
    console.log('value', value);
  };
  const handleSubstract = (value: number) => {
    setValue(value - 1);
  };
  return (
    <>
      <Home value={value} />
      <Button value={value} setSubtractValue={handleSubstract} />
      <ButtonAdd value={value} setAddValue={handleSetValue} />
    </>
  );
};

export default Layout;
