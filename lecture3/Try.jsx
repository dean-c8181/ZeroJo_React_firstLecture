// Hooks로 변환

import React, { memo, useState } from 'react';         // memo(memoization?) : PureComponent과 비슷한 기능을 해줌.

const Try = memo(({ tryInfo }) => {     // 컴포넌트를 memo()로 감싸주기

    // 원칙적으로 자식은 부모에게 받은 props를 바꾸면 안된다(부모가 같이 바뀌어 버릴 수 있기 때문에) 따라서 꼭 바꿔야 하는 상황이면 props를 자식의 state로 선언후 state를 수정한다.
    const [ result, setResult ] = useState(tryInfo.result);

    const onClick = () => {
        console.log('111')
        setResult('1');
    }
    
    return(
        <>
            <li>
                <div>{tryInfo.try}</div>
                <div onClick={onClick}>{result}</div>
            </li>
        </>
    );
});
// class Try extends Component{

//     render() {
//         return(
//             <>
//                 <li>
//                     <div>{this.props.tryInfo.try}</div>
//                     <div>{this.props.tryInfo.result}</div>
//                 </li>
//             </>
//         )
//     }
// }

export default Try;