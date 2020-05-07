import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { consts } from 'react-elastic-carousel';
import GalleryItem from './GalleryItem.jsx';


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.breakPoints = [
      { width: 1, itemsToShow: 1, itemsToScroll: 1 },
      { width: 200, itemsToShow: 2, itemsToScroll: 2 },
      { width: 400, itemsToShow: 3, itemsToScroll: 3 },
      { width: 600, itemsToShow: 4, itemsToScroll: 4 },
      { width: 800, itemsToShow: 5, itemsToScroll: 5 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 6 },
      { width: 1200, itemsToShow: 7, itemsToScroll: 7 },
      { width: 1400, itemsToShow: 8, itemsToScroll: 8 },
    ];
    this.buttonLeft = 'button-left';
    this.buttonRight = 'button-right';

    this.myArrow = this.myArrow.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.goto = this.goto.bind(this);
  }

  myArrow({ type, onClick }) {
    const pointer = type === consts.PREV ? this.buttonLeft : this.buttonRight;
    return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
  }

  handleResize(currentBreakPoint) { this.props.getTotalPages(currentBreakPoint.itemsToShow); }

  handleNext(currentItem, nextItem) { this.props.getCurrentPage(nextItem); }

  goto() {
    this.carousel.goTo(Number(0));
  }

  render() {
    return (
      <Carousel itemsToScroll={8} itemsToShow={8} itemPadding={[2, 2, 2, 2, 2]}
        pagination={false} transitionMs={900} renderArrow={this.myArrow}
        breakPoints={this.breakPoints} onResize={this.handleResize} onNextStart={this.handleNext}
        onPrevStart={this.handleNext} ref={(ref) => { this.carousel = ref; }} >
        {this.props.products.map((item) => <GalleryItem key={item.id} item={item} />)}
      </Carousel>
    );
  }
}

Gallery.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.func,
  onClick: PropTypes.func,
  getTotalPages: PropTypes.func,
  getCurrentPage: PropTypes.func,
};

export default Gallery;
