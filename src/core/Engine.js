import React, { Component } from 'react';
import { Loop } from "./Loop";
import { GameState } from './State';
import Menu from './Menu';
import Levels from './Levels';
import { connect } from 'react-redux';
import Loose from './Loose';
import Won from './Won';
import { nextLevel } from './CoreActions';

export class Engine extends Component {
    loop = new Loop();

    constructor(props) {
        super(props);
        this.loop = new Loop();
        this.loop.setup();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameState === GameState.WIN && this.props.level && this.props.level.map.next) {
            this.props.nextLevel(this.props.level.map.next);
        }
    }

    componentWillUnmount() {
        this.loop.stop();
    }

    render() {
        switch (this.props.gameState) {
            case GameState.MENU:
                return <Menu />;
            case GameState.PLAY:
                return <Levels />;
            case GameState.WIN:
                return <Won />;
            case GameState.LOOSE:
                return <Loose />;
            default:
        }
        return "";
    }
}

const mapStateToProps = state => ({
    ...state.CoreReducer
});

const mapDispatchToProps = dispatch => ({
    nextLevel: (level) => dispatch(nextLevel(level))
});

export default connect(mapStateToProps, mapDispatchToProps)(Engine);