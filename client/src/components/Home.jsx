import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPosts, nextPage } from '../store';
import { fetchGetPosts, fetchPagination } from '../store/postsSlice';
import CardList from './CardList';
import Loading from './common/Loading';
import NotPosts from './common/NotPosts';

const Home = () => {
  let params;

  const dispatch = useDispatch();
  const { posts, page, lastPage, loading } = useSelector(
    (state) => state.posts
  );

  const handlePageChange = async () => {
    dispatch(nextPage());

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
