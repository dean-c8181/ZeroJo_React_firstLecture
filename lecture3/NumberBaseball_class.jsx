import React, { PureComponent, createRef } from 'react';       // createRef : class 에서도 FC처럼 ref사용하기
import Try from './Try_class.jsx';

function getNumbers() {     // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for (let i =0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];     // splice(index, 갯수, [추가요소들...]) 해당인댁스부터 갯수만큼 배열에서 빼내서 추가요소들을 넣어주고 빼낸 요소들을 배열형태로 반환한다. 따라서 마지막에 [0]을 넣어서 배열의 값만 리턴시킨다. 그리고 - i로 빼낸 만큼의 인덱스 범위를 줄인다.
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends PureComponent{
    state = {
            result: '',
            value: '',
            answer: getNumbers(),       // this를 안쓰는경우 밖으로 뺄수 있고 다른데서도 쓸수있다.
            tries: [],
        };

    onSubmitForm = (e) => {
        const { value, tries, result, answer } = this.state;
        e.preventDefault();
        if(value.length == 4){       // 입력한 숫자가 4자리인가? - MaxLength 기능 추가로 사실상 필요없는 조건
            if(value === answer.join('')){        // input으로 들어오는 값은 모두 문자열, join을 거친건 모두 문자열 / join안에 있는 값으로 데이터들을 구분함 ''은 아무런 구분없이 리턴
                this.setState((prevState) => {      // setState를 여러번 사용할때 과거의 state값을 쓰는경우 prevState를 이용하는게 좋다.
                    // 다른동작 추가 가능
                    return {
                        result: '홈런~!',
                        tries: [...prevState.tries, { try: value, result: '홈런~!'}],    // react는 push를 사용하면 바뀐것을 인지를 못하기 때문에 배열에 push를 사용하지않고 새로운 배열을 만들어서 예전 배열을 풀어 넣어준 후 바뀌는 것을 처리한다.
                    }
                });
                // 맞춰서 초기화
                alert(`정답! ${answer.join('')} 게임을 다시 시작합니다!`);
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries: [],
                });
                this.onInput.current.focus();
            }else{
                const answerArray = value.split('').map((v) => parseInt(v));     // split(s)의 s를 빈문자열로 지정하면 문자열을 글자단위로 분리. ex.(s,p,l,i,t) 여기선 answer의 배열 값들이 number이기 때문에 input으로 들어온 문자열을 배열화 하고 그 배열의 인자들을 parseInt로 number 속성으로 바꿔주는 작업.
                let strike = 0;
                let ball = 0;
    
                // 실패시 초기화 - 10번이상 틀렸을 때
                if(tries.length >= 9){
                    this.setState({
                        result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
                    });
                    alert(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다. 게임을 다시 시작합니다!`);
                    this.setState({
                        value:'',
                        answer: getNumbers(),
                        tries: [],
                    });
                    this.onInput.current.focus();       // createRef 사용시 FC처럼 current 추가해준다.
                }else{      // 10번 이하로 틀렸을경우
                    for(let i = 0; i < 4; i+= 1){
                        if(answerArray[i] === answer[i]) {
                            strike += 1;
                        }else if(answer.includes(answerArray[i])){
                            ball += 1;
                        }
                    }
                    this.setState({
                        tries: [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    });
                }
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        if(e.target.value.length > e.target.maxLength){     // MaxLength 기능 추가.
            this.setState({
                value: e.target.value.slice(0, e.target.maxLength),
            });
        }else{
            this.setState({
                value: e.target.value,
            });
        }
        
    };

    onInput = createRef();      // createRef 사용.

    // onInputRef = (c) => {        // createRef 사용시 필요없음 but ref에 다른동작을 넣을때는 더 유용함.
    //     this.onInput = c;
    // }

    // function maxLengthCheck(object){                 //      input type number는 maxLength가 안먹어서 스크립트로 maxLength 값만큼 잘라주는 함수.
    //     if (object.value.length > object.maxLength){
    //         object.value = object.value.slice(0, object.maxLength);
    //     }    
    // }
    
    
    // 출처: https://cofs.tistory.com/215 [CofS]

    render(){       // render안에서 setState 사용시 랜더가 무한반복됨 (setState가 랜더를 발생시킴)
        const { value, tries, result } = this.state;
        return(
            <>
                <h1>{result}</h1> {/* 이게 주석 */}
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onInput} type="number" onChange={this.onChangeInput} value={value} maxLength={4} />
                    {/* ref선언 바뀜 */}
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((y, index) => {
                        return(
                            <Try key={`${index + 1}차 시도`} tryInfo={y} i={index}/>
                        );
                    })}
                </ul>
            </>
        );
    }

}

export default NumberBaseball;      // import NumberBaseball