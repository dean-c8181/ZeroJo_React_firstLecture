import React, { useReducer, createContext, useMemo, } from 'react';
import Table from '../lecture8/Table';
import Form from '../lecture8/Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0       // 0 이상이면 다 opened가 된다.
};

// createContext : 부모의 data를 자식의 props로 전달하기 쉽게 만들어주는 Hooks
// createContext의 단점 : 최적화 하기 힘들다
export const TableContext = createContext({        // 초기값 (데이터형태?)
    tableData: [
        [],
        [],
        [],
    ],
    dispatch: () => {},
});


const initialState = {
    tableData: [],
    timer: 0,
    result: '',
}

const PlantMine = (row, cell, mine) => {       // form에서 설정한대로 지뢰를 심는 함수
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    console.log(candidate);

    const shuffle = [];
    while(candidate.length > row * cell - mine){        // 몇번째 칸에 넣을지 shuffle 안에 저장.
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        console.log(candidate.length);
        shuffle.push(chosen);
    }
    console.log(shuffle);

    const data = [];
    for (let i = 0; i < row; i++){      // 2차원 배열 만들기
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);      // row 숫자 0~9까지 (셔플의 숫자를 셀갯수로 나눈 후 10의자리만 리턴.)
        const hor = shuffle[k] % cell;                     // cell 숫자 0~9까지 (셔플의 숫자를 셀갯수로 나눈 후 나머지 리턴)
        data[ver][hor] = CODE.MINE;
    }
    
    console.log(data);
    return data;
}

export const START_GAME  ="START_GAME"

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                tableData: PlantMine(action.row, action.cell, action.mine),
            };
        default:
            return state;
        
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => ({     // conText API를 사용할때는 이와같이 useMemo로 캐싱을 해줘야 성능최적화에 문제가 없다.
        tableData: state.tableData, dispatch
    }), [state.tableData])      // dispatch는 항상 같게 유지된다.
    
    // data들에 접근하고 싶은 Component를 Context.Provider 로 감싸준다. data는 Provider의 value에 넣는다.(데이터를 캐싱하지 않고 전부 넣으면 이 방법은 성능저하의 요인이됨.)
    return(
        <TableContext.Provider value={value}>
            <Form></Form>
            <div>{state.timer}</div>
            <Table></Table>
            <div>{state.result}</div>
        </TableContext.Provider>
    );
}

export default MineSearch;