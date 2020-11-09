import React, { Component } from 'react';

function getNumbers() {     // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component{
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
    }

    onChangeInput = () => {

    }

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="number" onChange={this.onChangeInput} value={this.state.value} maxLength={4} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    <li></li>
                </ul>
            </>
        );
    }

}

export default NumberBaseball;      // import NumberBaseball