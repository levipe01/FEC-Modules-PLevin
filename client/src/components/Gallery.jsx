import React from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import GalleryItem from './GalleryItem.jsx';


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    //this.myArrow = this.myArrow.bind(this);
  }

  myArrow({ type, onClick }) {
    const pointer = type === consts.PREV ? '<' : '>'
    return <button className="carousel_button" onClick={onClick}>{pointer}</button>
  }

  render() {
    return (
      <Carousel itemsToScroll={8} itemsToShow={8} itemPadding={[2, 2, 2, 2, 2]} pagination={false} transitionMs={900} renderArrow={this.myArrow}>
        {this.props.products.map((item) => { return (<GalleryItem key={item.id} item={item} />); })}
      </Carousel>
    );
  }
}

export default Gallery;
