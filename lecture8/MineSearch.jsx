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
            // tableData[action.row] = [...state.tableData[action.row]];       // 한줄만 불변성을 지키기 위해 배열을 새로만듬.(클릭한거만열림)

            tableData.forEach((row, i) => {       // 주변 칸을 검사 해야 하기 때문에 모든 칸을 불변성을 지켜주기 위해 새로 배열을 만듬.(빈칸 한번에 열기)
                tableData[i] = [...row];
            });

            const checked = [];     // 빈칸이 양옆으로 있으면 무한 checkAround가 되기 때문에 한번 검사 한 칸은 다시 검사 하지 않는 조건을 걸어줘야함.
            const checkAround = (row, cell) => {        // 나를 기준으로 주변 셀 검사. / 매개변수로 받아서 action 제거
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){       // 상하좌우 칸이 아닌경우 필터링
                    return;
                }
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){      // 열린 이미 셀인 경우 제외처리
                    return;
                }
                if(checked.includes(row + '/' +cell)){     // 이미 검사한 칸이면 종료
                    return;
                }else{
                    checked.push(row + '/' + cell);     // 검사 하지 않은 칸이면 checked에 넣기.
                }

                let around = []     // 주변지뢰 갯수 검사 - 주변칸의 값을 모두 around 에 넣음
                if(tableData[row - 1]){      // 위에 3칸 검사(윗칸있을시)
                    around = around.concat(
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    )
                }
                around = around.concat(      // 내줄 양옆 검사  - 좌우칸은 없으면 undefined가 되어 filter할 때 사라진다.
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                );
                if(tableData[row + 1]){      // 아래 3칸 검사(아랫칸있을시)
                    around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1]
                    );
                }

                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;     // 클릭한 칸 주변의 지뢰갯수
                tableData[action.row][action.cell] = count;     // 내 칸의 숫자

                if(count === 0){        // 내가 빈칸이면 주변 칸들 검사
                    if(row > -1){
                        const near = [];        
                        if (row - 1 > -1){      // near에 주변칸의 좌표 다 넣기(2차배열)
                            near.push([row - 1, cell - 1 ])                            
                            near.push([row - 1, cell ]);
                            near.push([row - 1, cell + 1 ]);
                        }
                        near.push([row, cell - 1 ]);
                        near.push([row, cell + 1 ])
                        if(row  + 1 < tableData.length){
                            near.push([row + 1, cell - 1 ]);                            
                            near.push([row + 1, cell ]);
                            near.push([row + 1, cell + 1 ]);
                        }

                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){      // 이미 연 칸이 아니면
                                checkAround(n[0], n[1]);        // 주변칸 클릭 효과
                            }
                        })
                    }
                }
                tableData[row][cell] = count
            };

            checkAround(action.row, action.cell);

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