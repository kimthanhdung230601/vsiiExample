import { TextField, Button } from '@mui/material';
import styles from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';

interface FormData {
  name?: string;
  age?: string;
  gmail?: string;
}

const FormDataTest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(
      ` Thông tin đăng ký bao gồm: Họ tên: ${data.name}, Tuổi: ${data.age}, Gmail:${data.gmail}`
    );
  };

  return (
    <div className={styles.wrapper}>
      <h3>DETAIL</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '3vh', width: '100%' }}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Yêu cầu nhập tên' }}
            render={({ field }) => (
              <TextField
                id="name"
                label="*Họ tên"
                variant="outlined"
                className={styles.inputForm}
                {...register('name')}
                helperText={errors.name ? <p>{errors.name.message}</p> : ''}
              />
            )}
          />
        </div>

        <div style={{ marginBottom: '3vh' }}>
          <Controller
            control={control}
            name="age"
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
                label="* Tuổi"
                variant="outlined"
                className={styles.inputForm}
                {...register('age')}
                helperText={errors.age ? <p>{errors.age.message}</p> : ''}
              />
            )}
          />
        </div>

        <div style={{ marginBottom: '3vh' }}>
          <Controller
            control={control}
            name="gmail"
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
                label="* Gmail"
                variant="outlined"
                className={styles.inputForm}
                {...register('gmail')}
                helperText={errors.gmail ? <p>{errors.gmail.message}</p> : ''}
              />
            )}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormDataTest;
