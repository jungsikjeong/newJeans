import { useState } from 'react';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import * as S from './Search.styled';

const Search = () => {
  const [list, setList] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  return (
    <S.Container>
      <S.Wrapper>
        <S.Form>
          <S.Input type='text' placeholder='Search...' />
        </S.Form>

        {/* 검색어를 찾지 못했을때 보여줄 문구 */}
        <S.NotSearch>No search results for "asd".</S.NotSearch>
      </S.Wrapper>
      <Row>
        {list.map((item, index) => (
          <Col className='fade-col' key={index}>
            <img
              src='http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg'
              alt=''
            />
            <InnerItem className='fade-item'>
              <div>
                <h4>민지입니다</h4>
                <p>어텐션부터시작해서 너무 팬입니다.</p>
              </div>
            </InnerItem>
            <CardFooter>23.1.28</CardFooter>
          </Col>
        ))}
      </Row>
    </S.Container>
  );
};

export default Search;
