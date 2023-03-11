import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPosts } from '../store/postsSlice';
import CardList from './CardList';
import Loading from './common/Loading';
import NotPosts from './common/NotPosts';

let page = 1;

const Home = () => {
  let params;

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const [list, setList] = useState([]);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async () => {
    page++;

    params = { page };

    axios
      .get('/api/posts', { params })
      .then((res) => setList([...list, ...res.data]));

    // dispatch(fetchGetPosts(params));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/posts', { params })
      .then((res) => setList(res.data), setLoading(false));

    // dispatch(fetchGetPosts());
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && list.length === 0 ? (
        <NotPosts />
      ) : (
        <CardList data={list} handlePageChange={handlePageChange} />
      )}
    </>
  );
};

export default Home;
