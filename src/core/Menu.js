import {Component} from 'react';
import { connect } from 'react-redux';
import { startPlaying } from './CoreActions';

export class Menu extends Component {
    render() {
        // for now we don't have a menu..;
        this.props.startPlaying();
        return "";
    }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
    startPlaying: () => dispatch(startPlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);