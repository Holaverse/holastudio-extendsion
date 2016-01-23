(function() {
var gWindowInfo = {
	"type": "ui-window",
	"name": "win",
	"uid": 16617,
	"z": 2,
	"w": 480,
	"h": 800,
	"pivotX": 0.5,
	"pivotY": 0.5,
	"rotation": 0,
	"opacity": 1,
	"hMargin": 0,
	"vMargin": 0,
	"scaleX": 1,
	"scaleY": 1,
	"runtimeVisible": true,
	"enable": true,
	"visible": true,
	"text": "",
	"x": 0,
	"y": 0,
	"style": {
		"lineWidth": 2,
		"lineColor": "#C8C8C8",
		"fillColor": "#2F3234",
		"textColor": "Blue",
		"fontSize": 15,
		"fontFamily": "sans"
	},
	"animHint": "none",
	"xAttr": 0,
	"yAttr": 0,
	"widthAttr": 2,
	"heightAttr": 2,
	"xParam": 1,
	"yParam": 1,
	"widthParam": 1,
	"heightParam": 1,
	"images": {
		"display": 3
	},
	"events": {
		"onClick": null,
		"onSystemInit": null,
		"onLoad": null,
		"onOpen": null,
		"onBeforeOpen": null,
		"onClose": null,
		"onSwitchToBack": null,
		"onSwitchToFront": null,
		"onGesture": null,
		"onKeyDown": null,
		"onKeyUp": null,
		"onSwipeLeft": null,
		"onSwipeRight": null,
		"onSwipeUp": null,
		"onSwipeDown": null,
		"onPointerDown": null,
		"onPointerMove": null,
		"onPointerUp": null,
		"onDoubleClick": null,
		"onMultiTouch": null,
		"onUnload": null
	},
	"settings": {},
	"propertySheetDesc": {},
	"children": []
};

TangideApp.defaultWindowInfo = gWindowInfo;

TangideApp.registerComponents = function() {
	TangideApp.registerBasicComponent("ui-scene", gSceneInfo);
	TangideApp.registerBasicComponent("ui-dialog", gDialogInfo);

	TangideApp.registerBasicComponent("ui-wait-box", gWaitBoxInfo);
	TangideApp.registerBasicComponent("ui-label", gLabelInfo);
	TangideApp.registerBasicComponent("ui-edit", gEditInfo);
	TangideApp.registerBasicComponent("ui-button", gButtonInfo);
	TangideApp.registerBasicComponent("ui-checkbox", gCheckBoxInfo);
	TangideApp.registerBasicComponent("ui-radiobox", gRadioButtonInfo);

	TangideApp.registerBasicComponent("ui-image", gImageInfo);
	TangideApp.registerBasicComponent("ui-mledit", gMLEditInfo);
	TangideApp.registerBasicComponent("ui-progressbar", gProgressBarInfo);

	return;
}

})(this);

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

(function() {

function onSaveToLocal() {
	var doc = TangideApp.doc;
	var meta = doc.getMeta();
	var data = doc.saveString();
	var name = meta.general.appname || "app";

	saveAs(new Blob([data], {type: "text/plain;charset=" + document.characterSet}), name + ".jso");
}

function onPickLocal(files) {
	if(!files || files.length !== 1) return;
	var doc = TangideApp.doc;

	var file = files[0];
	var fr = new FileReader();
	fr.onload = function(e) {
		var str =  e.target.result;
		doc.loadString(str);
	}

	fr.readAsText(file);
}

function onOpenToLocal() {
	TangideApp.showLocalFilePicker(false, onPickLocal);
}

var onFileCustomOld = TMainMenu.prototype.onFileCustom;
TMainMenu.prototype.onFileCustom = function(menu) {
	menu.createItem("Save Local", onSaveToLocal);
	menu.createItem("Open Local", onOpenToLocal);

	onFileCustomOld(menu);
}

})(this);

