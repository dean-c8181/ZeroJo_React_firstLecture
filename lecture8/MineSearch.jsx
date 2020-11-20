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