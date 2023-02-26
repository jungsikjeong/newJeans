import { useEffect, useRef } from 'react';
import * as S from './Writer.styled';

import img01 from '../../assets/images/해린.jpg';
import FileUpload from './FileUpload';

const MAX_CANVAS_WIDTH = 500;
const MAX_CANVAS_HEIGHT = 500;

const Writer = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const image = new Image();
    image.src =
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/675/6f4d1c1a58b16059bbab7efa95232713_res.jpeg';
    image.onload = () => {
      context?.drawImage(image, 0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
    };
  });

  return (
    <S.Container>
      <S.Wrapper>
        <S.SideNav>
          <ul className='side-list'>
            <li className='side-item'>
              <FileUpload />
            </li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
          </ul>
        </S.SideNav>

        <S.Main backgroundColor={'white'}>
          <canvas
            ref={canvasRef}
            className='drawing-paper'
            width={MAX_CANVAS_WIDTH}
            height={MAX_CANVAS_HEIGHT}
          ></canvas>
          {/* <div className='drawing-paper' contentEditable='true'></div> */}
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default Writer;
