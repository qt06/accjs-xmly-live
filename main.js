const fs = require('fs');
const shell = require('shelljs');
const current_dir = __dirname;
const localappdata = process.env.localappdata;
const source_dir = process.env.localappdata + "\\Programs\\ximalaya-live";
const resource_dir = localappdata + '/programs/ximalaya-live/resources';
const index_html = resource_dir + '/app/react/build/index.html';
const VERSION = "3.0.207.0";
const APPNAME = "喜马拉雅直播助手";
const APPDESCRIPTION = "喜马拉雅直播助手（晴天无障碍优化版）";
const COPYRIGHT = "Copyright (C) 2020 上海喜马拉雅科技有限公司";
const PUBLISHER = "上海喜马拉雅科技有限公司";
let installScriptTemplate = `; 喜马拉雅直播助手安装脚本
; NSIS installer script
; Author: 杨永全
; Copyright 2019 杨永全版权所有。
; License: MIT
Unicode true
!include "MUI2.nsh"
!include "x64.nsh"
!include "LogicLib.nsh"
!include "nsDialogs.nsh"
SetCompressor /SOLID LZMA
Name "${APPNAME}"
Caption "${APPNAME} ${VERSION} 安装程序"
BrandingText "晴天优化，联系qq： 115928478"
OutFile "ximalaya_live_acc_${VERSION}.exe"
VIProductVersion "${VERSION}"
;Needs to be here so other version info shows up
VIAddVersionKey "ProductName" "${APPNAME}"
VIAddVersionKey "LegalCopyright" "${COPYRIGHT}"
VIAddVersionKey "FileDescription" "${APPDESCRIPTION}"
VIAddVersionKey "FileVersion" "${VERSION}"
VIAddVersionKey "ProductVersion" "${VERSION}"
InstallDir "$LOCALAPPDATA\\Programs\\ximalaya-live\\"
RequestExecutionLevel user
!define MUI_ABORTWARNING
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_LANGUAGE "SimpChinese"

Section "install files" Sec01
	SetOutPath "$INSTDIR"
	File /r "${source_dir}\\*"
	File "喜马拉雅直播助手（晴天无障碍优化版）使用说明.txt"
  CreateShortCut "$DESKTOP\\${APPNAME}.lnk" "$INSTDIR\\${APPNAME}.exe"
exec "$INSTDIR\\喜马拉雅直播助手（晴天无障碍优化版）使用说明.txt"
SectionEnd
`;
shell.cd(resource_dir);
shell.rm('-rf', 'app');
shell.exec('asar e app.asar app');
shell.cp(current_dir + '/src/js/*.js', resource_dir + '/app/react/build/static/js');
let f = fs.readFileSync(index_html, 'utf8');
let s = '<script type="text/javascript" src="./static/js/jquery.min.js"></script><script type="text/javascript" src="./static/js/acc.js"></script>';
if(!f.includes(s)) {
console.log('add accessible scripts');
f = f.replace('</body></html>', s + '</body></html>');
fs.writeFileSync(index_html, f, 'utf8');
console.log('accessible scripts has added.');
} else {
console.log('do not need add accessible scripts');
}
shell.exec('asar pack app app.asar --unpack-dir "{node_modules/zegoliveroom,assets/audios}"');
shell.rm('-rf', 'app');
shell.cd(current_dir);
fs.writeFileSync('install-script.nsi', "\ufeff" + installScriptTemplate, 'utf8');
shell.exec('nsis\\makensis.exe install-script.nsi');
shell.echo('done');
