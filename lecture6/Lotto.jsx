import React, { Component, } from 'react';
import Ball from './Ball';

function getWinNumbers (){      // 반복 실행 되면 안됨.
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    // 모든 요소는 문자열로 변환된 이후 재 정렬된다. 따라서 sort를 오름차순으로 사용할때는 위와 같이 안에 함수를 넣어줘야 한다. (음수면 선, 양수면 뒤)

    return [... winNumbers, bonusNumber];
}

class Lotto extends Component{
    state = {
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
    }

    timeouts = [];

    componentDidMount() {
        const { winNumbers } = this.state
        for(let i = 0; i < winNumbers.length - 1; i++){
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return{
                        winBalls : [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000)
    }

    componentWillUnmount() {        
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }       // 비동기 처리는 항상 제거해주는 이벤트가 있어야함.

    

    render(){
        const { winBalls, bonus, redo } = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
                
            </>
        );
    }
}

export default Lotto;
