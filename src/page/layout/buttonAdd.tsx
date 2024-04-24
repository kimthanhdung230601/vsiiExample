import styles from './scss.module.scss';
interface ButtonAddProps {
  value: number;
  setAddValue: (value: number) => void;
}

const ButtonAdd = ({ value, setAddValue }: ButtonAddProps) => {
  console.log('button add component');
  return (
    <>
      <button onClick={() => setAddValue(value)} className={styles.wrapper}>
        Add Value
      </button>
    </>
  );
};

export default ButtonAdd;
