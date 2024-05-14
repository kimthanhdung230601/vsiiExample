import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
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
    // console.log(detail);
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
        <div style={{ marginBottom: '3vh' }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="firstName"
                label="* First Name"
                {...register('firstName', { required: 'FirstName is require' })}
                variant="outlined"
                className={styles.inputForm}
                value={getValues('firstName')}
              />
            )}
          />
          <div style={{ color: '#DC143C' }}>
            {errors.firstName && errors.firstName.message}
          </div>
        </div>

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="lastName"
              label="* Last Name"
              {...register('lastName')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              value={getValues('lastName')}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="Age"
              label="* Age"
              {...register('age')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              value={getValues('age')}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="country"
              label="* Country"
              {...register('country')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              value={getValues('country')}
            />
          )}
        />
        <Controller
          control={control}
          name="sex"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl fullWidth style={{ marginBottom: '3vh' }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getValues(`sex`)}
                label="sex"
                {...register('sex')}
                // onChange={handleChange}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="phoneNumber"
              label="* Phone Number"
              {...register('phoneNumber')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              value={getValues('phoneNumber')}
            />
          )}
        />
        <Controller
          control={control}
          name="gmail"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              id="gmail"
              label="* Gmail"
              {...register('gmail')}
              variant="outlined"
              style={{ marginBottom: '3vh' }}
              className={styles.inputForm}
              value={getValues('gmail')}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Detail;
