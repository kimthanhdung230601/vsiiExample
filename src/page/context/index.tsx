import { createContext, useState } from 'react';
import ExamContent from './indexContent';
import styles from './styles.module.scss';
interface ExamContextProps {}
//useContext:
//Create context
//Provider: Cung cấp dữ liệu
//Consumer: Sử dụng dữ liệu
// Provider, consumer là react component
export const ThemeContextExample = createContext({
  theme: '',
  value: ''
});
const ExamContext = () => {
  console.log('ThemeContextExample:', ThemeContextExample);
  const [theme, setTheme] = useState('start');
  const [value, setValue] = useState('hide');
  const handleSetTheme = () => {
    setTheme('started');
    setValue(value === 'appear' ? 'hide' : 'appear');
  };
  return (
    <>
      <ThemeContextExample.Provider value={{ theme, value }}>
        <div className={styles.wrapper}>
          <button className={styles.btn} onClick={handleSetTheme}>
            TOGGLE THEME
          </button>
          <ExamContent />
        </div>
      </ThemeContextExample.Provider>
    </>
  );
};

export default ExamContext;
