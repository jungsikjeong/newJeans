import styled from 'styled-components';
import { AiOutlineCamera } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;

  label {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const FileUpload = () => {
  //   const [file, setFile] = useState();

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    await axios
      .post('/api/upload', formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <label htmlFor='input-file'>
        <AiOutlineCamera />
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
