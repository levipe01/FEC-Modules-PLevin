import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      currentPage: 1,
      totalPages: 0,
      products: [],
      feedbackVisible: false,
      modalVisible: false,
      itemsPerPage: 0,
      modalItem: {},
      feedback: {},
    };

    this.child = React.createRef();
    this.resetCarousel = this.resetCarousel.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getTotalPages = this.getTotalPages.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateModalItem = this.updateModalItem.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  resetCarousel() {
    this.child.current.goto();
    this.setState({
      currentPage: 1,
      currentIndex: 0,
    });
  }

  getCurrentPage(currentItem) {
    const newCurrentPage = Math.ceil(currentItem.index / this.state.itemsPerPage) + 1;
    this.setState({
      currentIndex: currentItem.index,
      currentPage: newCurrentPage,
    });
  }

  getTotalPages(itemsPerPage) {
    const newTotalPages = Math.ceil(this.state.products.length / itemsPerPage);
    this.setState({
      totalPages: newTotalPages,
      itemsPerPage,
      currentPage: Math.ceil(this.state.currentIndex / itemsPerPage) + 1,
    });
  }

  toggleFeedback() {
    const newState = !this.state.feedbackVisible;
    this.setState({
      feedbackVisible: newState,
    });
  }

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

  getAllProducts() {
    axios.get('http://localhost:3000/api/similar_products')
      .then((response) => {
        this.setState({
          products: response.data.rows,
        });
      })
      .catch((err) => err);
  }

  sendFeedback() {
    axios.post('http://localhost:3000/api/similar_products/feedback', this.state.feedback)
      .then((res) => res)
      .catch((err) => err);
  }

  handleFeedback(newFeedback) {
    this.setState({
      feedback: newFeedback,
    }, () => { this.sendFeedback(); });
  }

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    return (
      <div>
        <Header currentPage={this.state.currentPage}
        resetCarousel={this.resetCarousel} totalPages={this.state.totalPages}/>
        <Gallery products={this.state.products} getTotalPages={this.getTotalPages}
        getCurrentPage={this.getCurrentPage} ref={this.child}
        feedbackVisible={this.state.feedbackVisible} modalVisible={this.state.modalVisible}
        toggleModal={this.toggleModal} updateModalItem={this.updateModalItem}
        modalItem={this.state.modalItem} handleFeedback={this.handleFeedback}
        toggleFeedback={this.toggleFeedback}/>
        <Footer toggleFeedback={this.toggleFeedback} feedbackVisible={this.state.feedbackVisible}/>
      </div>

    );
  }
}

export default App;
