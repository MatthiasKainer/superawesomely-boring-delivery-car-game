import React from 'react';

import './Tile.css';

const Tile = ({tileset}) => 
    <div className={`tile ${tileset}`} ></div>

export default Tile;