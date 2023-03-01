import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';

import Layout from './Layout';

const Tag = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 12px;
`;

const Guide = styled.section`
  width: 100%;
  /* position: absolute;
  bottom: 0; */
  padding: 12px;
  text-align: center;
  font-size: 12px;
`;

const Colors = styled.section`
  padding: 12px;
`;
const ColorsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: all 0.3s;

  div {
    width: 40px;
    height: 40px;
    margin: 3px;
  }
`;

const title = (
  <>
    <h4>Text settings</h4>
    <div className='icon'>
      <GrFormClose style={{ cursor: 'pointer' }} />
    </div>
  </>
);

const TextTag = ({ handleSelectTag, handleTextColor, tag }) => {
  return (
    <Layout title={title}>
      <Tag>
        <div
          className='circle-shadow'
          data-id='h1'
          onClick={(e) => handleSelectTag(e)}
        >
          H1
        </div>
        <div
          className='circle-shadow'
          data-id='h2'
          onClick={(e) => handleSelectTag(e)}
        >
          H2
        </div>
        <div
          className='circle-shadow'
          data-id='h3'
          onClick={(e) => handleSelectTag(e)}
        >
          H3
        </div>
        <div
          className='circle-shadow'
          data-id='h4'
          onClick={(e) => handleSelectTag(e)}
        >
          H4
        </div>
        <div
          className='circle-shadow'
          data-id='h5'
          onClick={(e) => handleSelectTag(e)}
        >
          H5
        </div>
        <div
          className='circle-shadow'
          data-id='h6'
          onClick={(e) => handleSelectTag(e)}
        >
          H6
        </div>
      </Tag>
      {tag && (
        <Colors>
          <ColorTable handleTextColor={handleTextColor} />
        </Colors>
      )}

      {!tag && (
        <Guide>
          <p>카드에 삽입할 텍스트를 먼저 선택해주세요</p>
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
      <div className='circle-shadow' style={{ background: '#1E2D32' }}></div>
    </ColorsWrap>
  );
};

export default TextTag;
