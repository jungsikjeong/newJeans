import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPosts } from '../../store';
import { fetchSearchItem } from '../../store/postsSlice';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import Loading from '../common/Loading';
import * as S from './Search.styled';

const Search = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const handleChange = (e) => {
    if (error) {
      dispatch(clearPosts());
    }

    setText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (text && text.length !== 0) {
      dispatch(fetchSearchItem(text));
    }
  };

  useEffect(() => {
    dispatch(clearPosts());
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

      {loading && <Loading />}

      <Row>
        {!loading &&
          posts &&
          posts.map((item, index) => (
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
