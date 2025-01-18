import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    entry: "./src/index.tsx",
    devServer: {
        port: 3000,
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
        alias: {
            '@root': path.join(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.template.html'})]
}
