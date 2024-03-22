import React from 'react';
import renderer from 'react-test-renderer';

import EditShootSession from '../EditShootSession';

describe('<Text />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<EditShootSession />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<EditShootSession />).toJSON();
  expect(tree).toMatchSnapshot();
});
