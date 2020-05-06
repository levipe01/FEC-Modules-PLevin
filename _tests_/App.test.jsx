/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Header from '../client/src/components/Header.jsx';


describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});

describe('Unit Interaction Tests', () => {
  test('it should correctly update the state when resetCarouse is called', () => {
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({ currentPage: 1 });
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
  });
});
