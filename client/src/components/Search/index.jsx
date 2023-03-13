import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearPosts, nextPage } from '../../store';
import { fetchSearchItem, fetchSearchPagination } from '../../store/postsSlice';
import Button from '../Button';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import Loading from '../common/Loading';
import * as S from './Search.styled';

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const Search = () => {
  let params;
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { posts, page, lastPage, loading, error } = useSelector(
    (state) => state.posts
  );

  const handleChange = (e) => {
    if (error) {
      dispatch(clearPosts());
    }

    setText(e.target.value);
  };

  const handlePageChange = async () => {
    dispatch(nextPage());

    params = { text: text, page };

    dispatch(fetchSearchPagination(params));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (text && text.length !== 0) {
      dispatch(clearPosts());
      dispatch(fetchSearchItem(text));
    }
  };

  useEffect(() => {
    dispatch(clearPosts());
  }, []);

  const disabled =
    posts.length === 0 || posts.length === lastPage || posts.length < 12;

  return (
    <S.Container>
      <S.Wrapper>
        <S.Form onSubmit={(e) => handleSearchSubmit(e)}>
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
                <div className='contents'>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
                <CardFooter>{item.date.substr(0, 7)}</CardFooter>
              </InnerItem>
            </Col>
          ))}
      </Row>
      <BtnWrap className='fade-item'>
        <Button
          background='#50bcdf'
          onClick={() => handlePageChange()}
          disabled={disabled}
        >
          More
        </Button>
      </BtnWrap>
    </S.Container>
  );
};

export default Search;
