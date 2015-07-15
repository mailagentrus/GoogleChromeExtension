// Insert default data into data base, when extension first started
function InsertDefaultData(a) {
    function c() {
        var icon = DefaultData[e][2];
        var data = {
            SearchSystemName: DefaultData[e][0],
            SearchSystemURL: DefaultData[e][1],
            SearchSystemIconURL: icon
        };
        DB.transaction(function(b) {
            b.executeSql("INSERT INTO SearchSystemItems (SearchSystemName, SearchSystemURL, SearchSystemIconURL) VALUES (?, ?, ?);", [data.SearchSystemName, data.SearchSystemURL, data.SearchSystemIconURL], function(b) {
                DefaultDataLength - 1 > e ? (e++, c()) : (console.log("insert default data complete"), b.executeSql("SELECT id FROM SearchSystemItems", [], function(b, c) {
                    var rows = c.rows;
                    for (var DefaultDataLength = rows.length, e = [], f = 0; f < DefaultDataLength; f++) e.push(rows.item(f).id);
                    localStorage.customizeSortId = JSON.stringify(e), a()
                }))
            })
        }, error)
    }
    var DefaultDataLength = DefaultData.length,
        e = 0;
    c()
}

// Define default data, which contains Google and Yandex search systems
var DefaultData = [
    ["Google", "http://www.google.com/search?q={%s}", "../style/favicons/google.png"],
    ["Yandex", "https://yandex.ru/search/?text={%s}", "../style/favicons/yandex.png"]
];