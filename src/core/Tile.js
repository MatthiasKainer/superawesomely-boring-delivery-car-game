import React from 'react';

import './Tile.css';

const Tile = ({tileset}) => 
    <div className={`tile ${tileset}`}></div>;

export default Tile;

export const tileAtPosition = (map, position) => {
    if (!map || !map.fields) return null;

    const row = map.fields[position[1]];
    if (!row) return null;
    const column = row[position[0]]
    if (!column) return null;

    return column;
}