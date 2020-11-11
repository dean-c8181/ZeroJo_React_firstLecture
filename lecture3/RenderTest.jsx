import React, { Component } from 'react';

class Test extends Component{
    state ={
        counter: 0,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext){       // shouldComponentUpdate는 꼭 불리언 값을 리턴해야한다. true면 랜더링, false면 비랜더링
        if(this.state.counter !== nextState.counter){
            return true;
        }
        
        return false;
    }

    onClick = () => {        // setState 값을 바꾸지 않고 호출만하더라도 render가 일어난다. 
        this.setState({});
    }

    render(){
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;