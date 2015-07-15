var Popup = {};

// Build switch search type bar, based on specified params:
// SearchSystemURL, SearchSystemName and SearchSystemIconURL (from DataBase)
Popup.BuildSwitchBar = function(a) {
    var b = a.length;
    for (i = 0; i < b; i++) {
        var c = '<li data-url="' + a[i].SearchSystemURL + '" title="' + a[i].SearchSystemName + '"><img src="' + a[i].SearchSystemIconURL + '"/></li>';
        $("#SwitchSearchSystemBar ul").append(c)
    }
    $("#SwitchSearchSystemBar ul li:first").addClass("hover");
    Popup.BindUI()
}; 

Popup.BindUI = function() {
	// Switch search system when text edit not empty
    $("#SwitchSearchSystemBar ul li").click(function(a) {
        $(this).siblings().removeClass("hover").end().addClass("hover");
        if ($("#SearchTextEdit").val().length > 1)
        	Popup.OpenPage();
	}); 
	
	// Press Enter
	$("#SearchTextEdit").keydown(function(a) {
        13 === a.keyCode && Popup.OpenPage()
    });
    
    // Click search button
    $("#SearchButton").click(function() {
        Popup.OpenPage()
    });
}; 

Popup.OpenPage = function() {
    var a = $(".hover").attr("data-url"),
        b = $(".hover").attr("title"),
        c = encodeURIComponent($("#SearchTextEdit").val()),
        
        // Insert search text into search query
        d = a.replace("{%s}", c);
    window.open(d)
};

$(function() {
    var a = chrome.extension.getBackgroundPage();
    a.util.GetCurrentSearchSystem(function(a) {
        Popup.BuildSwitchBar(a)
    })
});