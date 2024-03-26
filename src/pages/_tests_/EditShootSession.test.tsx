import React from 'react';
import renderer from 'react-test-renderer';

import EditShootSession from '../EditShootSession';

describe('<View />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<EditShootSession />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<EditShootSession />).toJSON();
  expect(tree).toMatchSnapshot();
});
