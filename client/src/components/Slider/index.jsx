import * as S from './Slider.styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../../assets/images/민지.jpg';
import img2 from '../../assets/images/하니.jpg';
import img3 from '../../assets/images/해린.jpg';
import img4 from '../../assets/images/다니엘.jpg';
import img5 from '../../assets/images/혜인.jpg';

const data = [
  {
    id: 0,
    name: '민지',
    src: img1,
  },
  {
    id: 0,
    name: '하니',
    src: img2,
  },
  {
    id: 0,
    name: '해린',
    src: img3,
  },
  {
    id: 0,
    name: '다니엘',
    src: img4,
  },
  {
    id: 0,
    name: '혜인',
    src: img5,
  },
];

const SliderCompo = ({ handleAvatarChange }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => handleAvatarChange(data[current]),
  };

  return (
    <S.Container>
      <S.StyleSlider {...settings}>
        {data.map((i) => (
          <S.WrapperImage key={i.id}>
            <img src={i.src} alt='' />
            <h4>
              Welcome,<span style={{ color: 'tomato' }}>{i.name}!</span>
            </h4>
          </S.WrapperImage>
        ))}
      </S.StyleSlider>
      <p>드래그로 멤버를 선택해주세요.</p>
    </S.Container>
  );
};

export default SliderCompo;
