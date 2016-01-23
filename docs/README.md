扩展Hold Studio来设计FTK的界面
------------------------------------------

## 第一步：注册FTK的组件。

一是FTK支持的组件并不支持Hold Studio全部内置的组件，二是FTK的组件的风格是不同的，所以我们需要自定义一套组件。
```
var gRadioButtonInfo = {
	"type": "ui-radiobox",
	"name": "radiobox-1",
	"uid": 13105,
	"z": 4,
	"w": 68,
	"h": 70,
	"pivotX": 0.5,
	"pivotY": 0.5,
	"rotation": 0,
	"opacity": 1,
	"hMargin": 0,
	"vMargin": 0,
	"scaleX": 1,
	"scaleY": 1,
	"roundRadius": 3,
	"runtimeVisible": true,
	"enable": true,
	"visible": true,
	"text": "",
	"locked": false,
	"x": 206,
	"y": 365,
	"style": {
		"lineWidth": 2,
		"lineColor": "Red",
		"fillColor": "White",
		"textColor": "Black",
		"fontSize": 16,
		"fontFamily": "serif",
		"textColorOn": "Black",
		"fillColorOn": "White"
	},
	"value": true,
	"xAttr": 2,
	"yAttr": 2,
	"widthAttr": 0,
	"heightAttr": 0,
	"xParam": 0.42916666666666664,
	"yParam": 0.45625,
	"widthParam": 1,
	"heightParam": 1,
	"images": {
		"display": 4,
		"checked_fg": "storage/read.php?path=github/2/2134625/ftk/theme/theme/default/btn_radio_on.png",
		"unchecked_fg": "storage/read.php?path=github/2/2134625/ftk/theme/theme/default/btn_radio_off.png"
	},
	"events": {
		"onClick": null,
		"onChanged": "console.log(\"onChanged was triggered\")",
		"onUpdateTransform": null
	},
	"children": []
};
...
TangideApp.registerComponents = function() {
	TangideApp.registerBasicComponent("ui-label", gLabelInfo);
	...
}

```
gLabelInfo是通过Hola Studio生成的数据，重载TangideApp.registerComponents可以去掉内置的组件并注册自己的组件。

## 第二步：修改缺省的窗口。

修改TangideApp.defaultWindowInfo的数据即可，在新建场景是以此为模版。

```
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
```

## 第三步：修改缺省的文档。

修改TangideApp.defaultDoc即可：在Hola Studio创建一个项目，根据自己的需要定制，然后保存并下载，把.jso改为.gz,加压并打开，把它的内容赋给TangideApp.defaultDoc。

## 第四步：增加导出成XML的功能。

把Hola Studio生成的数据转换成XML。
```
function onExportFTK() {
	var wm = TangideApp.doc.getWindowManager();

	for(var i = 0; i < wm.children.length; i++) {
		var win = wm.children[i];
		generateWin(win.toJson());
	}

	return;
}

var onToolsCustomOld = TMainMenu.prototype.onToolsCustom;
TMainMenu.prototype.onToolsCustom = function(menu) {
	menu.createItem("Export FTK", onExportFTK);

	onToolsCustomOld(menu);
}
```

## 第五步：增加本地存储功能。
```
function onSaveToLocal() {
	var doc = TangideApp.doc;
	var meta = doc.getMeta();
	var data = doc.saveString();
	var name = meta.general.appname || "app";

	saveAs(new Blob([data], {type: "text/plain;charset=" + document.characterSet}), name + ".jso");
}

function onOpenToLocal() {
	var doc = TangideApp.doc;

}

var onFileCustomOld = TMainMenu.prototype.onFileCustom;
TMainMenu.prototype.onFileCustom = function(menu) {
	menu.createItem("Save Local", onSaveToLocal);
	menu.createItem("Open Local", onOpenToLocal);

	onFileCustomOld(menu);
}
```