TangideApp.defaultDoc = {
	"version": 2,
	"magic": "cantk",
	"meta": {
		"general": {
			"appid": "com.tangide.demo",
			"appversion": "1.0.0",
			"appname": "Demo",
			"appdesc": "Demo",
			"gapversion": "1.0",
			"screenscale": "fix-width",
			"orientation": "portrait",
			"developer": "Unkown <unkown@tangide.com>",
			"appIcon": "/drawapp8/images/appicons/96.png",
			"screenShot1": "",
			"screenShot2": "",
			"screenShot3": ""
		},
		"extlibs": [],
		"docChangedTime": 1453503238166,
		"docSavedTime": 1453503265953
	},
	"wm": {
		"type": "ui-window-manager",
		"name": "window-manager",
		"uid": 16616,
		"z": 0,
		"w": 480,
		"h": 800,
		"pivotX": 0.5,
		"pivotY": 0.5,
		"rotation": 0,
		"opacity": 1,
		"hMargin": 0,
		"vMargin": 0,
		"scaleX": 1,
		"scaleY": 1,
		"runtimeVisible": true,
		"enable": true,
		"visible": true,
		"text": "",
		"x": 0,
		"y": 0,
		"style": {
			"lineWidth": 2,
			"lineColor": "Green",
			"fillColor": "#2F3234",
			"textColor": "Black",
			"fontSize": 24,
			"fontFamily": "serif"
		},
		"soundEffectsEnalbe": true,
		"soundMusicAutoPlay": true,
		"current": 0,
		"xAttr": 0,
		"yAttr": 0,
		"widthAttr": 2,
		"heightAttr": 0,
		"xParam": 1,
		"yParam": 1,
		"widthParam": 1,
		"heightParam": 1,
		"images": {
			"display": 2,
			"force-landscape-tips": "cantk-game/assets/images/force_landscape.png",
			"force-portrait-tips": "cantk-game/assets/images/force_portrait.png"
		},
		"events": {
			"onClick": null,
			"onChanged": null
		},
		"settings": {},
		"children": [
			{
				"type": "ui-window",
				"name": "win",
				"uid": 16617,
				"z": 2,
				"w": 480,
				"h": 800,
				"pivotX": 0.5,
				"pivotY": 0.5,
				"rotation": 0,
				"opacity": 1,
				"hMargin": 0,
				"vMargin": 0,
				"scaleX": 1,
				"scaleY": 1,
				"runtimeVisible": true,
				"enable": true,
				"visible": true,
				"text": "",
				"x": 0,
				"y": 0,
				"style": {
					"lineWidth": 2,
					"lineColor": "#C8C8C8",
					"fillColor": "#2F3234",
					"textColor": "Blue",
					"fontSize": 15,
					"fontFamily": "sans"
				},
				"animHint": "none",
				"xAttr": 0,
				"yAttr": 0,
				"widthAttr": 2,
				"heightAttr": 2,
				"xParam": 1,
				"yParam": 1,
				"widthParam": 1,
				"heightParam": 1,
				"images": {
					"display": 3
				},
				"events": {
					"onClick": null,
					"onSystemInit": null,
					"onLoad": null,
					"onOpen": null,
					"onBeforeOpen": null,
					"onClose": null,
					"onSwitchToBack": null,
					"onSwitchToFront": null,
					"onGesture": null,
					"onKeyDown": null,
					"onKeyUp": null,
					"onSwipeLeft": null,
					"onSwipeRight": null,
					"onSwipeUp": null,
					"onSwipeDown": null,
					"onPointerDown": null,
					"onPointerMove": null,
					"onPointerUp": null,
					"onDoubleClick": null,
					"onMultiTouch": null,
					"onUnload": null
				},
				"settings": {},
				"propertySheetDesc": {},
				"children": []
			}
		]
	},
	"deviceConfig": {
		"name": "general",
		"platform": "android",
		"lcdDensity": "hdpi"
	},
	"docid": 1453502963457
};

var gMyZHStrings = {
	"Export FTK XML":"导出FTK XML",
	"Save Local":"保存到本地",
	"Open Local":"打开本地文件"
};

var gMyEnStrings = {
	"Export FTK XML":"Export FTK XML",
	"Save Local":"Save Local",
	"Open Local":"Open Local"
};

if(Locales.getLang().indexOf("zh") === 0) {
	Locales.addTextTable(gMyZHStrings);
}
else {
	Locales.addTextTable(gMyEnStrings);
}

