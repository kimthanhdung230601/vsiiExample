import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store';

export const fetchData = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch: any) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    try {
      const response = await axios.get('https://dogapi.dog/api/v2/breeds');
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'Failed' });
    }
  };
};
