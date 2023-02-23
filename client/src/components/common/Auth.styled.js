import styled from 'styled-components';

export const Container = styled.div``;

export const Wrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 350px;
  }
  background-color: white;
  position: relative;
  width: 500px;
  margin: auto;
  margin-top: 100px;
  border: 1px solid #eee;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const IconWrap = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  transition: all 0.3s;
  cursor: pointer;

  & path {
    stroke: #666;
  }

  &:hover {
    transform: scale(1.5);
  }
  &:hover path {
    stroke: #333;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  font-size: 15px;
  color: #666;
`;

export const FormGroup = styled.div`
  margin-top: 10px;
  font-size: 15px;
  position: relative;
  color: #666;

  &:focus-within label {
    transform: translateY(-15px);
    font-size: 12px;
    color: #ff4081;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px 0;
  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid #777;
  z-index: 3;
  transition: 0.3s;
  color: #666;

  &:focus {
    border-bottom: 1px solid #ff4081;
  }
`;

export const Label = styled.label`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 5px;
  margin-top: 10px;
  transition: 0.3s;

  font-size: ${(props) => (props.userId ? '12px' : '')};
  color: ${(props) => (props.userId ? '#ff4081' : '')};
  transform: ${(props) => (props.userId ? 'translateY(-15px)' : '')};

  font-size: ${(props) => (props.nickname ? '12px' : '')};
  color: ${(props) => (props.nickname ? '#ff4081' : '')};
  transform: ${(props) => (props.nickname ? 'translateY(-15px)' : '')};

  font-size: ${(props) => (props.password ? '12px' : '')};
  color: ${(props) => (props.password ? '#ff4081' : '')};
  transform: ${(props) => (props.password ? 'translateY(-15px)' : '')};
`;

export const Guide = styled.div`
  text-align: center;
  font-size: 12px;
  padding-bottom: 15px;
  color: #666;
  span {
    color: #ff6347d6;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: red;
    }
  }
`;

export const Message = styled.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: tomato;
`;
