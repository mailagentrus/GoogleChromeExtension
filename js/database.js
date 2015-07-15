function error(a) {
    console.log("database error", a);
}

function DBLoadAllItems(a) {
    DB.readTransaction(function(b) {
        b.executeSql("SELECT * FROM SearchSystemItems", [], function(b, c) {
            a(b, c);
        })
    }, error);
}

function DBLoadItemById(a, b) {
    DB.readTransaction(function(c) {
        c.executeSql("SELECT * FROM SearchSystemItems WHERE id=?;", [a], function(a, c) {
            b(a, c);
        })
    }, error);
}

function DBLoadItemBySearchURL(a, b) {
    DB.readTransaction(function(c) {
        c.executeSql("SELECT * FROM SearchSystemItems WHERE SearchSystemURL=?;", [a], function(a, c) {
            b(a, c);
        })
    }, error);
}

function DBDeleteItemId(a, b) {
    DB.transaction(function(c) {
        c.executeSql("DELETE FROM SearchSystemItems WHERE id = " + a, [], function(a, c) {
            b(a, c);
        })
    })
}

var DB = openDatabase("Macte", "", "Macte SearchSystemItems", 5242880, function(a) {
    a.transaction(function(a) {
        a.executeSql("CREATE TABLE SearchSystemItems (id INTEGER PRIMARY KEY, SearchSystemName TEXT NOT NULL, SearchSystemURL TEXT NOT NULL, SearchSystemIconURL TEXT NOT NULL);", [], function() {
            InsertDefaultData(function() {
                console.log("insert over"); 
                util.CreateSearchSystemElements();                
            })
        })
    }, error);
});