const path = require('path');
const RefeshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'minesearch',
    mode: 'development',
    devtool: 'eval',     // hidden-source-map (for production)
    resolve: {
        extensions: ['.jsx', '.js']
    },

    entry: {
        app: ['./client']
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [      // 프리셋은 플러그인 모음집같은것
                    ['@babel/preset-env', {     // env는 구버전 브라우저 지원
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions', 'ie <= 8'],
                        },
                        debug: true,    // 개발옵션
                    }],
                    // 프리셋설정은 해당 프리셋을 배열로 만든 후, 객체 안에 옵션들을 넣어준다
                    '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }]
    },

    plugins: [      // 모듈말고 다른 플러그인 이라고함..
        new RefeshWebpackPlugin()
    ],
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },
     devServer: {    // 개발용 서버 설정 -- for hot reloading
         publicPath: '/dist/',
         hot: true,
     }
}