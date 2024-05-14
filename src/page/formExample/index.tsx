import { Button } from '@mui/material';
import styles from './styles.module.scss';
import { useState } from 'react';
import OptionOneComponent1 from './modalOptionOption1';
import OptionOneComponent2 from './modalOptionOption2';
interface FormExampleProps {}

const FormExample = () => {
  //option1
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  //option2
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {' '}
          <Button variant="contained" onClick={handleClickOpen1}>
            OPTION 1
          </Button>
          <Button variant="contained" onClick={handleClickOpen2}>
            OPTION 2
          </Button>
        </div>
      </div>
      <OptionOneComponent1
        open={open1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
      />
      <OptionOneComponent2
        open={open2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      />
    </>
  );
};

export default FormExample;
