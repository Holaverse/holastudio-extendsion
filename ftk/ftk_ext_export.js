(function() {

var typeMapTable = {
	"ui-label":"label",
	"ui-edit":"entry",
	"ui-wait-box":"wait_box",
	"ui-radiobox":"radio_button",
	"ui-checkbox":"check_button",
	"ui-group":"group_box",
	"ui-progressbar":"progress_bar",
	"ui-button":"button"
};

function mapType(type) {
	return typeMapTable[type];
}

var constMap = {
	"left":"FTK_ALIGN_LEFT",
	"center":"FTK_ALIGN_CENTER",
	"right":"FTK_ALIGN_RIGHT",
	"top":"FTK_BASELINE_TOP",
	"middle":"FTK_BASELINE_MIDDLE",
	"bottom":"FTK_BASELINE_BOTTOM"
};

function generateWidget(widget) {
	var type = mapType(widget.type);

	if(!type) {
		console.log("- skip not supported " + widget.type);
		return "";
	}

	var x = Math.round(widget.x);
	var y = Math.round(widget.y);
	var w = Math.round(widget.w);
	var h = Math.round(widget.h);
	var xParam = widget.xParam;
	var yParam = widget.yParam;
	var wParam = widget.widthParam;
	var hParam = widget.heightParam;

	var xAttr = widget.xAttr;
	var yAttr = widget.yAttr;
	var wAttr = widget.widthAttr;
	var hAttr = widget.heightAttr;

	var value = widget.text;
	var xattrs = 'x="'+x + '" xattr="'+xAttr+'" xparam="'+xParam+'" ';
	var yattrs = 'y="'+y + '" yattr="'+yAttr+'" yparam="'+yParam+'" ';
	var wattrs = 'w="'+w + '" wattr="'+wAttr+'" wparam="'+wParam+'" ';
	var hattrs = 'h="'+h + '" hattr="'+hAttr+'" hparam="'+hParam+'" ';
	var others = "";
	if(widget.type === "ui-label") {
		others = ' alignment="' + constMap[widget.hTextAlign] 
			+ '" baseline="' + constMap[widget.vTextAlign] + '" ';
	}

	var tag  = type+' id="'+widget.name + '" ' + xattrs + yattrs + wattrs + hattrs + 'value="'+value+'"' + others;
	if(widget.children.length) {
		str = '\t<'+tag+'>\n';
		for(var i = 0; i < widget.children.length; i++) {
			var iter = widget.children[i];
			str += generateWidget(iter);		
		}

		str += "</"+type+">\n";
	}
	else {
		str = '\t<'+tag+'/>\n';
	}

	return str;
}

function generateWin(win) {
	var name = win.name.replace(/-/, "_");
	
	var str = '<?xml version="1.0" encoding="utf-8"?>\n';
	str += '<window  value="'+win.name+'" visible="1">\n';
	
	for(var i = 0; i < win.children.length; i++) {
		var iter = win.children[i];
		str += generateWidget(iter);		
	}
	str += '</window>\n';

	saveAs(new Blob([str], {type: "text/plain;charset=" + document.characterSet}), name + ".xml");

	return;
}

function onExportFTK() {
	var wm = TangideApp.doc.getWindowManager();

	for(var i = 0; i < wm.children.length; i++) {
		var win = wm.children[i];
		generateWin(win.toJson());
	}

	return;
}

var onFileCustomOld = TMainMenu.prototype.onFileCustom;
TMainMenu.prototype.onFileCustom = function(menu) {
	menu.createItem("Export FTK XML", onExportFTK);

	onFileCustomOld(menu);
}

})(this);

