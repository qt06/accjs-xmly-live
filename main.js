const fs = require('fs');
const shell = require('shelljs');
const current_dir = __dirname;
const localappdata = process.env.localappdata;
const resource_dir = localappdata + '/programs/ximalaya-live/resources';
const index_html = resource_dir + '/app/react/build/index.html';
shell.cd(resource_dir);
shell.rm('-rf', 'app');
shell.exec('asar e app.asar app');
shell.cp(current_dir + '/src/js/*.js', resource_dir + '/app/react/build/static/js');

let f = fs.readFileSync(index_html, 'utf8');
let s = '<script type="text/javascript" src="./static/js/jquery.min.js"></script><script type="text/javascript" src="./static/js/acc.js"></script>';
if(!f.includes(s)) {
f = f.replace('</body></html>', s + '</body></html>');
fs.writeFileSync(index_html, f, 'utf8');
console.log('ok');
} else {
console.log('no found');
}
shell.exec('asar pack app app.asar --unpack-dir "{node_modules/zegoliveroom,assets/audios}"');
shell.rm('-rf', 'app');
