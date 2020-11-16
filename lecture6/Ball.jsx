import React, { memo } from 'react';

// state가 없는경우 굳이 CP보다 FCp로 만드는게 낫다.
const Ball = memo(({ number }) => {

    let background
    
    if (number <= 10){
        background = 'red';
    }else if(number <= 20){
        background = 'orange';
    }else if(number <= 30){
        background = 'yellow';
    }else if(number <= 40){
        background = 'blue';
    }else{
        background = 'green';
    }

    let color = '#FFF'

    // background는 구조분해 할당같은데 변수취급도 같이 되는것같음.
    // 처음에 선언을 꼭 해줘야하며 , 로 여러개 쓸수있음(배열)
    // 변수명은 꼭 style 속성과 같은걸 써야 하는것 같음.(JSX 문법기준)
    
    return (
        <div className="ball" style={{ background, color }}>{number}</div>
    );
});

// class Ball extends PureComponent{
    
//     render(){
//         const { number } = this.props;
//         let background;
//         if (number <= 10){
//             background = 'red';
//         }else if(number <= 20){
//             background = 'orange';
//         }else if(number <= 30){
//             background = 'yellow';
//         }else if(number <= 40){
//             background = 'blue';
//         }else{
//             background = 'green';
//         }
//         return(
//             <div className="ball" style={{ background }}>{number}</div>
//         )
//     }
// }

export default Ball;