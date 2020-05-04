import React from 'react';
import Carousel from 'react-elastic-carousel';

const Gallery = (props) => {
  let items = props.products
  return (
    <Carousel itemsToScroll={8} itemsToShow={8} itemPadding={[2, 2, 2, 2, 2]} pagination={false} transitionMs={900}>
      {items.map(item => <div className="a-carousel-card" key={item.id}><img src={item.image_url}/><div>{item.name}</div><div className="price">${item.price}</div></div>)}
    </Carousel>
  );
};

export default Gallery;
