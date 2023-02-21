import { createRef, useEffect, useState } from 'react';
import * as S from '../common/Card.styled';

const Card = () => {
  const [list, setList] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const fadeCol = Array.from({ length: list.length }).map(() => createRef());

  useEffect(() => {
    var num = 500;

    for (let i = 0; i < list.length; i++) {
      fadeCol[i].current.style.animationDelay = `${num}ms`;
      num += 75;
    }
  }, []);

  return (
    <S.Row>
      {list.map((item, index) => (
        <S.Col className='fade-col' ref={fadeCol[index]} key={index}>
          <img
            src='http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg'
            alt=''
          />
          <S.InnerItem className='fade-item'>
            <div>
              <h4>민지입니다</h4>
              <p>어텐션부터시작해서 너무 팬입니다.</p>
            </div>
          </S.InnerItem>
          <S.CardFooter>23.1.28</S.CardFooter>
        </S.Col>
      ))}
    </S.Row>
  );
};

export default Card;
