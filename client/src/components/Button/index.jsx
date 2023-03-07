import React from 'react';
import * as S from './Button.styled';

const Button = ({ children, className, ...rest }) => {
  return (
    <S.Button
      {...rest}
      className={className}
      color={rest.color}
      background={rest.background}
    >
      {children}
    </S.Button>
  );
};

export default Button;
