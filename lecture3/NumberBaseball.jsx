import React, { Component } from 'react';
import Try from './Try.jsx';

function getNumbers() {     // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component{
    constructor(props){
        super(props);
        this.state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: [],
        };

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    

    fruits = [
        { fruit: '호이', taste: '둘리'},
        { fruit: '호이1', taste: '둘리1'},
        { fruit: '호이2', taste: '둘리2'},
        { fruit: '호이3', taste: '둘리3'},
        { fruit: '호이4', taste: '둘리4'},
    ];

    // 화살표 함수를 안쓰면 this를 바인딩 시켜줘야 state에 접근 할 수 있다. 따라서 constructor와 함수와 this 바인딩 하는 작업이 필요하다.

    onSubmitForm(e){
        e.preventDefault();
    };

    onChangeInput(e){
        console.log(this);
        this.setState({
            value: e.target.value,
        });
    };

    render(){
        return(
            <>
                {/* <h1>{this.state.result}</h1>  이게주석 */}
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