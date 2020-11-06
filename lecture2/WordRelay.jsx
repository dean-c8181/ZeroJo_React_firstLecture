const React = require('react');
const { Component } = React;

class WordRelay extends Component{      // React.Component 를 const { Component } = React; 선언으로 Component로 줄일 수 있다.
    state = {
        text: '웹팩과 바벨'
    };

    render() {
    return(<h1>{this.state.text}</h1>)
    }

}


module.exports = WordRelay;