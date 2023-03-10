import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 5px;
  transition: all 0.2s;
  background: ${(props) => props.backgroundColor};
  box-shadow: 0px 5px 0px 0px ${(props) => props.shadowColor || '#a85f37'};

  border: none;
  text-align: center;
  display: block;
  position: relative;
  width: 100px;
  padding: 0;
  font-weight: 600;
  line-height: 30px;
  color: #fff;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
