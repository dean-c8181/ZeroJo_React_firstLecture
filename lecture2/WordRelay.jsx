const React = require('react');
const { useState, useRef } = React;

// class Hooks로 변경
const WordRelay = () => {
    const [ word, setWord ] = useState('김밥');
    const [ value, setValue ] = useState('');
    const [result, setResult ] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('정답!!');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡!');
            setValue('');
            inputRef.current.focus();
        }

    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return ( 
        <>
            <div >{word}</div>
            <form onSubmit = {onSubmitForm} >
            <input type = "text" ref = {inputRef} value = {value} onChange = {onChangeInput} 
                // value와 onchange를 같이(세트로) 넣을게 아니면 defaultValue={this.state.value}를 넣어 줘야한다.
            />
            <button> 입력!</button> 
            </form>
            <div> {result}</div> 
        </>
    )
}

module.exports = WordRelay;