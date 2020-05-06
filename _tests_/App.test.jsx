/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { enableFetchMocks } from 'jest-fetch-mock';
import App from '../client/src/components/App.jsx';

enableFetchMocks();

describe('App Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should render Gallery and GalleryItem Components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Gallery')).toHaveLength(1);
  });
});

describe('API Calls', () => {
  it('fetches data from server when server returns a successful response', (done) => {
    const mockSuccessResponse = {
      id: '1000',
      name: 'Digital Feed Synthesizing Interface',
      product_url: 'http://norene.net',
      image_url: 'http://lorempixel.com/640/480/technics',
      is_prime: true,
      price: '278.00',
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/similar_products');

    process.nextTick(() => {
      expect(wrapper.state()).toBe({
        id: '1000',
        name: 'Digital Feed Synthesizing Interface',
        product_url: 'http://norene.net',
        image_url: 'http://lorempixel.com/640/480/technics',
        is_prime: true,
        price: '278.00',
      });

      global.fetch.mockClear();
      done();
    });
  });
});
