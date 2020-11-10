import React, { Component } from 'react';
import Try from './Try.jsx';

function getNumbers() {     // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component{
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    fruits = [
        { fruit: '호이', taste: '둘리'},
        { fruit: '호이1', taste: '둘리1'},
        { fruit: '호이2', taste: '둘리2'},
        { fruit: '호이3', taste: '둘리3'},
        { fruit: '호이4', taste: '둘리4'},
    ];

    onSubmitForm = (e) => {
        e.preventDefault();
    };

    onChangeInput = () => {

    };

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="number" onChange={this.onChangeInput} value={this.state.value} maxLength={4} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((y, index) => {
                        return(
                            <Try key={y.fruit + y.taste} y={y} i={index}/>
                        );
                    })}
                </ul>
            </>
        );
    }

}

export default NumberBaseball;      // import NumberBaseball