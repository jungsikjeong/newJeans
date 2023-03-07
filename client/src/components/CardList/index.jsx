import { createRef, useEffect } from 'react';
import * as S from '../common/Card.styled';

const Card = ({ data }) => {
  const fadeCol = Array.from({ length: data.length }).map(() => createRef());

  useEffect(() => {
    let num = 500;

    for (let i = 0; i < data.length; i++) {
      fadeCol[i].current.style.animationDelay = `${num}ms`;
      num += 75;
    }
  }, [data.length, fadeCol]);

  return (
    <S.Row>
      {data &&
        data.map((item, index) => (
          <S.Col className='fade-col' ref={fadeCol[index]} key={index}>
            <img src={`uploads/${item.image}`} alt='' />
            <S.InnerItem className='fade-item'>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
              <S.CardFooter>{item.date.substr(0, 6)}</S.CardFooter>
            </S.InnerItem>
          </S.Col>
        ))}
    </S.Row>
  );
};

export default Card;
