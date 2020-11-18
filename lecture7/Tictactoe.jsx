import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';
// useReducer는 state 관리를 도와준다(state를 통합, 줄여줌(setState, useState를 dispatch로 한번에 처리)) + 많은 state관리 용이.

const initialState = {      // 초기 State 선언(불변)
    winner : '',
    turn : 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: ['-1', '-1'],
}

export const SET_WINNER = 'SET_WINNER'; // action.type은 변수(상수)로 빼놓는게 좋다. 액션의 이름은 대문자가 보통의 규칙 - export로 모듈화
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_DRAW = 'SET_DRAW';

// dispatch의 액션을 해석해서 state를 직접 바꿔주는 역활이 reducer 함수
const reducer = (state, action) => {        // reducer안에서 state를 어떻게 바꿀지 정의.
    // 기존 state를 바꾸는게 아니라 이전 state와 Action을 합쳐 새로운 state를 만든다.
    switch (action.type) {
        case SET_WINNER:
            return{
                ...state,   // 얕은 복사. - 기존의 state 가저오기.
                winner: action.winner + '님의 승리!!!', 
            };
        case CLICK_CELL: {  // React는 불변성 보존이 원칙임. immer라는 라이브러리로 가독성 해결 가능.
            const tableData = [...state.tableData];     // 기존의 tableDada 불러오기
            tableData[action.row] = [...tableData[action.row]];     // tableData의 선택된 행 가져오기(기존값이 있으면 기존값 그대로) - 불변셩을 지키기위해서 해로 배열을 만들어서 넣어준다. 불변성을 지키지 않으면(새로 배열을 넣는게 아니라 tableData[action.row] 이렇게만 사용하면 리액트가 변화를 알지 못하고 reRedering이 되지 않는다.)
            tableData[action.row][action.cell] = state.turn;    // 위에서 선택된 행에서 열 가져와서 turn의 값을 넣어준다.
            //console.log({...state, tableData}); -- 바뀐값이 나옴
            //console.log(initialState);    -- 기존 스테이트는 그대로나옴
            return{
                ...state,
                tableData,      // 기존스테이트에서 tableDate 를 업데이트해서 값 반환
                recentCell: [action.row, action.cell]   // recentCell이 변경되면서 useEffect가 실행되는데 비동기라 td.jsx에 있던 CHANGE_TURN이 바로넘어가게되서 useEffect에서 기대한 현재턴이 아닌 다음턴으로 이미 바뀌어버림.
            };
        }
        case CHANGE_TURN: {
            return{
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {        // 승리 or 무승부시 다시시작
            return{
                ...state,
                turn : 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: ['-1', '-1'],
            }
        }case SET_DRAW: {
            return{
                ...state,
                winner: '무승부!', 
            }
        }
        default:
            return state;
    }
    
}

/// state변경이 한꺼번에 일어 나서 적용 되는것같음.

const Tictactoe = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState); //    lazyInitialize 지연초기화 거의 안쓴다함. - 초기값 고정.
    const { tableData, turn, winner, recentCell } = state

    // const [ winner, setWinner ] = useState();
    // const [ turn, setTurn] = useState('0');
    // const [ tableData, setTableData ] = useState([['', '', ''], ['', '', ''], ['', '', '']])

    // const onClickTable = useCallback(() => {
    //     console.log('onClickTable');
    //     // dispatch 안에는 액션 객체가 들어간다. dispatch는 액션을 실행
    //     dispatch({ type: SET_WINNER, winner: 'O' });
    // }, []);

    useEffect(() => {
        const [ row, cell ] = recentCell;
        if(row < 0){        // 초기 랜더링시 winner 없게 조건 설정
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        console.log(win, row, cell, turn);
        if(win) {   // 승리
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        }else{
            let all = true;
            tableData.forEach((row) => {      // 무승부검사 - 칸이 다 차있는지 확인.
                row.forEach((cell) => {
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){    // 무승부시(빈칸없음)
                dispatch({ type: SET_DRAW });
                dispatch({ type: RESET_GAME });                
            }else{
                dispatch({ type:CHANGE_TURN });     // 승리요건이 아니면 다음턴 넘어감. (빈칸있을때)
            }
        }
    }, [recentCell]);

    return(
        <>
            <Table tableData={tableData} dispatch={dispatch}></Table>
            {state.winner && <div>{winner}</div>}
        </>
    );
}

export default Tictactoe;