import styled from 'styled-components';
import { BiImageAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { changeCanvasImage } from '../../store';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: 30px;
    transition: all 0.3s;
    color: black;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    await axios
      .post('/api/upload', formData, config)
      .then((response) => {
        dispatch(changeCanvasImage(response.data.fileInfo.filename));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
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
