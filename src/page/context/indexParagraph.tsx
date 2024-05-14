import styles from './styles.module.scss';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ThemeContextExample } from '.';
import 'animate.css';

interface ParagraphProps {}

const Paragraph = () => {
  const value = useContext(ThemeContextExample);
  console.log('value', value);

  return (
    <>
      <div className={styles.paraWraper}>
        {value.theme === 'started' ? (
          <>
            <img
              className={
                value.value === 'appear'
                  ? `${styles.image} animate__animated animate__bounceInDown`
                  : `${styles.image} animate__animated animate__bounceOutUp`
              }
              alt=""
              src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-character-pokemon-character-in-a-blue-and-grey-vector-png-image_12168385.png"
            />
          </>
        ) : (
          <></>
        )}

        <p className={styles.animationExample}>
          Below are a series of poorly constructed paragraphs and possible
          solutions. Put yourself in the place of a teacher. Criticise the
          structure of each paragraph and suggest how it might be improved. Be
          very critical about how the paragraph is constructed and how well the
          ideas flow. There are quite a few examples to have a go at because
          being critical of the work of others is difficult but gets easier the
          more you practice.
        </p>
      </div>
    </>
  );
};

export default Paragraph;
