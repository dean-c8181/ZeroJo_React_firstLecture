import React, { Component, } from 'react';

// 컴포넌트 분리하고 싶었는데 안되서 포기 ㅠ

class Average extends Component{
    state = {
        resultd: this.props.result,
    }


    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     if(nextProps.result !==  this.state.resultd){
    //         console.log('1111');
    //         return true;
    //     }
    //     console.log('2222');
    //     return false;
    // }

    onReset = () => {
        this.setState({
            resultd: [],
        })
    }

    render(){
        const { resultd }  = this.state
        return(
            resultd.length === 0 ? null : 
            <>
                <div>평균시간 {resultd.reduce((a, c) => a + c) / resultd.length}ms</div>
                <button onClick={this.onReset}>초기화</button>
                {resultd.map((rst, i) => <div key={i + 'chasi'}>{`${i+1}차시 : ${rst}ms`}</div>)}
            </>
        );
    }
}


export default Average;