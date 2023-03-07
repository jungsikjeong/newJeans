import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store';
import { fetchGetPosts } from '../store/postsSlice';
import CardList from './CardList';
import Loading from './common/Loading';
import NotPosts from './common/NotPosts';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    // axios.get('/api/posts').then((res) => dispatch(getPosts(res.data)));
    dispatch(fetchGetPosts());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      {!loading && posts.length === 0 ? (
        <NotPosts />
      ) : (
        <CardList data={posts} />
      )}
    </>
  );
};

export default Home;
