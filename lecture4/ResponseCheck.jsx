import React, { PureComponent } from 'react';

class ResponseCheck extends PureComponent{
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    }

    timeout;        // 빨리 눌렀을경우 setTimeout 초기화 시켜주기
    startTime;      // state로 줄경우 랜더링이 다시 일어 나기 때문에 this.startTime 으로 뺌.\
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        const randomTimer = Math.floor(Math.random()  * 1000) + Math.floor(Math.random() * 4000)    // ~5초 랜덤

        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭!'
                });
                this.startTime = new Date();     // 초록색이 된 순간부터 반응속도 체크
            }, parseInt(randomTimer));
            //console.log(parseInt(randomTimer));
        }else if(state === 'ready'){        // 성급하게 클릭
            clearTimeout(this.timeout);     // 셋타임 아웃 초기화 시키기 - clearTimeout 은 내장함수.
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요. 초록색이 된 후에 클릭하세요.',
            });
        }else if(state ==='now'){       // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }
    };

    renderAverage = () => {
        const { result }  = this.state
        return(
        result.length === 0 ? null : 
            <>
                <div>평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>
                {result.map((rst, i) => <div key={i + 'chasi'}>{`${i+1}차시 : ${rst}ms`}</div>)}
            </>
            
            // reduce 메서드 : 배열의 하나하나를 이전값(초기값)과 현재 배열요소를 받아 처리함. reduce와 reduceRight는 배열을 기반으로 값 하나를 도출할 때 사용됩니다.
            /*
                let value = arr.reduce(function(accumulator, item, index, array) {  // ...}, [initial]);

                accumulator - 이전 함수 호출의 결과. initial은 함수 최초 호출 시 사용되는 초깃값을 나타냄(옵션)
                item – 현재 배열 요소
                index – 요소의 위치
                array – 배열

                결론적으로 reduce((a, c) => a + c)는 a ~ ...c 까지 모두 더한값.
            */
        )
    }

    render(){
        const { state, message, } = this.state;
        return(
            <>
                {/* 랜더의 return 안에서(JSX)는 for와 if문을 쓸 수 없다(쓸수있지만 복잡해짐) - map안에서는 가능 */}
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {/* 함수로뺌 */}
                {this.renderAverage()}


                {/* 조건부 연산자(삼항연산자) - react에서의 조건문사용
                {this.state.result.length === 0 ? null : <div>평균시간 {this.state.result.reduce((a, c) => a + c / this.state.result.length)}ms</div>*/}

                {/* and 연산자 보통은 삼항을 더 많이 씀
                {this.state.result.length !== 0 && <div>평균시간 {this.state.result.reduce((a, c) => a + c / this.state.result.length)}ms</div>*/}
                
            </>
        )
    }
}


export default ResponseCheck;