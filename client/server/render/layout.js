/**
 * content 上下文 data后期需要挂在的数据
 */
//<link href="/static/css/home.css" rel="stylesheet">
exports.layout = function (content, initState) {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/home.css" rel="stylesheet">
    <link href="/static/css/home.css" rel="stylesheet">
    <title>React App</title>

    
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"> ${content}</div>
    <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>
    <script type="text/javascript" src="/static/js/home.js"></script>
</body>

</html>
`;
};
exports.layoutActicle = function (content, initState) {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/home.css" rel="stylesheet">
    <link href="/static/css/home.css" rel="stylesheet">
    <title>React App</title>

    
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"> ${content}</div>
    <script>window.__INITIAL_GRAPHQL_STATE__ = ${JSON.stringify(
      initState
    )}</script>
    <script type="text/javascript" src="/static/js/acticle.js"></script>
</body>

</html>
`;
};
