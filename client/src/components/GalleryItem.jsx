import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ item }) => (
  <div className="a-carousel-card" key={item.id}>
    <img src={item.image_url}/>
    <a href={item.product_url}>{item.name}</a>
    <div>
      <div className="price">${item.price}</div>
      {
        item.is_prime
          ? <div className="prime_logo"></div>
          : <div></div>
      }
    </div>
  </div>
);

GalleryItem.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    product_url: PropTypes.string,
    is_prime: PropTypes.bool,
    price: PropTypes.string,
  }),
};

export default GalleryItem;
