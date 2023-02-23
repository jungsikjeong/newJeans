import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}

body{
  background: #f9f5f2;
}

img{
    max-width:100%;
    width:100%;
    height:100%;
}

a{
  text-decoration:none;
  color:#000;
}


.fade-col {
  opacity: 0;
  animation: fade-in 400ms ease-out forwards;
}

.fade-item{
  opacity: 0;
  animation: fade 400ms ease-out forwards;
}

.alert{
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width:100px;
    top:-480px;
    right:150px;
    font-size:10px;
  }
  text-align:center;
  width:130px;
  position: absolute;
  color: tomato;
  font-size: 14px;
  right: 280px;
  top: -400px;
  z-index: 200;
  padding: 30px 25px;
  background: #fff;
  box-shadow:0 3px 5px rgba(0,0,0,.2);
  border-radius:50%;
  opacity: 0;
  transform: scale(0);
  animation: alert-fade-in  400ms ease-out forwards;
  transition:.4s .6s linear;
  &:after, &:before{
    @media (max-width: ${({ theme }) => theme.mobile}) {
      left:80px;
      bottom:-30px;
    }
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: #fff;
    left: 170px;
    bottom: -8px;
    box-shadow:0 2px 5px rgba(0,0,0,.2);
    border-radius:50%;
  }
  &:before{
    @media (max-width: ${({ theme }) => theme.mobile}) {
     display: none;
    }
    width: 15px;
    height: 15px;
    left: 205px;
    bottom: -25px;
  }
}

@keyframes alert-fade-in {
0%{
  opacity: 0;
  transform: scale(0);
}

100%{
  opacity: 1;
  transform: scale(1);
}

}


@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 5px, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}   


@keyframes fade {
    0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}   
`;

export default GlobalStyles;
