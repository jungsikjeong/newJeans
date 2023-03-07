import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Wrapper = styled.div``;

export const Form = styled.form``;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 80px;
  outline: none;
  color: #efe5d8;
  caret-color: black;
  border: none;
  background-color: transparent;

  &::placeholder {
    color: #efe5d8;
  }
`;

export const NotSearch = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
`;
