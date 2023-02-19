import styled from 'styled-components';

export const Row = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Col = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  :hover {
    .fade-item {
      display: block;
    }
  }
`;

export const InnerItem = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0px;
  background: #f2fe8a;

  div {
    text-align: center;
    margin-top: 50px;

    h4 {
      font-size: 30px;
    }
    p {
      margin-top: 20px;
      padding: 10px;
    }
    .inner-item-text {
      padding-top: 50px;
    }
  }
`;

export const CardFooter = styled.div`
  width: 100%;
  position: absolute;
  bottom: 30px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
`;
