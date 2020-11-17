import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';
// useReducer는 state 관리를 도와준다(state를 통합, 줄여줌) + 많은 state관리 용이.

const initialState = {      // 초기 State 선언(불변)
    winner : '',
    turn : '0',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
}

const SET_WINNER = 'SET_WINNER'; // action.type은 변수(상수)로 빼놓는게 좋다. 액션의 이름은 대문자가 보통의 규칙

// dispatch의 액션을 해석해서 state를 직접 바꿔주는 역활이 reducer 함수
const reducer = (state, action) => {        // reducer안에서 state를 어떻게 바꿀지 정의.
    // 기존 state를 바꾸는게 아니라 이전 state와 Action을 합쳐 새로운 state를 만든다.
    switch (action.type) {
        case SET_WINNER:
            return{
                ...state,   // 얕은 복사. - 기존의 state 가저오기.
                winner: action.winner, 
            }
    }

}

const Tictactoe = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState); //    lazyInitialize 지연초기화 거의 안쓴다함. - 초기값 고정.

    // const [ winner, setWinner ] = useState();
    // const [ turn, setTurn] = useState('0');
    // const [ tableData, setTableData ] = useState([['', '', ''], ['', '', ''], ['', '', '']])

    const onClickTable = useCallback(() => {
        console.log('onClickTable')
        // dispatch 안에는 액션 객체가 들어간다. dispatch는 액션을 실행
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData}></Table>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );
}

export default Tictactoe;