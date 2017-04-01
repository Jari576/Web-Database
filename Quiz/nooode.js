
var ejs = require('ejs');
var template = '<%=: colors | get:2 %>';
var data = { 'colors': ['red', 'blue', 'white', 'yellow', 'pink']};
console.log(ejs.render(template, data));