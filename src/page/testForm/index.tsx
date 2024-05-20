import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';

interface FormData {
  name: string;
  age: string;
  gmail: string;
}

const FormDataTest = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(
      `Thông tin đăng ký bao gồm: Họ tên: ${data.name}, Tuổi: ${data.age}, Gmail:${data.gmail}`
    );
  };

  return (
    <div className={styles.wrapper}>
      <h3>DETAIL</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '3vh', width: '100%' }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Yêu cầu nhập tên' }}
            render={({ field }) => (
              <TextField
                id="name"
                label="Họ tên"
                variant="outlined"
                className={styles.inputForm}
                {...field}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
        </div>

        <div style={{ marginBottom: '3vh' }}>
          <Controller
            name="age"
            control={control}
            defaultValue=""
            rules={{
              required: 'Yêu cầu nhập tuổi',
              min: { value: 18, message: 'Tuổi từ 18' },
              max: { value: 65, message: 'Không quá 65 tuổi' },
              pattern: {
                value: /^\d+$/,
                message: 'Yêu cầu nhập đúng định dạng tuổi'
              }
            }}
            render={({ field }) => (
              <TextField
                id="age"
                label="Tuổi"
                variant="outlined"
                className={styles.inputForm}
                {...field}
                error={!!errors.age}
                helperText={errors.age ? errors.age.message : ''}
              />
            )}
          />
        </div>

        <div style={{ marginBottom: '3vh' }}>
          <Controller
            name="gmail"
            control={control}
            defaultValue=""
            rules={{
              required: 'Yêu cầu nhập gmail',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email không đúng định dạng'
              }
            }}
            render={({ field }) => (
              <TextField
                id="gmail"
                label="Gmail"
                variant="outlined"
                className={styles.inputForm}
                {...field}
                error={!!errors.gmail}
                helperText={errors.gmail ? errors.gmail.message : ''}
              />
            )}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => reset()} variant="contained" color="secondary">
          RESET
        </Button>
      </form>
    </div>
  );
};

export default FormDataTest;
