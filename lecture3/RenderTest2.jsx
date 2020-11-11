import React, { PureComponent } from 'react';       // PureComponent 사용. -- 복잡한 구조는 작동 안할 수 있음.

class Test extends PureComponent{
    state ={
        counter: [0],
        array : []
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext){       // shouldComponentUpdate는 꼭 불리언 값을 리턴해야한다. true면 랜더링, false면 비랜더링
    //     if(this.state.counter !== nextState.counter){
    //         return true;
    //     }
        
    //     return false;
    // }

    // shouldComponentUpdate는 PureComponent 보다 더 자유롭게 커스텀이 가능하다.

    onClick = () => {        // setState 값을 바꾸지 않고 호출만하더라도 render가 일어난다. 
        this.setState({
            counter : [...this.state.counter, 1],
        });     // 기본적으로 배열을 변수에 담아 내용을 추가하는게 아니라 기존 배열이나 객체를 풀어준 후 추가 작업을 진행해야한다.
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