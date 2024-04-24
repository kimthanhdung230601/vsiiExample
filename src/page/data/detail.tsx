import { TextField, Button } from '@mui/material';
import styles from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface FormData {
  firstName?: string;
  lastName?: string;
  age?: string;
  country?: string;
  sex?: string;
  phoneNumber?: string;
  gmail?: string;
}
interface DetailProp {
  detail: Partial<FormData>;
}
const Detail = ({ detail }: DetailProp) => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    gmail: '',
    sex: '',
    phoneNumber: ''
  });
  const [newData, setNewData] = useState<FormData>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      age: formData.age || '',
      country: formData.country || '',
      gmail: formData.gmail || '',
      sex: formData.sex || '',
      phoneNumber: formData.phoneNumber || ''
    }
  });
  useEffect(() => {
    console.log(detail);
    reset(detail);
    detail && setFormData(detail);
  }, [detail]);
  const onSubmit = (data: FormData) => {
    console.log(data);
    setNewData(data);
  };
  return (
    <>
      <h3>DETAIL</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="firstName"
              label="* First Name"
              {...register('firstName')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName ? errors.firstName.message : ''}
              value={getValues('firstName')}
            />
          )}
        />

        <TextField
          id="Lastname"
          label="Last Name"
          {...register('lastName')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
          value={watch('lastName')}
        />
        <TextField
          id="Age"
          label="Age"
          {...register('age')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
        />
        <TextField
          id="Country"
          label="Country"
          {...register('country')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
        />
        <TextField
          id="Sex"
          label="Sex"
          {...register('sex')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
        />
        <TextField
          id="Phonenumber"
          label="Phone number"
          {...register('phoneNumber')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
        />
        <TextField
          id="Gmail"
          label="Gmail"
          {...register('gmail')}
          variant="outlined"
          style={{ marginBottom: '3vh' }}
          className={styles.inputForm}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Detail;
