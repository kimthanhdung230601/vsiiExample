import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../action/dishAction';
import { AppDispatch } from '../../store';
import styles from './styles.module.scss';
const ReduxTest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataState: any = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  console.log('dataState', dataState.reloadCount.error);
  return (
    <>
      <div>
        {dataState.reloadCount.error === 'Failed' ? (
          <p className={styles.error}>Lỗi không tải được dữ liệu</p>
        ) : (
          <>
            <ul className={styles.wrapper}>
              {dataState.reloadCount.data.data?.data.map((item: any) => (
                <li key={item.id} className={styles.item}>
                  <p> {item.attributes.name}</p>
                  {item.attributes.description}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default ReduxTest;
