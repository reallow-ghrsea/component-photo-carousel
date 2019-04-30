/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  ModalContainer,
  Content,
  ModalCounter,
  ModalBar,
  ModalTabLink,
  ModalGalleryActions,
  ModalFooter,
  PropertyDetails,
  GalleryActionItem,
  ItemDiv,
  GalleryButton,
  ModalLeftButton,
  ModalRightButton,
  BackIcon,
  NextIcon,
} from '../styles';

const formatCommas = (num) => {
  const str = `${num}`;
  let numberString = '';
  for (let i = 0; i < str.length; i += 1) {
    if (i > 0 && i % 3 === 0) {
      numberString = `,${numberString}`;
    }
    numberString = str[str.length - 1 - i] + numberString;
  }

  return numberString;
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  closeModal(event) {
    // eslint-disable-next-line react/prop-types
    const { closeModal } = this.props;
    if (event.target.className.includes('can-close') || event.target.innerText === 'close') {
      closeModal();
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      display,
      btnBack,
      btnNext,
      id,
      imageCount,
      link,
      details,
    } = this.props;
    return (
      <ModalContainer className="can-close" onClick={this.closeModal}>
        <ModalBar>
          <ModalTabLink>
            <div>Photos</div>
          </ModalTabLink>
          <ModalGalleryActions>
            <GalleryActionItem>
              <ItemDiv>
                <GalleryButton>Contact agent</GalleryButton>
              </ItemDiv>
            </GalleryActionItem>
            <GalleryActionItem>
              <ItemDiv>
                <i className="material-icons icon-light md-18">favorite_border</i>
                <span>Save Home</span>
              </ItemDiv>
            </GalleryActionItem>
            <GalleryActionItem>
              <ItemDiv>
                <i className="material-icons icon-light md-18">email</i>
                <span>Share</span>
              </ItemDiv>
            </GalleryActionItem>
            <GalleryActionItem>
              <ItemDiv onClick={this.closeModal}>
                <i className="material-icons icon-light md-30">close</i>
              </ItemDiv>
            </GalleryActionItem>
          </ModalGalleryActions>
        </ModalBar>
        <ModalLeftButton className="back" onClick={() => btnBack(id)}><BackIcon className="material-icons md-36">arrow_back_ios</BackIcon></ModalLeftButton>
        <Content>
          <ModalCounter>
            {id + 1}
            {' of '}
            {imageCount}
          </ModalCounter>
          <img src={link.url} alt="fullsize version" />
        </Content>
        <ModalRightButton className="forward" onClick={() => btnNext(id)}><NextIcon className="material-icons md-36">arrow_forward_ios</NextIcon></ModalRightButton>
        <ModalFooter>
          <PropertyDetails>
            {'For Sale: $'}
            {formatCommas(details.price)}
            {' ('}
            {details.bed_count}
            {' beds, '}
            {details.bath_count}
            {' baths, '}
            {formatCommas(details.sq_ft)}
            {' sqft)'}
          </PropertyDetails>
        </ModalFooter>
      </ModalContainer>
    );
  }
}

export default Modal;
