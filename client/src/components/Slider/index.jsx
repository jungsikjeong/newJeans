import * as S from './Slider.styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../../assets/images/민지.jpg';
import img2 from '../../assets/images/하니.jpg';
import img3 from '../../assets/images/해린.jpg';
import img4 from '../../assets/images/다니.jpg';
import img5 from '../../assets/images/혜인.jpg';
import { useEffect, useState } from 'react';

const data = [
  {
    id: 0,
    name: '민지',
    src: img1,
  },
  {
    id: 1,
    name: '하니',
    src: img2,
  },
  {
    id: 2,
    name: '해린',
    src: img3,
  },
  {
    id: 3,
    name: '다니',
    src: img4,
  },
  {
    id: 4,
    name: '혜인',
    src: img5,
  },
];

const SliderCompo = ({ handleAvatarChange, avatar }) => {
  const [initialSlideNumber, setInitialSlideNumber] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlideNumber,
    afterChange: (current) => handleAvatarChange(data[current]),
  };

  useEffect(() => {
    // Edit페이지에서 해당 유저의 아바타가 먼저 슬라이드에 보이게해줌
    if (avatar) {
      const avatarName = avatar.substr(14, 2);

      const { id } = data.find((item) => item.name === avatarName);

      setInitialSlideNumber(id);
    } else {
      setInitialSlideNumber(0);
    }
  }, []);

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
