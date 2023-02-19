import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}


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
