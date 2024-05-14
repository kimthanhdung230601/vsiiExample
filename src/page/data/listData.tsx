import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './styles.module.scss';
import Detail from './detail';
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  makeStyles,
  OutlinedInput
} from '@mui/material';

import { getListData } from '../../api/admin';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
interface FormData {
  dataFind: string;
}
export interface ManagerProps {
  firstName?: string;
  lastName: string;
  age: number;
  id: number;
  country: string;
  sex: string;
  birth?: Date;
  phoneNumber: number;
  degree: string[];
}

const Manager = () => {
  const [data, setData] = useState<ManagerProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<any>({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    gmail: '',
    sex: '',
    phoneNumber: ''
  });
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const res = await getListData();
        setLoading(false);
        setData(res);
      } catch (error) {
        setLoading(false);
        alert('failed');
      }
    };
    fetchDataAndSetData();
  }, []);
  const handleSetData = (value: any) => {
    setDetail(value);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row: ManagerProps) =>
        `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'Button',
      headerName: 'Active',
      sortable: false,
      width: 160,
      renderCell: (row: any) => {
        return (
          <>
            {' '}
            <Button onClick={() => handleSetData(row.row)}>Detail</Button>
          </>
        );
      }
    },
    {
      field: 'Button degree',
      headerName: 'Active degree',
      sortable: false,
      width: 160,
      renderCell: (row: any) => {
        return (
          <>
            {' '}
            <Button onClick={() => handleSetData(row.row)}>
              Detail degree
            </Button>
          </>
        );
      }
    }
  ];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    control,
    formState: { errors }
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <Button variant="contained">ADD NEW</Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="dataFind"
              render={({ field }) => (
                <OutlinedInput
                  {...register('dataFind')}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log('data:', e.target.value);
                  }}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      Search FirstName
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                />
              )}
            />
          </form>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className={styles.tableWrapper}>
              {loading ? (
                <div className={styles.spinnerWrapper}>
                  <CircularProgress className={styles.spinnerWrapper} />
                </div>
              ) : (
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 }
                    }
                  }}
                  pageSizeOptions={[5, 10]}
                />
              )}
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className={styles.detailWrapper}>
              <Detail detail={detail} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Manager;
