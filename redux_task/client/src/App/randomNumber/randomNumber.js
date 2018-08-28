import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions';

class RandomNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 1
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Inside componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("Inside componentWillReceiveProps");
        console.log("this.props", nextProps);
        this.setState({
            counter: nextProps.ctr
        });
        
    }
    componentWillUpdate(prevProps, nextProps) {
        console.log("Inside componentWillUpdate");

        // console.log("prevProps", prevProps);
        // console.log("nextProps", nextProps);

        console.log("this.props", this.props)
    }

    handleSubmit(event) {
        event.preventDefault();

        let newState =  this.props.getRandomNumber();
        console.log("newState", newState);

        console.log("this.props.ctr", this.props.ctr);

        this.setState({
            counter: this.props.ctr
        })

    }

    render() {
        return (
            <div>
                {/* <form onSubmit={this.handleSubmit} > */}
                    <input type="text" value={this.state.counter} />
                    {/* {console.log("ctr", this.props.ctr)} */}
                    <button type="button" onClick={this.props.getRandomNumber} >Enter</button>
                {/* </form> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRandomNumber: () => dispatch(actionCreators.randomNumber())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomNumber);