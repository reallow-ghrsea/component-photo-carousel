/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React from 'react';
import PhotoTile from './PhotoTile';
import Modal from './Modal';
import {
  CarouselContainer,
  CarouselButton,
  ServiceContainer,
  CarouselLeftDiv,
  CarouselRightDiv,
  ImageContainer,
  BackIcon,
  NextIcon,
} from '../styles';

// eslint-disable-next-line max-len
// url string is to be changed to blank for local host, or to the ec2 address for a deployed version
// original string to previous students FEC ec2 instance was ttp://ec2-13-59-200-193.us-east-2.compute.amazonaws.com
const getListingId = () => {
  let id = window.location.pathname;
  id = id.split('').filter(element => element !== '/');
  id = Number(id.join(''));
  return id;
};

const urlString = '';


class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: false,
      modalId: 0,
      beginScroll: true,
      endScroll: false,
      basicDetails: {},
      thumbnails: [],
      fulls: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalNavigateBack = this.modalNavigateBack.bind(this);
    this.modalNavigateNext = this.modalNavigateNext.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
  }

  componentDidMount() {
    const id = getListingId();
    fetch(`/api/listingGallery/${id}`)
      .then(response => response.json())
      .then((details) => {
        const listingDetails = details[0];
        const listingPhotos = details[1];
        this.setState({
          basicDetails: listingDetails,
          thumbnails: listingPhotos,
          fulls: listingPhotos,
        });
      });
  }

  openModal(id) {
    this.setState({
      modalView: true,
      modalId: id,
    });
  }

  closeModal() {
    this.setState({
      modalView: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  scrollLeft(event) {
    event.preventDefault();
    const carousel = document.querySelector('#carousel');
    const start = carousel.scrollLeft;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, 0 - carousel.clientWidth, 1000);
      carousel.scrollLeft = val;
      if (currentTime < 1000) {
        setTimeout(animateScroll, increment);
      } else {
        this.setState({
          beginScroll: (carousel.scrollLeft) ? false : true,
          endScroll: false,
        });
      }
    };
    animateScroll();
  }

  // eslint-disable-next-line class-methods-use-this
  scrollRight(event) {
    event.preventDefault();
    const carousel = document.querySelector('#carousel');
    const { endScroll } = this.state;

    const start = carousel.scrollLeft;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (distance, callback) => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, distance, 1000);
      carousel.scrollLeft = val;
      if (currentTime < 1000) {
        setTimeout(() => { animateScroll(distance, callback); }, increment);
      } else {
        callback();
      }
    };

    if (endScroll) {
      animateScroll(0 - carousel.scrollWidth, () => {
        this.setState({
          beginScroll: true,
          endScroll: false,
        });
      });
    } else {
      animateScroll(carousel.clientWidth, () => {
        if (carousel.scrollLeft !== 0) {
          this.setState({
            beginScroll: false,
          });
        }

        if ((carousel.scrollLeft + carousel.clientWidth) === carousel.scrollWidth) {
          this.setState({
            endScroll: true,
          });
        }
      });
    }
  }


  modalNavigateNext(id) {
    const { thumbnails } = this.state;
    const modalId = (id + 1) % thumbnails.length;
    this.setState({
      modalId,
    });
  }

  modalNavigateBack(id) {
    const { thumbnails } = this.state;
    const modalId = ((id - 1) + thumbnails.length) % thumbnails.length;
    this.setState({
      modalId,
    });
  }

  render() {
    const {
      thumbnails,
      fulls,
      modalView,
      modalId,
      beginScroll,
      endScroll,
      basicDetails,
    } = this.state;
    return (
      <ServiceContainer>
        <CarouselContainer>
          <CarouselLeftDiv>
            <CarouselButton style={{ display: beginScroll ? 'none' : 'flex' }} onClick={this.scrollLeft}>
              <BackIcon className="material-icons md-36">arrow_back_ios</BackIcon>
            </CarouselButton>
          </CarouselLeftDiv>
          <ImageContainer id="carousel">
            {thumbnails.map((photo, id) => (
              <PhotoTile
                link={photo.url}
                id={id}
                openModal={this.openModal}
                height={id ? '206px' : '414px'}
                width={id ? '278px' : '548px'}
              />
            ))}
          </ImageContainer>
          <CarouselRightDiv>
            <CarouselButton onClick={this.scrollRight}>
              <NextIcon className="material-icons md-36">{endScroll ? 'replay' : 'arrow_forward_ios'}</NextIcon>
            </CarouselButton>
          </CarouselRightDiv>
        </CarouselContainer>
        {modalView && (
        <Modal
          display={modalView}
          link={fulls[modalId]}
          id={modalId}
          imageCount={thumbnails.length}
          closeModal={this.closeModal}
          btnBack={this.modalNavigateBack}
          btnNext={this.modalNavigateNext}
          details={basicDetails}
        />
        )}
      </ServiceContainer>
    );
  }
}

// t = current time
// b = start value
// c = change in value
// d = duration
// eslint-disable-next-line func-names
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t -= 1;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

export default PhotoCarousel;
