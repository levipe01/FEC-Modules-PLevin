import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = (props) => (
  <div className="a-carousel-card" key={props.item.id}>
    <img src={props.item.image_url}/>
    <a href={props.item.product_url}>{props.item.name}</a>
    <div>
      <div className="price">${props.item.price}</div>
      {
        props.item.is_prime
          ? <div className="prime_logo"></div>
          : <div></div>
      }
    </div>
  </div>
);

GalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GalleryItem;
