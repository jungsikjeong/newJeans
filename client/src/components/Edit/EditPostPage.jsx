import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeCanvasImage, clearPosts } from '../../store';
import { categoriesData } from '../../utils/categoriesData';
import { Button } from '../common/Button.styled';
import { CardFooter, InnerItem } from '../common/Card.styled';
import FileUpload from '../CardDeco/SideMenu/FileUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGetPost } from '../../store/postsSlice';
import Loading from '../common/Loading';
import axios from 'axios';

const Container = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
    padding: 10px;
    margin-top: 0rem;
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 5rem;
`;

const CreatedWrap = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  margin-top: 50px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.input`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #eee;

  &:focus {
    outline: 1px solid rgb(6, 172, 255);
  }

  &:first-child {
    margin-top: 0;
  }
`;

const Body = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 22px;
  height: 200px;
  border: solid 2px #eee;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: 1px solid rgb(6, 172, 255);
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;

  .category-label {
    font-size: 15px;
    line-height: 2rem;
    padding: 0.2em 0.4em;
  }

  .category-span {
    vertical-align: middle;
  }

  .category-input {
    vertical-align: middle;
    appearance: none;
    border: 2px solid #999;
    border-radius: 50%;
    width: 16px;
    height: 16px;

    &:focus-visible {
      outline-offset: 0.1em;
      outline: 0.1em dotted tomato;
    }

    &:checked {
      outline: none;
      border: 0.4em solid rgb(6, 172, 255);
    }

    &:hover {
      box-shadow: 0 0 0 0.2em lightgray;
      cursor: pointer;
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
`;

const Message = styled.div`
  color: tomato;
  font-size: 12px;
  margin-top: 9px;
`;

const Preview = styled.div`
  position: relative;
  color: white;
  width: 100%;
  max-width: 300px;
  height: 460px;
  margin: auto;
  margin-top: 50px;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover .inner-item {
    opacity: 0.1;
  }
`;

const InnerItemStyle = styled(InnerItem)`
  transition: all 0.3s;
  display: block;
`;

const EditPostPage = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const titleRef = useRef();
  const bodyRef = useRef();

  const { post, loading } = useSelector((state) => state.posts);

  const [title, setTitle] = useState('');
  const [textBody, setTextBody] = useState('');
  const [image, setImage] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [message, setMessage] = useState({ titleError: '', bodyError: '' });
  const [date, setDate] = useState('');

  const { titleError, bodyError } = message;

  const [submitBtnColor, setSubmitBtnColor] = useState('rgb(134,179,219)');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { canvasImage } = useSelector((state) => state.upload);

  const handleChangeTitle = (e) => {
    if (titleRef.current.style.outlineColor === 'tomato') {
      titleRef.current.style.outlineColor = 'rgb(6, 172, 255)';
      setMessage({ ...message, titleError: '' });
    }
    setTitle(e.target.value);
  };

  const handleChangeBody = (e) => {
    if (bodyRef.current.style.outlineColor === 'tomato') {
      bodyRef.current.style.outlineColor = 'rgb(6, 172, 255)';
      setMessage({ ...message, bodyError: '' });
    }
    setTextBody(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.name);
  };

  const handleCancel = () => {
    setTitle('');
    setTextBody('');
    setIsImage('');
    setMessage({ titleError: '', bodyError: '' });
    setSubmitBtnColor('rgb(134,179,219)');
    setSelectedCategory('민지');
    dispatch(changeCanvasImage(''));
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      titleRef.current.style.outlineColor = 'tomato';
      titleRef.current?.focus();
      setMessage({ titleError: '제목을 입력해주세요' });
      return;
    }

    if (title.length > 7) {
      titleRef.current.style.outlineColor = 'tomato';
      titleRef.current?.focus();
      setMessage({ titleError: '제목이 너무 길어요 (7자이하)' });
      return;
    }

    if (textBody.length === 0) {
      bodyRef.current.style.outlineColor = 'tomato';
      bodyRef.current?.focus();
      setMessage({ bodyError: '내용을 입력해주세요' });
      return;
    }

    if (textBody.length > 30) {
      bodyRef.current.style.outlineColor = 'tomato';
      bodyRef.current?.focus();
      setMessage({ bodyError: '내용이 너무 길어요 (30자이하)' });
      return;
    }

    const body = {
      title,
      textBody,
      category: selectedCategory,
    };

    const formData = new FormData();
    formData.append('file', image);
    formData.append('data', JSON.stringify(body));

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    await axios
      .put(`/api/posts/${id}`, image ? formData : body, config)
      .then((response) => {
        if (response.data) {
          setMessage({ titleError: '', bodyError: '' });
          navigate(-1);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(fetchGetPost(id));
  }, []);

  useEffect(() => {
    if (!titleError && !bodyError && title && textBody) {
      // Submit버튼 색상이 전송가능한 색상으로 변환
      setSubmitBtnColor('rgb(68 131 239)');
    } else {
      setSubmitBtnColor('rgb(134,179,219)');
    }

    if (canvasImage !== null && canvasImage) {
      setIsImage(false);
    }
  }, [bodyError, textBody, title, titleError, canvasImage]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setTextBody(post.body);
      setSelectedCategory(post.category);
      setDate(post.date);
      dispatch(changeCanvasImage(`/uploads/${post.image}`));
    }
  }, [post, dispatch]);
  return (
    <>
      {loading && <Loading />}

      {!loading && user && post && (
        <Container className='fade-item'>
          <CreatedWrap>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Title
                placeholder='Title'
                ref={titleRef}
                value={title || ''}
                onChange={(e) => handleChangeTitle(e)}
              />
              {titleError && <Message>{titleError}</Message>}

              <Body
                value={textBody || ''}
                placeholder='Body'
                ref={bodyRef}
                onChange={(e) => handleChangeBody(e)}
              />

              {bodyError && <Message>{bodyError}</Message>}

              <Category>
                {categoriesData.map((category, index) => (
                  <label className='category-label' key={index}>
                    <input
                      type='radio'
                      className='category-input'
                      name={category.name}
                      value={selectedCategory}
                      checked={selectedCategory === category.name}
                      onChange={(e) => handleChangeCategory(e)}
                    />
                    <span className='category-span'>{category.name}</span>
                  </label>
                ))}
              </Category>

              <BtnWrap>
                <FileUpload
                  isImage={isImage}
                  setImage={setImage}
                  locationPostEdit='true'
                />
                <Button
                  type='submit'
                  backgroundColor={submitBtnColor}
                  shadowColor={'none'}
                  style={{ marginRight: '5px' }}
                >
                  작성하기
                </Button>
                <Button
                  type='button'
                  backgroundColor={'tomato'}
                  shadowColor={'none'}
                  onClick={() => handleCancel()}
                >
                  취소하기
                </Button>
              </BtnWrap>
            </Form>
          </CreatedWrap>

          <Preview className='fade-item'>
            <img src={canvasImage ? canvasImage : ''} alt='' />

            <InnerItemStyle className='inner-item'>
              <div>
                <h4>{title ? title : post.title}</h4>
                <p>{textBody ? textBody : post.body}</p>
              </div>

              <CardFooter>{date && date.substr(0, 6)}</CardFooter>
            </InnerItemStyle>
          </Preview>
        </Container>
      )}
    </>
  );
};

export default EditPostPage;
