import React from 'react';
import Gallery from './Gallery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.fetchProducts = this.fetchProducts.bind(this);
  }

  fetchProducts() {
    fetch('http://localhost:3000/api/similar_products')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          products: data.rows,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <Gallery products={this.state.products}/>
    );
  }
}

export default App;
