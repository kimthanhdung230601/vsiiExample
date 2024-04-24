import styles from './scss.module.scss';
interface buttonProp {
  value: number;
  setSubtractValue: (value: number) => void;
}
const Button = ({ value, setSubtractValue }: buttonProp) => {
  console.log('button subtract component');

  return (
    <>
      <button
        onClick={() => setSubtractValue(value)}
        className={styles.wrapper}
      >
        handleClick
      </button>
    </>
  );
};

export default Button;
