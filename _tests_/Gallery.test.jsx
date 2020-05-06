/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { enableFetchMocks } from 'jest-fetch-mock';
import Gallery from '../client/src/components/Gallery.jsx';

enableFetchMocks();

describe('Unit Tests', () => {
  const products = [{
    id: '1000',
    name: 'Digital Feed Synthesizing Interface',
    product_url: 'http://norene.net',
    image_url: 'http://lorempixel.com/640/480/technics',
    is_prime: true,
    price: '278.00',
  }];

  test('should render the Gallery component on the screen', () => {
    const wrapper = shallow(<Gallery includedProp={products}/>);
    expect(wrapper).toExist();
  });

  test('should render GalleryItem Components', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.find('GalleryItem')).toHaveLength(1);
  });
});
