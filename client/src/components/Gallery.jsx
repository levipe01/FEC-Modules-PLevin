import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { consts } from 'react-elastic-carousel';
import GalleryItem from './GalleryItem.jsx';
import FeedbackModal from './FeedbackModal.jsx';


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalItem: {},
    };

    this.breakPoints = [
      { width: 1, itemsToShow: 1, itemsToScroll: 1 },
      { width: 200, itemsToShow: 2, itemsToScroll: 2 },
      { width: 475, itemsToShow: 3, itemsToScroll: 3 },
      { width: 650, itemsToShow: 4, itemsToScroll: 4 },
      { width: 825, itemsToShow: 5, itemsToScroll: 5 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 6 },
      { width: 1200, itemsToShow: 7, itemsToScroll: 7 },
      { width: 1400, itemsToShow: 8, itemsToScroll: 8 },
      { width: 1600, itemsToShow: 9, itemsToScroll: 9 },
    ];

    this.handleNext = this.handleNext.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.goto = this.goto.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateModalItem = this.updateModalItem.bind(this);
  }

  handleResize(currentBreakPoint) { this.props.getTotalPages(currentBreakPoint.itemsToShow); }

  handleNext(currentItem, nextItem) { this.props.getCurrentPage(nextItem); }

  goto() { this.carousel.goTo(Number(0)); }

  toggleModal() {
    const newState = !this.state.modalVisible;
    this.setState({
      modalVisible: newState,
    });
  }

  updateModalItem(item) {
    this.setState({
      modalItem: item,
    });
  }

  render() {
    const myArrow = ({ type, onClick }) => {
      const pointer = type === consts.PREV ? 'button-left' : 'button-right';
      return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
    };

    return (
      <div className="gallery-wrapper">
      {
        this.state.modalVisible
          && <FeedbackModal toggleModal={this.toggleModal} modalItem={this.state.modalItem}
          toggleFeedback={this.props.toggleFeedback}/>
      }
        <Carousel itemsToShow={8} ref={(ref) => { this.carousel = ref; }} renderArrow={myArrow}
           breakPoints={this.breakPoints} onResize={this.handleResize} onNextStart={this.handleNext}
           transitionMs={900} itemsToScroll={8} onPrevStart={this.handleNext} pagination={false}>

          {this.props.products.map((item) => <GalleryItem item={item} toggleModal={this.toggleModal}
          feedbackVisible={this.props.feedbackVisible} modalVisible={this.state.modalVisible}
          products={this.props.products} key={item.id} updateModalItem={this.updateModalItem}/>)}

        </Carousel>
      </div>
    );
  }
}

Gallery.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    product_url: PropTypes.string.isRequired,
    is_prime: PropTypes.bool.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.func,
  onClick: PropTypes.func,
  feedbackVisible: PropTypes.bool.isRequired,
  getTotalPages: PropTypes.func.isRequired,
  getCurrentPage: PropTypes.func.isRequired,
  toggleFeedback: PropTypes.func.isRequired,
};

export default Gallery;
