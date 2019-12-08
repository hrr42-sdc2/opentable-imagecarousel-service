import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Gallery from './client/components/Gallery.jsx';
import Container from './client/components/Container.jsx';
import { photos } from './client/photos.js';
import Button from './client/components/Button.jsx';


configure({ adapter: new Adapter()});

describe('expect Gallery component to be rendered correctly', () => {
  it('expect Gallery component to be rendered', () => {
    const wrapper = shallow(<Gallery images={photos}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-container')).toHaveLength(1);
  });

  it('expect 9 images to be rendered', () => {
    const wrapper = shallow(<Gallery images={photos}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('img')).toHaveLength(9);
  });

  it('expect images to be rendered correctly', () => {
    const wrapper = shallow(<Gallery images={photos}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('img').first().props().photoTitle).toEqual('happy');
  });
});

describe('expect Container component to be rendered correctly', () => {

  it('expect lightbox backdrop to show up', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-backdrop')).toHaveLength(1);
  });

  it('expect \'close\'buttons to be rendered', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-btn-close')).toHaveLength(1);
  });

  it('expect \'left\'buttons to be rendered', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-btn-left')).toHaveLength(1);
  });

  it('expect \'right\'buttons to be rendered', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-btn-right')).toHaveLength(1);
  });

  it('expect the selected image to be rendered', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-image')).toHaveLength(1);
  });

  it('expect the title and date to be rendered', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1}/>, { disableLifecycleMethods: true });
    expect(wrapper.find('.lightbox-title').text()).toEqual('happy Jan 1, 2012');
  });



});


describe('expect close, right, left buttons to work properly', () => {

  it('expect \'close\'buttons to work properly', () => {
    let mockfn = jest.fn();
    const wrapper = shallow(<Container images={photos} selectedImage={1} toggleLightbox={mockfn}/>, { disableLifecycleMethods: true });
    wrapper.find(Button).first().simulate('click');
    expect(mockfn.mock.calls.length).toBe(1);
  });

  it('expect \'left\'buttons to work properly', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1} />, { disableLifecycleMethods: true });
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.state().direction).toEqual('left');
  });

  it('expect \'right\'buttons to work properly', () => {
    const wrapper = shallow(<Container images={photos} selectedImage={1} />, { disableLifecycleMethods: true });
    const expectedImageIdx = wrapper.state().selectedImageIndex + 1;
    wrapper.find(Button).at(2).simulate('click');
    expect(wrapper.state().selectedImageIndex).toEqual(expectedImageIdx);
  });
});