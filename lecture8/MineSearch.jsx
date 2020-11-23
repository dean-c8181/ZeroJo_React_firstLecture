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
    halted: true,
});


const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
}

const PlantMine = (row, cell, mine) => {       // form에서 설정한대로 지뢰를 심는 함수
    //console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    //console.log(candidate);

    const shuffle = [];
    while(candidate.length > row * cell - mine){        // 몇번째 칸에 넣을지 shuffle 안에 저장.
        console.log(candidate.length);
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        //console.log(candidate.length);
        shuffle.push(chosen);
    }
    console.log(shuffle);

    const data = [];
    for (let i = 0; i < row; i++){      // 2차원 배열 만들기
        const rowData = [];
        data.push(rowData);
        //console.log(data);
        for(let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
            //console.log(data);
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
export const OPEN_CELL  ="OPEN_CELL"
export const CLICKED_MINE = "CLICK_MINE"
export const FLAG_CELL = "FLAG_CELL"
export const QUESTION_CELL = "QUESTION_CELL"
export const NORMALIZE_CELL = "NORMALIZE_CELL"

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME: {
            return{
                ...state,
                tableData: PlantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            let around = []     // 주변지뢰 검사
            if(tableData[action.row - 1]){      // 위에 3칸 검사(윗칸있을시)
                around = around.concat(
                    tableData[action.row - 1][action.cell - 1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1]
                )
            }
            around = around.concat(      // 내줄 양옆 검사
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1],
            );
            if(tableData[action.row - 1]){      // 아래 3칸 검사(윗칸있을시)
                around = around.concat(
                    tableData[action.row + 1][action.cell - 1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1]
                );
            }

            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            console.log(around, count)
            tableData[action.row][action.cell] = count;

            return{
                ...state,
                tableData,
            };
        }
        case CLICKED_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }            
            return{
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            } 
            return{
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            } 
            return{
                ...state,
                tableData,
            };
        }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
            };
        }
        default:
            return state;
        
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => ({     // conText API를 사용할때는 이와같이 useMemo로 캐싱을 해줘야 성능최적화에 문제가 없다.
        tableData: tableData, dispatch, halted: halted
    }), [tableData, halted])      // dispatch는 항상 같게 유지된다.
    
    // data들에 접근하고 싶은 Component를 Context.Provider 로 감싸준다. data는 Provider의 value에 넣는다.(데이터를 캐싱하지 않고 전부 넣으면 이 방법은 성능저하의 요인이됨.)
    return(
        <TableContext.Provider value={value}>
            <Form></Form>
            <div>{timer}</div>
            <Table></Table>
            <div>{result}</div>
        </TableContext.Provider>
    );
}

export default MineSearch;