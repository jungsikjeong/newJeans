import styled from 'styled-components';
import { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';

import sticker1 from '../../../assets/images/sticker1.png';
import sticker2 from '../../../assets/images/sticker2.png';
import sticker3 from '../../../assets/images/sticker3.png';
import sticker4 from '../../../assets/images/sticker4.png';
import sticker5 from '../../../assets/images/sticker5.png';
import sticker6 from '../../../assets/images/sticker6.png';

import Layout from './Layout';

const StickerContainer = styled.section`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 150px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  height: 350px;
  overflow-y: scroll;

  img {
    cursor: pointer;
  }
`;

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

const Sticker = styled.div`
  img {
    width: 150px;
  }
`;

const Title = ({ handleCloseBtn }) => {
  return (
    <Header>
      <h4>Sticker settings</h4>
      <div className='icon'>
        <GrFormClose style={{ cursor: 'pointer' }} onClick={handleCloseBtn} />
      </div>
    </Header>
  );
};

const StickerCollection = ({ handleCloseBtn, handleSelectSticker }) => {
  const [collections, setCollections] = useState([
    { src: sticker1 },
    { src: sticker2 },
    { src: sticker3 },
    { src: sticker4 },
    { src: sticker5 },
    { src: sticker6 },
  ]);

  return (
    <Layout>
      <Title handleCloseBtn={handleCloseBtn} />

      <StickerContainer>
        {collections.map((collection, index) => (
          <Sticker
            key={index}
            onClick={() => handleSelectSticker(collection.src)}
          >
            <img src={collection.src} alt='' />
          </Sticker>
        ))}
      </StickerContainer>
    </Layout>
  );
};

export default StickerCollection;
