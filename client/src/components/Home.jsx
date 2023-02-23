import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
  axios.get('/api/auth').then((res) => console.log(res));

  return (
    <>
      <Card />
    </>
  );
};

export default Home;
