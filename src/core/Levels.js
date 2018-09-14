import React, { Component } from 'react';
import * as LevelLoader from "../data/levels";
import { connect } from 'react-redux';
import { Player } from './Player';
import {Customers} from "./Customer";
import { Obstacles } from './Obstacles';
import Tile from './Tile';
import "./Levels.css"
import { TILE_SIZE } from './spriteUtils';
import { mapLoaded, moveObstacle } from './CoreActions';

export class Levels extends Component {
    currentLevel;

    componentWillMount() {
        const nextLevel = window.location.hash ? window.location.hash.slice(1) : this.props.currentLevel;
        this.currentLevel = LevelLoader[nextLevel];
        if (this.props.mapLoaded) { this.props.mapLoaded(this.currentLevel); }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentLevel === this.props.currentLevel) return;
        this.currentLevel = LevelLoader[nextProps.currentLevel];
        if (this.props.mapLoaded) { this.props.mapLoaded(this.currentLevel); }
    }

    render() {
        const { fields } = this.currentLevel;
        
        const rows = fields.map((row, rowIndex) => {
            return <div key={`row-${rowIndex}`} className="row">{
                row.map((item, colIndex) => <Tile key={`item-${rowIndex}-${colIndex}`} tileset={item} />)
            }</div>;
        });
        
        const gameFieldWidth = this.currentLevel.dimensions[0] * TILE_SIZE;

        return <div className="gameField" style={{width: gameFieldWidth}}>
            {rows}
            <Player player={this.props.player} startPosition={this.currentLevel.player} />
            <Customers positions={this.props.customers} />
            <Obstacles 
                initialObstacles={this.currentLevel.obstacles} 
                obstacles={this.props.obstacles}
                onMoveObstacle={this.props.onMoveObstacle} />
        </div>;
    }
}
const mapStateToProps = state => {
    const {player, customers, obstacles} = state.CoreReducer;
    const {currentLevel} = state.CoreReducer.level;
    return ({
        player,
        customers,
        obstacles,
        currentLevel
    })
};

const mapDispatchToProps = dispatch => ({
    mapLoaded : (map) => dispatch(mapLoaded(map)),
    onMoveObstacle : (name) => dispatch(moveObstacle(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Levels);