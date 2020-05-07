/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../client/src/components/Footer.jsx';


describe('Footer Unit Tests', () => {
  test('should render the Footer Component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toExist();
  });
});
