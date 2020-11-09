const React = require('react');
const {Component} = React;

class WordRelay extends Component { // React.Component 를 const { Component } = React; 선언으로 Component로 줄일 수 있다.
    state = {
        word: '김밥',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '정답!!',
                word: this.state.value,
                value: ''
            });
            this.input.focus();
        } else {
            this.setState({
                result: '땡!',
                value: ''
            });
            this.input.focus();
        }

    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        }) // 정확하게하려면 target 대신 currentTarget
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };

    render() {
        return ( 
            <>
                <div >{this.state.word}</div>
                <form onSubmit = {this.onSubmitForm} >
                <input type = "text" ref = {this.onRefInput} value = {this.state.value} onChange = {this.onChangeInput} 
                    // value와 onchange를 같이(세트로) 넣을게 아니면 defaultValue={this.state.value}를 넣어 줘야한다.
                />
                <button> 입력!</button> 
                </form>
                <div> {this.state.result}</div> 
            </>
        )
    }

}


module.exports = WordRelay;