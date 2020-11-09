const React = require('react');
const { useState, useRef} = React;


    // React Hooks 사용하기 with Functional Component 함수형 컴포넌트
    // 장점 : 간결하고 짧다. 
    // 단점 : state가 변경되면 해당 컴포넌트가 모두 다시 랜더된다. 따라서 최적화(?) 필요함.

    const GuGuDan = () => {
        // state 선언 - (이게 React Hooks이고 꼭 해당 Functional Component안에 있어야 한다.)
        const [ first, setFirst ] = useState(Math.ceil(Math.random() * 9 ));
        const [ second, setSecond ] = useState(Math.ceil(Math.random() * 9 ));
        const [ value, setValue ] = useState('');
        const [ result, setResult ] = useState('');
        // ref 사용방법
        const inputRef = useRef(null);

        const onChangeInput = (e) => {
            setValue(e.target.value)
        }

        const onSubmitForm = (e) => {
            e.preventDefault();
            
            if(parseInt(value) === first * second){
                setResult(`정답! ${value}`);        // preValue를 쓰고 싶으면 이렇게 쓴다 /// setValue((prevValue) => { setResult(`정답 ${prevValue}`) }) ;
                //setCounter((c) => c + 1 );
                setFirst(Math.ceil(Math.random() * 9));
                setSecond(Math.ceil(Math.random() * 9));
                setValue('');

                inputRef.current.focus();
            } else {
                setResult('땡');
                setValue('');

                inputRef.current.focus();
            }
        }
        
        console.log('랜더링'); // 인풋에 값 입력할때마다 렌더링됨.
        return(
            <>
                <div>{first}곱하기 {second}는?</div>
                <form onSubmit={onSubmitForm}>
                    <input ref={inputRef} type="number" onChange={onChangeInput} value={value} />
                    <button className="notClass" htmlFor="notjustfor">입력!</button>
                </form>
                <div id="result">{result}</div>
            </>
        )
    }

    module.exports = GuGuDan;