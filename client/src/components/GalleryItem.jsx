import React from 'react';
import PropTypes from 'prop-types';


const GalleryItem = ({
  item, feedbackVisible, toggleModal, products, updateModalItem,
}) => {
  const handleClick = (event) => {
    toggleModal();
    const pos = products.map((e) => (e.id)).indexOf(event.target.id);
    updateModalItem(products[pos]);
  };

  return (
    <div className="a-carousel-card" key={item.id}>
      {
        feedbackVisible
          ? <div className="carousel-feedback-wrapper" id={item.id} onClick={handleClick}>
              <div className="carousel-feedback" id={item.id}>Feedback</div>
              <div className="carousel-feedback-img" id={item.id}></div>
            </div>
          : <div></div>
      }
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
};


GalleryItem.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    product_url: PropTypes.string,
    is_prime: PropTypes.bool,
    price: PropTypes.string,
  }),
  feedbackVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string.isRequired,
  })).isRequired,
  updateModalItem: PropTypes.func,
};

export default GalleryItem;
