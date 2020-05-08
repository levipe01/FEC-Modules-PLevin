/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Header from '../client/src/components/Header.jsx';
import Gallery from '../client/src/components/Gallery.jsx';


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

describe('Unit Interaction Tests', () => {
  test('it should correctly update the state when resetCarousel is called', () => {
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({
        currentPage: 1,
        currentIndex: 0,
      });
    };
    const header = shallow(
      <Header
        currentPage={2}
        resetCarousel={mockSubmitHandler}
        totalPages={10}
      />,
    );
    header.find('.start-over').simulate('click');
    expect(wrapper.instance().state.currentPage).toBe(1);
    expect(wrapper.instance().state.currentIndex).toBe(0);
  });

  test('it should correctly update the state when getCurrentPage is called', () => {
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
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({
        currentPage: 2,
        currentIndex: 5,
      });
    };
    const wrapperGallery = mount(
      <Gallery
        products={products}
        getTotalPages={() => {}}
        getCurrentPage={mockSubmitHandler}
      />,
    );
    wrapperGallery.find('.button-right').at(0).simulate('click');
    expect(wrapper.instance().state.currentPage).toBe(2);
    expect(wrapper.instance().state.currentIndex).toBe(5);
  });

  test('it should correctly update the state when getTotalPages is called', () => {
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
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({
        currentPage: 3,
        totalPages: 20,
        itemsPerPage: 5,
      });
    };
    const wrapperGallery = mount(
      <Gallery
        products={products}
        getTotalPages={mockSubmitHandler}
        getCurrentPage={() => {}}
      />,
    );
    wrapperGallery.find('.button-right').at(0).simulate('click');
    expect(wrapper.instance().state.currentPage).toBe(3);
    expect(wrapper.instance().state.totalPages).toBe(20);
    expect(wrapper.instance().state.itemsPerPage).toBe(5);
  });
});
