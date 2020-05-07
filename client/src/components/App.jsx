import React from 'react';
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 2,
      totalPages: 73,
      products: [],
    };

    this.resetCarousel = this.resetCarousel.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  resetCarousel() {
    this.setState({
      currentPage: 1,
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
        <Header currentPage={this.state.currentPage}
        resetCarousel={this.resetCarousel} totalPages={this.state.totalPages}/>
        <Gallery products={this.state.products}/>
      </div>

    );
  }
}

export default App;
