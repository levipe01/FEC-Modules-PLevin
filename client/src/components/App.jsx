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
      itemsPerPage: 0,
      products: [],
      feedbackVisible: false,
    };

    this.child = React.createRef();
    this.resetCarousel = this.resetCarousel.bind(this);
    this.getTotalPages = this.getTotalPages.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
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

  getAllProducts() {
    axios.get('http://localhost:3000/api/similar_products')
      .then((response) => {
        this.setState({
          products: response.data.rows,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    return (
      <div>
        <hr></hr>
        <Header currentPage={this.state.currentPage} resetCarousel={this.resetCarousel}
        totalPages={this.state.totalPages}/>

        <Gallery products={this.state.products} getTotalPages={this.getTotalPages} ref={this.child}
        getCurrentPage={this.getCurrentPage} feedbackVisible={this.state.feedbackVisible}
        toggleFeedback={this.toggleFeedback}/>

        <Footer toggleFeedback={this.toggleFeedback} feedbackVisible={this.state.feedbackVisible}/>
      </div>

    );
  }
}

export default App;
