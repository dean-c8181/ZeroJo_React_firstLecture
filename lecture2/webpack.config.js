const path = require('path');

module.exports = {
    name: 'wordrelay-setting', // 웹펙 설정의 이름 - 임의설정
    mode: 'development',    // 실서비스 : production
    devtool: 'eval',     // 빠르게..
    resolve: {
        extensions: ['.js', '.jsx']     // entery에 들어가는 파일 확장자명을 미리 등록하면 entry에서 확장자를 안쓰고 파일명만 써도 됨
    },

    entry: {
        app: ['./client']       // './WordRelay.jsx'는 client.jsx에서 불러오기 때문에 webpack이 자동으로 불러옴
    },      // 입력

    module: {
        rules: [{
            test: /\.jsx?/,     // js와 jsx 파일에 룰을 적용하겠다.
            loader: 'babel-loader',     // 바벨 로더 사용
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties',]
            }      // 바벨의 옵션들
        }]
    },

    output: {
        path: path.join(__dirname, 'dist'),     // __dirname : 현재폴더 -- 의미는 현재폴더 안에 있는 dist 선택(원래는 D:|dean|.. 해서 가야함)
        filename: 'app.js'
    },      // 출력
};


// webpack 실행하기 (터미널) : terminal에서 webpack을 쓰려면 명령어 등록을 해야하는데 크레 3개자 방법이 있다.
// 1. package.json 파일의 scripts 안에 "dev": "webpack" 을 추가하고 터미널에 npm run dev 입력
// 2. npx webpack 입력