import * as S from './Writer.styled';

const Writer = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.SideNav>
          <ul className='side-list'>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
          </ul>
        </S.SideNav>

        <S.Main>
          <div className='drawing-paper'></div>
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default Writer;
