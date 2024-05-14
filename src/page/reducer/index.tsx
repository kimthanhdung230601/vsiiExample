import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  TextField
} from '@mui/material';
import { useReducer } from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
interface FormData {
  linkImage: string;
}
//useReducer
//init state: 0
//Action: up (state+1), down (state-1)
//reducer
//dispatch

//1. init
const initListJob = {
  job: '',
  listJob: [] as any[]
};

//2.Action
//--
const SET_DATA = 'set';
const ADD_NEW_DATA = 'add';
const DELETE_DATA = 'delete';

const setData = (payload: any) => ({
  type: SET_DATA,
  payload
});

const addNewData = (payload: any) => ({
  type: ADD_NEW_DATA,
  payload
});

const deleteData = (keyToDelete: string) => ({
  type: DELETE_DATA,
  payload: { keyToDelete }
});
//3.Reducer
//đầu vào nhận state hiện tại và action

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, job: action.payload };
    case ADD_NEW_DATA:
      return {
        ...state,
        job: action.payload,
        listJob: [...state.listJob, action.payload]
      };
    default:
      return state;
  }
};

const UsingReducer = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newData = data.linkImage;
    dispatch(addNewData({ linkImage: newData }));
  };

  //4. dispatch
  //truyền vào 2 đối số: reducer, initsate
  //khi render, chạy useReducer thì nhận reducer, tạm để đấy đã, nhận initState và return về array
  //count là giá trị khởi tạo (= initState)
  //dispatch: kích hoạt action
  const [job, dispatch] = useReducer(reducer, initListJob);
  console.log(job);

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.inputWrapper}
            id="outlined-basic"
            label="Link image"
            variant="outlined"
            {...register('linkImage')} // Register the input field with React Hook Form
          />
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </form>
      </div>
      <div className={styles.imgWrapper}>
        <Box sx={{ width: 920, height: 450, overflowY: 'scroll' }}>
          {' '}
          <ImageList variant="masonry" cols={4} gap={8}>
            {job.listJob.map((item: any) => (
              <ImageListItem>
                <img
                  src={`${item.linkImage}`}
                  alt={'noImage'}
                  loading="lazy"
                  className={styles.img}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </>
  );
};

export default UsingReducer;
