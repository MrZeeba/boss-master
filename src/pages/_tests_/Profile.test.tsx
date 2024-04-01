import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePage from '../ProfilePage';

describe('<View />', () => {
  it('has 3 children', () => {
    const tree = renderer.create(<ProfilePage />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<ProfilePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
