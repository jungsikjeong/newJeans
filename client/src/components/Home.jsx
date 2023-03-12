import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPosts, fetchPagination } from '../store/postsSlice';
import CardList from './CardList';
import Loading from './common/Loading';
import NotPosts from './common/NotPosts';

let page = 1;

const Home = () => {
  let params;

  const dispatch = useDispatch();
  const { posts, lastPage, loading } = useSelector((state) => state.posts);

  const handlePageChange = async () => {
    page++;

    params = { page };

    dispatch(fetchPagination(params));
  };

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && posts.length === 0 ? (
        <NotPosts />
      ) : (
        <CardList
          data={posts}
          page={page}
          lastPage={lastPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Home;
