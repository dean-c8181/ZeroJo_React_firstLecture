import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import NumberBaseball from '../lecture3/NumberBaseball_class';
import RSP from '../lecture4/ResponseCheck';
import Lotto from '../lecture6/Lotto_class';

class GameMatcher extends Component{
    render(){
        //console.log(this.props);      -- history : 기존브라우저의 액션과 다르기때문에(눈속임)정의되어있음 / location : 로케이션정보 / match : params 정보
         //console.log(this.props.location.search); 에 쿼리스트링이 들어있음.
        
         let queryParams = new URLSearchParams(this.props.location.search.slice(1));
         // 쿼리스트링의 key값을 쓰게 될때 URLSearchParams를 써야한다(리액트에서 지원안함 훅스는 추후 업뎃가능); - 게시판 같은데서 많이씀(몇번페이지인지 전달)
         concole.log(queryParams.get('hi'));

        if(this.props.match.params.name === 'number-baseball'){
            return  <NumberBaseball />
        }else if(this.props.match.params.name === 'rock-scissors-paper'){
            return <RSP />
        }else if(this.props.match.params.name === 'lotto-generator'){
            return <Lotto />
        }

        return(
            <>               
                <div>일치하는 게임이 없습니다.</div>
            </>
        );
    }
}

// props가 안나오면(undefined) withRouter로 받아와야한다.
//export default withRouter(GameMatcher);

export default GameMatcher;