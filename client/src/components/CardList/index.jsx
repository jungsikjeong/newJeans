import { createRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import * as S from '../common/Card.styled';

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const Card = ({ data, handlePageChange, page, lastPage }) => {
  const fadeCol = Array.from({ length: data.length }).map(() => createRef());
  const fadeBtn = useRef();

  useEffect(() => {
    let num = 500;

    for (let i = 0; i < data.length; i++) {
      fadeCol[i].current.style.animationDelay = `${num}ms`;
      num += 75;
    }
    fadeBtn.current.style.animationDelay = `${num}ms`;
  }, [data.length, fadeCol]);

  const disabled =
    data.length === 0 || data.length === lastPage || data.length < 6;

  console.log(lastPage);

  return (
    <>
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
                <S.CardFooter>{item.date.substr(0, 7)}</S.CardFooter>
              </S.InnerItem>
            </S.Col>
          ))}
      </S.Row>
      <BtnWrap className='fade-col' ref={fadeBtn}>
        <Button
          background='#50bcdf'
          onClick={() => handlePageChange()}
          disabled={disabled}
        >
          More
        </Button>
      </BtnWrap>
    </>
  );
};

export default Card;
