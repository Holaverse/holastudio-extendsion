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

