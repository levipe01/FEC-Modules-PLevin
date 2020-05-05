import React from 'react';

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

export default GalleryItem;
