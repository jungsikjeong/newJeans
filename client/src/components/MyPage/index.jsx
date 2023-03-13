import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPageGetPosts } from '../../store/postsSlice';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';
import EditProfile from '../Edit/EditProfile';
import Button from '../Button';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { loadUser } from '../../store';

const Container = styled.div``;

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

const PostEditWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 17px;
  margin: 0;
  font-size: 25px;
  display: flex;

  .edit-icon {
    &:hover {
      color: yellow;
    }
  }

  .remove-icon {
    &:hover {
      color: tomato;
    }

    font-size: 28px;
  }
`;

const MyPage = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading } = useSelector((state) => state.posts);

  const [editMode, setEditMode] = useState(false);

  const handleEditModeChange = () => {
    setEditMode(!editMode);
  };

  const handleEditPostPage = (postId) => {
    navigate(`/edit/post/${postId}`);
  };

  const handleRemovePost = async (postId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await axios.delete(`/api/posts/${postId}`).then((res) => {
        if (res.status === 200) {
          dispatch(fetchMyPageGetPosts());
        }
      });
    }
  };

  useEffect(() => {
    setAuthToken(JSON.parse(localStorage.token));
    dispatch(fetchMyPageGetPosts());
  }, []);

  return (
    <Container>
      {loading && <Loading />}

      {user && editMode && (
        <EditProfile user={user} handleEditModeChange={handleEditModeChange} />
      )}

      {user && !loading && (
        <>
          <Wrapper>
            <ImageWrap>
              <img src={user.avatar} alt='' />
            </ImageWrap>

            <div style={{ margin: '0px 0px 10px 0px' }}>{user.nickname}</div>

            <Button background='tomato' onClick={() => handleEditModeChange()}>
              편집하기
            </Button>
          </Wrapper>

          <Row>
            {posts &&
              posts.map((post) => (
                <Col
                  className='fade-item'
                  key={post._id}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`uploads/${post.image}`} alt='' />

                  <InnerItem className='fade-item'>
                    <PostEditWrap>
                      <FaRegEdit
                        className='edit-icon'
                        onClick={() => handleEditPostPage(post._id)}
                      />

                      <MdDeleteOutline
                        className='remove-icon'
                        onClick={() => handleRemovePost(post._id)}
                      />
                    </PostEditWrap>
                    <div className='contents'>
                      <h4>{post.title}</h4>
                      <p>{post.body}</p>
                    </div>
                    <CardFooter>{post.date.substr(0, 7)}</CardFooter>
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
