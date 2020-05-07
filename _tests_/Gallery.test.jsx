/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../client/src/components/Gallery.jsx';
import GalleryItem from '../client/src/components/GalleryItem.jsx';


describe('Gallery Unit Tests', () => {
  const sampleProducts = [
    {
      id: '1000',
      name: 'Digital Feed Synthesizing Interface',
      product_url: 'http://norene.net',
      image_url: 'http://lorempixel.com/640/480/technics',
      is_prime: true,
      price: '278.00',
    },
    {
      id: '1001',
      name: 'Digital Matrix Generating Bus',
      product_url: 'http://marcelina.com',
      image_url: 'http://lorempixel.com/640/480/technics',
      is_prime: true,
      price: '540.00',
    },
    {
      id: '1002',
      name: 'Wireless Pixel Copying Array',
      product_url: 'http://alexandre.com',
      image_url: 'http://lorempixel.com/640/480/technics',
      is_prime: true,
      price: '973.00',
    },
  ];

  test('should render 3 GalleryItem components', () => {
    const wrapper = shallow(
      <Gallery
        products={sampleProducts}
      />,
    );
    expect(wrapper.find(GalleryItem)).toHaveLength(3);
  });

  test('should render the Gallery component on the screen', () => {
    const wrapper = shallow(<Gallery products={sampleProducts}/>);
    expect(wrapper).toExist();
  });
});
