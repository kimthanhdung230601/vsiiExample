import { lazy, Suspense } from 'react';

// import Manager from './listData';
const Manager = lazy(() => import('./listData'));
interface ManageDataProps {}

const ManageData = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Manager />
      </Suspense>
    </>
  );
};

export default ManageData;
