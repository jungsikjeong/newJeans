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
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Col = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    /* height: 100%; */
    height: 450px;
    padding: 10px;
  }
  position: relative;
  width: 100%;
  height: 460px;

  :hover {
    color: white;
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
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;

  .contents {
    text-align: center;
    margin-top: 50px;

    h4 {
      font-size: 30px;
    }

    p {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
      margin-top: 100px;
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
  margin-bottom: 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
`;
