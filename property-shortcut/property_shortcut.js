function PropertyShortcut() {
}

PropertyShortcut.createItem = function(parent, icon, text, callback, index) {
	var size = parent.getHeight();
	var x = index * size + 128;
	var item = WIconButton.create(parent, x, 0, size, size);
	    item.setClickedHandler(callback).setTips(dappGetText(text));
        item.setIconImages(icon);
        item.useTheme('main-tool-bar-item');

	return item;
}

PropertyShortcut.onDocumentLoaded = function() {
	var win = TangideApp.getInstance().getMainWin();
	var propertySheets = win.getRightPanel().getPropertySheets();
	var eventsView = win.getRightPanel().getEventsView();
	var containor = eventsView.getTitle();

	function onShowGeneral() {
		propertySheets.scrollToGeneral();
	}
	
	function onShowImages() {
		propertySheets.scrollToImages();
	}

	function onShowSpecific() {
		propertySheets.scrollToSpecific();
	}
	
	function onShowLayout() {
		propertySheets.scrollToLayout();
	}

	var icon = WImage.create("http://phplab.duapp.com/images/images.png#x2y287w30h27");
	PropertyShortcut.createItem(containor, icon, "General", onShowGeneral, 0);
	icon = WImage.create("http://phplab.duapp.com/images/images.png#x138y2w17h15");
	PropertyShortcut.createItem(containor, icon, "Images", onShowImages, 1);
	icon = WImage.create("http://phplab.duapp.com/images/images.png#x97y258w30h27");
	PropertyShortcut.createItem(containor, icon, "Specific", onShowSpecific, 2);
	icon = WImage.create("http://phplab.duapp.com/images/images.png#x193y258w30h27");
	PropertyShortcut.createItem(containor, icon, "Layout", onShowLayout, 3);

	return;
}

TangideApp.addEventListener(TangideApp.EVT_DOCUMENT_LOADED, PropertyShortcut.onDocumentLoaded);

