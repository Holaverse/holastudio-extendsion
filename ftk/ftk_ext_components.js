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

