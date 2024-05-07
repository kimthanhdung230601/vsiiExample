import { Button, TextField } from '@mui/material';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { data } from '../../data/data';
import { useState } from 'react';
interface FormData {
  name: string;
}
const ExampleTwo = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [dataFilter, setDataFilter] = useState<string>('');
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const onSubmit = (data: any) => {
    console.log(data);
    setDataFilter(data.name);
    setSearchResult(true);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.inputWrapper}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register('name')}
          />
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </form>
        <div>
          <h3>List Item</h3>
          {data.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
        <div>
          <h2>Kết quả tìm kiếm: </h2>
          {searchResult === true ? (
            data.find((item) => item.name === dataFilter) ? (
              <div>{dataFilter}</div>
            ) : (
              <div>Không tìm được kết quả</div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ExampleTwo;
