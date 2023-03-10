import styled, { css, keyframes } from 'styled-components';
import { BiImageAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import { changeCanvasImage } from '../../../store';
import { useLocation } from 'react-router-dom';

const scale = keyframes`
to{  
  transform: scale(1.2);
  opacity: 1;
}
from{  
  opacity: 0.5;
  transform: scale(1.0);
}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.writerPage ? 'flex-start' : 'center')};
  align-items: center;

  label {
    font-size: 30px;
    transition: all 0.3s;
    color: black;
    cursor: pointer;

    ${(props) =>
      props.isImage &&
      css`
        color: red;
        animation: ${scale} 0.5s infinite linear alternate;
      `}

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const FileUpload = ({ isImage, setImage, locationPostEdit }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // 카드 작성 페이지에서 writer.js에 이미지를 넘겨주기위한 코드
    if (setImage) {
      setImage(file);
    }

    const reader = new FileReader();

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);

      reader.onload = function () {
        dispatch(changeCanvasImage(reader.result));
      };
    }
  };

  return (
    <Container
      isImage={isImage}
      writerPage={location.pathname === '/writer' || locationPostEdit}
    >
      <label htmlFor='input-file'>
        <BiImageAdd data-id='uploadImage' />
      </label>

      <input
        type='file'
        name='file'
        id='input-file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload(e)}
      />
    </Container>
  );
};

export default FileUpload;
