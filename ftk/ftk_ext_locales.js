var gMyZHStrings = {
	"Export FTK XML":"Export FTK XML",
	"Save Local":"保存到本地",
	"Open Local":"打开本地文件"
};

var gMyEnStrings = {
	"Export FTK XML":"导出FTK XML",
	"Save Local":"Save Local",
	"Open Local":"Open Local"
};

if(Locales.getLang().indexOf("zh") === 0) {
	Locales.addTextTable(gMyZHStrings);
}
else {
	Locales.addTextTable(gMyEnStrings);
}

