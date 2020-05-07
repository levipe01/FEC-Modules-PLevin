import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { consts } from 'react-elastic-carousel';
import GalleryItem from './GalleryItem.jsx';


const Gallery = ({ products, getTotalPages }) => {
  const myArrow = ({ type, onClick }) => {
    const pointer = type === consts.PREV ? 'button-left' : 'button-right';
    return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 200, itemsToShow: 2, itemsToScroll: 2 },
    { width: 400, itemsToShow: 3, itemsToScroll: 3 },
    { width: 600, itemsToShow: 4, itemsToScroll: 4 },
    { width: 800, itemsToShow: 5, itemsToScroll: 5 },
    { width: 1000, itemsToShow: 6, itemsToScroll: 6 },
    { width: 1200, itemsToShow: 7, itemsToScroll: 7 },
    { width: 1400, itemsToShow: 8, itemsToScroll: 8 },
  ];

  const handleResize = (currentBreakPoint) => getTotalPages(currentBreakPoint.itemsToShow)

  return (
    <Carousel itemsToScroll={8} itemsToShow={8} itemPadding={[2, 2, 2, 2, 2]}
      pagination={false} transitionMs={900} renderArrow={myArrow}
      breakPoints={breakPoints} onResize={handleResize}>
      {products.map((item) => <GalleryItem key={item.id} item={item} />)}
    </Carousel>
  );
};

Gallery.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.func,
  onClick: PropTypes.func,
  getTotalPages: PropTypes.func,
};

export default Gallery;
