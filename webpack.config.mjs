import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import {fileURLToPath} from 'url'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
                use: ["babel-loader", '@wyw-in-js/webpack-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'styles-[contenthash].css'}),
        new HtmlWebpackPlugin({template: './src/index.template.html'})
    ]
}
