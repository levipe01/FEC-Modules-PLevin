import React from 'react';
import Gallery from './Gallery.jsx';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.getAllProducts = this.getAllProducts.bind(this);
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
      <Gallery products={this.state.products}/>
    );
  }
}

export default App;
