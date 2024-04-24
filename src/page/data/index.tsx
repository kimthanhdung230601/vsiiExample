import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './styles.module.scss';
import Detail from './detail';
import { Button, Grid } from '@mui/material';
import { getListData } from '../../api/admin';
import { useEffect, useState } from 'react';
interface ManagerProps {
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
  const [detail, setDetail] = useState<any>([]);
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const res = await getListData();
        setData(res);
      } catch (error) {
        alert('failed');
      }
    };

    fetchDataAndSetData();
  }, []);
  const handleSetData = (value: any) => {
    setDetail(value);
    // console.log(value);
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
  return (
    <>
      <div className={styles.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className={styles.tableWrapper}>
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 }
                  }
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
              />
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
