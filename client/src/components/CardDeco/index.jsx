import * as S from './CardDeco.styled';
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Transformer,
} from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoTextSize } from 'react-icons/go';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { BiUpload } from 'react-icons/bi';
import { Navigate, useNavigate } from 'react-router-dom';

import useImage from 'use-image';
import FileUpload from './SideMenu/FileUpload';
import StickerCollection from './SideMenu/StickerCollection';
import TextCollection from './SideMenu/TextCollection';

import { downloadURI } from '../../utils/downloadURI';
import { changeCanvasImage } from '../../store';

let id = 0;

const CanvasBackgroundImage = ({ url, width, handleCheckDeselect }) => {
  const [image] = useImage(url);

  return (
    <KonvaImage
      className='background-image'
      onMouseDown={handleCheckDeselect}
      onTouchStart={handleCheckDeselect}
      image={image}
      width={width}
      height={500}
    />
  );
};

const StickerImage = ({
  url,
  isSelected,
  onSelect,
  shapeProps,
  onChange,
  onDragStart,
  isDragging,
}) => {
  const [image] = useImage(url);

  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // transformer 수동연결
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        x={150}
        y={250}
        image={image}
        width={200}
        height={150}
        scaleX={isDragging ? 1.2 : 1}
        scaleY={isDragging ? 1.2 : 1}
        draggable={true}
        onDragStart={(e) => onDragStart(e)}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const TextFiled = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  x,
  y,
  fill,
  fontSize,
  text,
  isDragging,
  onDragStart,
  position,
  stageRef,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // transformer 수동연결
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        x={x}
        y={y}
        fill={fill ? fill : 'black'}
        fontSize={fontSize}
        text={text}
        scaleX={isDragging ? 1.2 : 1}
        scaleY={isDragging ? 1.2 : 1}
        onDragStart={(e) => onDragStart(e)}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            fill: e.target.fill(),
            isDragging: false,
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const CardDeco = ({ user }) => {
  const [toggle, setToggle] = useState({
    textMenu: false,
    sicker: false,
  });

  const { textMenu, sicker } = toggle;

  const [width, setWidth] = useState(500);
  const [tag, setTag] = useState('');

  const [texts, setTexts] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const { canvasImage } = useSelector((state) => state.upload);

  const dispatch = useDispatch();
  const stageRef = useRef();

  const navigator = useNavigate();

  /** 사이드메뉴 클릭시 서브메뉴 on,off */
  const handleToggle = (e) => {
    const status = e.currentTarget.dataset.id;

    switch (status) {
      case 'textMenu':
        setToggle({ textMenu: !textMenu });
        break;

      case 'sicker': // if (x === 'value2')
        setToggle({ sicker: !sicker });
        break;

      default:
        break;
    }
  };

  const handleCloseBtn = () => {
    setToggle({
      textMenu: false,
      sicker: false,
    });
  };

  /** 텍스트 태그 선택 ex)H1, H2 select */
  const handleSelectText = (text) => {
    let textTypes = {};

    textTypes = { id: id.toString(), text: text, isDragging: false, color: '' };
    id++;
    const copyText = [...texts];
    copyText.push(textTypes);
    setTexts(copyText);

    setTag(textTypes);
  };

  /** 스티커 선택 */
  const handleSelectSticker = (sticker) => {
    let stickerObj = {};

    stickerObj = { id: id.toString(), url: sticker, isDragging: false };
    id++;
    const copyText = [...stickers];
    copyText.push(stickerObj);
    setStickers(copyText);
  };

  const handleTextColor = (e) => {
    const color = e.currentTarget.style.backgroundColor;

    const index = texts.findIndex((text) => text.id === selectedId);
    if (index !== -1) {
      const copy = [...texts];

      copy[index].color = color;
      setTexts(copy);
    }
  };

  const handleTextDragStart = (e) => {
    const id = e.currentTarget.index;

    setTexts(
      texts.map((text) => {
        return {
          ...text,
          isDragging: text.id === id.toString(),
        };
      })
    );
  };

  const handleStickerDragStart = (e) => {
    const id = e.currentTarget.index;

    setStickers(
      stickers.map((sticker) => {
        return {
          ...sticker,
          isDragging: sticker.id === id.toString(),
        };
      })
    );
  };

  const handleCheckDeselect = (e) => {
    const clickedOnImage = e.target.attrs.className === 'background-image';

    // 빈영역을 클릭하면 체크 해제, Stage를 클릭했을때
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(false);
    }

    // backgroundImage를 클릭하면 체크 해제
    if (clickedOnImage) {
      selectShape(false);
    }
  };

  /** 작성된 카드 보내기 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm('카드 꾸미기를 완료하시겠습니까?')) {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      downloadURI(uri, 'card.png');
    }
    <Navigate to='/writer' />;
  };

  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth <= 513) {
        setWidth(350);
      } else {
        setWidth(500);
      }
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
      dispatch(changeCanvasImage(''));
    };
  }, [width]);

  return (
    <>
      {user && (
        <S.Container className='fade-item'>
          <S.Wrapper>
            <S.SideNav>
              <ul className='side-list'>
                <li className='side-item'>
                  <FileUpload />
                  <span>background</span>
                </li>
                <li className='side-item'>
                  <GoTextSize
                    className='icon'
                    data-id='textMenu'
                    onClick={(e) => handleToggle(e)}
                  />
                  <span>Text</span>
                </li>
                <li className='side-item'>
                  <MdOutlineEmojiEmotions
                    className='icon'
                    data-id='sicker'
                    onClick={(e) => handleToggle(e)}
                  />
                  <span>sicker</span>
                </li>
                <li className='side-item'>
                  <BiUpload className='icon' onClick={(e) => handleSubmit(e)} />
                  <span>Save</span>
                </li>
                <li className='side-item'>
                  <FiHome className='icon' onClick={() => navigator('/')} />
                  <span>Home</span>
                </li>
              </ul>
            </S.SideNav>

            {textMenu && (
              <TextCollection
                handleSelectText={handleSelectText}
                handleTextColor={handleTextColor}
                handleCloseBtn={handleCloseBtn}
                tag={tag}
              />
            )}
            {sicker && (
              <StickerCollection
                handleCloseBtn={handleCloseBtn}
                handleSelectSticker={handleSelectSticker}
              />
            )}

            <S.Main
              backgroundColor={canvasImage ? '' : 'white'}
              menuClick={
                toggle.textMenu === true || toggle.sicker === true ? 'true' : ''
              }
            >
              {/* Stage는 div wrapper이다 */}
              <Stage
                ref={stageRef}
                width={width}
                height={500}
                onMouseDown={handleCheckDeselect}
                onTouchStart={handleCheckDeselect}
              >
                {/* Layer는 캔버스다 */}
                <Layer>
                  {canvasImage && (
                    <CanvasBackgroundImage
                      url={canvasImage}
                      width={width}
                      onMouseDown={handleCheckDeselect}
                      onTouchStart={handleCheckDeselect}
                    />
                  )}

                  {texts &&
                    texts.map((text, i) => (
                      <TextFiled
                        key={i}
                        shapeProps={text}
                        isSelected={text.id === selectedId}
                        onSelect={(e) => {
                          selectShape(text.id);
                        }}
                        onChange={(newAttrs) => {
                          const rects = texts.slice();
                          rects[i] = newAttrs;
                          setTexts(rects);
                        }}
                        isDragging={text.isDragging}
                        onDragStart={handleTextDragStart}
                        text={text.text && text.text}
                        x={150}
                        y={250}
                        fill={text.color ? text.color : 'black'}
                        fontSize={32}
                      />
                    ))}

                  {stickers &&
                    stickers.map((sticker, i) => (
                      <StickerImage
                        key={i}
                        url={sticker.url}
                        shapeProps={sticker}
                        isSelected={sticker.id === selectedId}
                        onSelect={(e) => {
                          selectShape(sticker.id);
                        }}
                        isDragging={sticker.isDragging}
                        onChange={(newAttrs) => {
                          const rects = stickers.slice();
                          rects[i] = newAttrs;
                          setStickers(rects);
                        }}
                        onDragStart={handleStickerDragStart}
                      />
                    ))}
                </Layer>
              </Stage>
            </S.Main>
          </S.Wrapper>
        </S.Container>
      )}
    </>
  );
};

export default CardDeco;
