import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPosts } from '../../store';
import { fetchMyPageGetPosts } from '../../store/postsSlice';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import Edit from '../Edit/index';
import Button from '../Button';
import Loading from '../common/Loading';

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrap = styled.div`
  img {
    width: 100%;
    max-width: 150px;
    height: 100px;
    border-radius: 4rem;
    margin-bottom: 1rem;
  }
`;

const MyPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);

  const [editMode, setEditMode] = useState(false);

  const handleEditModeChange = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    dispatch(fetchMyPageGetPosts());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <Container>
      {loading && <Loading />}

      {user && editMode && (
        <Edit user={user} handleEditModeChange={handleEditModeChange} />
      )}

      {user && !loading && (
        <>
          <Wrapper>
            <ImageWrap>
              <img src={user.avatar} alt='' />
            </ImageWrap>
            <Button background='tomato' onClick={() => handleEditModeChange()}>
              편집하기
            </Button>
          </Wrapper>
          <Row>
            {posts &&
              posts.map((post, index) => (
                <Col
                  className='fade-item'
                  key={index}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`uploads/${post.image}`} alt='' />

                  <InnerItem className='fade-item'>
                    <div>
                      <h4>{post.title}</h4>
                      <p>{post.body}</p>
                    </div>
                    <CardFooter>{post.date.substr(0, 6)}</CardFooter>
                  </InnerItem>
                </Col>
              ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MyPage;
