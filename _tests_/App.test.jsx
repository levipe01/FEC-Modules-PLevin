/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';


describe('App Unit Tests', () => {
  jest.mock('axios', () => {
    const products = [
      {
        id: '1000',
        name: 'Digital Feed Synthesizing Interface',
        product_url: 'http://norene.net',
        image_url: 'http://lorempixel.com/640/480/technics',
        is_prime: true,
        price: '278.00',
      },
    ];

    return {
      get: jest.fn(() => Promise.resolve(products)),
    };
  });

  test('should render the App Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should render Gallery Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Gallery')).toHaveLength(1);
  });

  test('should invoke getAllProducts on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();
    wrapper.instance().getAllProducts = mock;
    wrapper.instance().forceUpdate();
    wrapper
      .instance()
      .componentDidMount();
    expect(mock).toHaveBeenCalled();
  });
});
