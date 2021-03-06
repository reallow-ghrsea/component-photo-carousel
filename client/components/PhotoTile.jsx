/* eslint-disable react/prop-types */
import React from 'react';
import { Tile } from '../styles';

const PhotoTile = ({
  openModal,
  id,
  link,
  height,
  width,
}) => (
  <Tile
    onClick={() => openModal(id)}
    style={{
      backgroundImage: `url('${link}')`,
      height,
      width,
    }}
  />
);

export default PhotoTile;
