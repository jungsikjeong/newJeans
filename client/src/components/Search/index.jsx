import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import * as S from './Search.styled';

const Search = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (text && text.length !== 0) {
      axios
        .post('/api/search', { text })
        .then((res) => setData(res.data))
        .catch((err) => setError(true), setData([]));
    }
  };

  useEffect(() => {
    return () => {
      setData([]);
      setError(false);
    };
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Form onSubmit={(e) => handleSearch(e)}>
          <S.Input
            type='text'
            placeholder='Search...'
            value={text}
            onChange={(e) => handleChange(e)}
          />
        </S.Form>

        {/* 검색어를 찾지 못했을때 보여줄 문구 */}
        {error && (
          <>
            <S.NotSearch>No search results for "{text}".</S.NotSearch>
          </>
        )}
      </S.Wrapper>

      <Row>
        {data &&
          !error &&
          data.map((item, index) => (
            <Col className='fade-col' key={index}>
              <img src={`uploads/${item.image}`} alt='' />
              <InnerItem className='fade-item'>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
                <CardFooter>23.1.28</CardFooter>
              </InnerItem>
            </Col>
          ))}
      </Row>
    </S.Container>
  );
};

export default Search;
