import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Container = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;

  p {
    text-align: center;
    font-size: 12px;
  }
`;

export const StyleSlider = styled(Slider)`
  margin: 0 auto;
  width: 200px;
  height: 100%;
  overflow: hidden;

  .slick-list {
    padding: 0;
  }

  .slick-track {
  }

  .slick-slide div {
    outline: none;
  }

  .slick-dots {
    bottom: 5px;

    .slick-active {
      button {
        &::before {
          color: tomato;
        }
      }
    }
  }
`;

export const WrapperImage = styled.div`
  text-align: center;

  h4 {
    text-align: center;
    margin-bottom: 35px;
  }

  img {
    margin: 0 auto;
    width: 350px;
    height: 200px;
  }
`;
