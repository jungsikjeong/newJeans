import styled from 'styled-components';

export const Button = styled.button`
  outline: none;
  border: 1px solid #666;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  line-height: 30px;
  transition: 0.3s;
  background: ${(props) => (props.background ? props.background : '#f0f0f0')};
  cursor: pointer;

  &:disabled {
    display: none;
  }

  &:hover {
    opacity: 0.8;
  }

  &.register {
    margin-top: 15px;
    color: ${(props) => (props.color ? 'white' : '#666')};
    background: ${(props) => (props.background ? 'tomato' : '#F0F0F0')};
  }

  &.edit {
    margin-top: 15px;
    color: #666;
    background: #f0f0f0;
    &:hover {
      color: white;
      background: #808080;
    }
  }
`;
