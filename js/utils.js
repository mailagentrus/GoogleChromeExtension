var SearchUrl = [];
var util = {
	// Return current search system
    GetCurrentSearchSystem: function(a) {
        var b = [],
            c = [];
        // Selec all elements from data base
        DBLoadAllItems(function(d, e) {
            var f = e.rows,
                g = f.length;
            for (i = 0; i < g; i++) {
                var h = f.item(i);
                b.push(h);
            }
            var j = JSON.parse(localStorage.customizeSortId);
            for (i = 0; i < j.length; i++)
            for (k in b)
            if (b[k].id == j[i]) {
                c.push(b[k]);
                break
            }
            a(c)
        })
    },

    CreateSearchSystemElements: function() {
        var a;
        chrome.contextMenus.removeAll(function() {
            util.GetCurrentSearchSystem(function(b) {
                for (i = 0; i < b.length; i++) a = chrome.contextMenus.create({
                    title: b[i].SearchSystemName,
                    onclick: util.ChangeSearchSystemClick
                }), SearchUrl[a] = b[i].SearchSystemURL
            })
        })
    },
    					
    ChangeSearchSystemClick: function(a) {
        var b = SearchUrl[a.menuItemId],
            c = encodeURIComponent(a.selectionText),
            d = b.replace("{%s}", c);
        window.open(d);
    }
}