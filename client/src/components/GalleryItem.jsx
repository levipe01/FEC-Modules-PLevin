import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = (props) => {
  return (
    <div className="a-carousel-card" key={props.item.id}>
      <img src={props.item.image_url}/>
      <div>{props.item.name}</div>
      <div>
        <div className="price">${props.item.price}</div>
        <div className="prime_logo"></div>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string.isRequired,
  })).isRequired,
};

export default GalleryItem;
