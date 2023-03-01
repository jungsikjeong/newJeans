import * as S from './Writer.styled';
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Transformer,
} from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoTextSize } from 'react-icons/go';
import useImage from 'use-image';

import FileUpload from './FileUpload';
import TextTag from './SideMenu/TextTag';

let id = 0;

const URLImage = ({ url, width, fill }) => {
  const [image] = useImage(url);
  return <KonvaImage image={image} width={width} height={500} />;
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

const Writer = () => {
  const [toggle, setToggle] = useState({
    text: true,
  });
  const [width, setWidth] = useState(500);
  const [tag, setTag] = useState('');

  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [textColor, setTextColor] = useState('');

  const { text } = toggle;

  const { canvasImage } = useSelector((state) => state.upload);

  /** 사이드메뉴 클릭시 서브메뉴 on,off */
  const handleToggle = (e) => {
    setToggle({ ...toggle, [e.currentTarget.dataset.id]: !text });
  };

  /** 텍스트 태그 선택 ex)H1, H2 select */
  const handleSelectTag = (e) => {
    const number = e.target.dataset.id;
    let textTypes = {};

    if (number === 'h1') {
      textTypes = {
        id: id.toString(),
        tag: 'h1',
        fontSize: '32',
        text: '',
        color: '',
        isDragging: false,
      };
    }
    if (number === 'h2') {
      textTypes = {
        id: id.toString(),
        tag: 'h2',
        fontSize: '24',
        text: '',
        color: '',
        isDragging: false,
      };
    }
    if (number === 'h3') {
      textTypes = {
        id: id.toString(),
        tag: 'h3',
        fontSize: '19',
        text: '',
        color: '',
        isDragging: false,
      };
    }
    if (number === 'h4') {
      textTypes = {
        id: id.toString(),
        tag: 'h4',
        fontSize: '15',
        text: '',
        color: '',
        isDragging: false,
      };
    }
    if (number === 'h5') {
      textTypes = {
        id: id.toString(),
        tag: 'h5',
        fontSize: '13',
        text: '',
        color: '',
        isDragging: false,
      };
    }
    if (number === 'h6') {
      textTypes = {
        id: id.toString(),
        tag: 'h6',
        fontSize: '10',
        text: '',
        color: '',
        isDragging: false,
      };
    }

    id++;

    const copyText = [...texts];
    copyText.push(textTypes);

    setTexts(copyText);

    setTag(textTypes);
  };

  const handleTextColor = (e) => {
    setTextColor(e.currentTarget.style.backgroundColor);

    const index = texts.findIndex((text) => text.id === selectedId);
    const copy = [...texts];

    copy[index].color = textColor;
    setTexts(copy);
  };

  const handleDragStart = (e) => {
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

  const handleCheckDeselect = (e) => {
    // 빈영역을 클릭하면 체크 해제
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(false);
    }
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
    };
  }, [width]);

  return (
    <S.Container>
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
                data-id='text'
                onClick={(e) => handleToggle(e)}
              />
              <span>Text</span>
            </li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
            <li className='side-item'></li>
          </ul>
        </S.SideNav>

        <TextTag
          handleSelectTag={handleSelectTag}
          handleTextColor={handleTextColor}
          tag={tag}
        />

        <S.Main backgroundColor={canvasImage ? '' : 'white'}>
          {/* Stage는 div wrapper이다 */}
          <Stage
            width={width}
            height={500}
            onMouseDown={handleCheckDeselect}
            onTouchStart={handleCheckDeselect}
          >
            {/* /**Layer는 캔버스다 */}
            <Layer>
              {canvasImage && (
                <URLImage url={`uploads/${canvasImage}`} width={width} />
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
                    onDragStart={handleDragStart}
                    text={text.text ? text.text : '문구입력..'}
                    x={150}
                    y={250}
                    fill={text.color ? text.color : 'black'}
                    fontSize={parseInt(text.fontSize)}
                  />
                ))}
            </Layer>
          </Stage>
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default Writer;
