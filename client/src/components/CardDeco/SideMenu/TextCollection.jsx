import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';

import Layout from './Layout';
import { useState } from 'react';

const Header = styled.header`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 15px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  font-weight: bold;

  .icon {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 25px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const TextWrapper = styled.section`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: space-around;
    padding: 5px;
  }
  display: flex;
  padding: 12px;
`;

const Text = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 50px;
  }
  width: 60px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  margin: 3px;

  cursor: pointer;

  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const Guide = styled.section`
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 12px;
`;

const Colors = styled.section`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    overflow: scroll;
  }

  padding: 12px;
`;

const ColorsWrap = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 500px;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: all 0.3s;

  div {
    @media (max-width: ${({ theme }) => theme.mobile}) {
    }
    width: 40px;
    height: 40px;
    margin: 2px;
  }
`;

const Title = ({ handleCloseBtn }) => {
  return (
    <Header>
      <h4>Text settings</h4>
      <div className='icon'>
        <GrFormClose style={{ cursor: 'pointer' }} onClick={handleCloseBtn} />
      </div>
    </Header>
  );
};

const TextCollection = ({
  handleSelectText,
  handleTextColor,
  tag,
  handleCloseBtn,
}) => {
  const [collections, setCollections] = useState([
    { text: '민지' },
    { text: '하니' },
    { text: '다니엘' },
    { text: '해린' },
    { text: '혜인' },
  ]);

  return (
    <Layout>
      <Title handleCloseBtn={handleCloseBtn} />

      <TextWrapper>
        {collections.map((collection, index) => (
          <Text key={index} onClick={() => handleSelectText(collection.text)}>
            <span>{collection.text}</span>
          </Text>
        ))}
      </TextWrapper>
      {tag && (
        <Colors>
          <ColorTable handleTextColor={handleTextColor} />
        </Colors>
      )}

      {!tag ? (
        <Guide>
          <p>카드에 삽입할 텍스트를 먼저 선택해주세요</p>
        </Guide>
      ) : (
        <Guide>
          <p>글씨를 클릭후 색상을 선택해주세요</p>
        </Guide>
      )}
    </Layout>
  );
};

const ColorTable = ({ handleTextColor }) => {
  return (
    <ColorsWrap>
      <div
        className='circle-shadow'
        style={{ background: 'white' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#D3D3D3' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#D6F9F3' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#4FF8CB' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#FF92FE' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#D43FF3' }}
        onClick={(e) => handleTextColor(e)}
      ></div>

      <div
        className='circle-shadow'
        style={{ background: '#FF7A78' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#FFE479' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#E3FECC' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#5EDECE' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#FF4B4A' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
      <div
        className='circle-shadow'
        style={{ background: '#1E2D32' }}
        onClick={(e) => handleTextColor(e)}
      ></div>
    </ColorsWrap>
  );
};

export default TextCollection;
