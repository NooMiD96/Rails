import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackConfig from "../webpack.config";
import BodyParser from "body-parser";

const app = express();
const port = 3000;
const jsonParser = BodyParser.json();

const strings = [];

app.post('/api/SaveString', jsonParser, (req, res) => {
    console.log(req.url);
    if(!req.body.data) {
        res.send({error: 'empty data'});
    }
    strings.push(req.body.data);
    res.send(200);
});

app.get('/api/GetString', (req, res) => {
    console.log(req.url);
    res.send(JSON.stringify(strings));
});

let config, compiler;
if (process.argv.includes('production')) {
    config = WebpackConfig(true);
    compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
    }));
    // app.use('/', express.static(`./server/dist`));
    // init(app);
    // ErrorRequestHandler(app);
} else {
    config = WebpackConfig();
    compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        publicPath: '/',
        serverSideRender: true,
    }));
    app.use(webpackHotMiddleware(compiler, {
        path: "/__webpack_hmr",
    }));

    // The following middleware would not be invoked until the latest build is finished.
    app.use((req, res) => {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        // then use `assetsByChunkName` for server-sider rendering
        // For example, if you have only one main chunk:
        res.send(`<html>
<head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <meta className="base" href="/"/>
</head>
<body>
    <div id="react-app"></div>
    <script src="${assetsByChunkName['main-client']}"></script>
</body>
</html>`);
    });
}

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
