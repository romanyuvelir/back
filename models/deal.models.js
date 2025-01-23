const Deal = function(deal) {
    this.text = deal.text
};

Deal.create = (newDeal, result) => {
    sql.query ("INSERT INTO db SET ?", newDeal, (error, res) => {
        if (err) {
            console.log("error: ", error);
            result (err, null);
            return;
        }

        console.log("Done", {id: res.insertId, ...newDeal});
        result (null, {id: res.insertId, ...newDeal});
    });
};

Deal.findByld = (dealld, result) => {
    sql.query (`SELECT * FROM db WHERE id = ${dealld}`, (err, res) => {
        if (err){
            console.log("error: ", error);
            result (err, null);
            return;
        }

        if (res.length){
            console.log("id found: ", res[0]);
            result(null,res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Deal.getAll = result => {
    sql.query("SELECT * FROM db", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deals: ", res);
        result(null, res);
    })
}
Deal.updateByld = (id, deal, result) => {
    sql.query(
        "UPDATE db SET text =? WHERE id =?",
        [deal.text, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(nill, err);
                return;
            }
            
            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }

            console.log("id updated ", {id: id, ...deal});
            result(null, {id: id, ...deal});
        }
    );
};

Deal.remove = (id, result) => {
    sql.query("DELETE FROM db WHERE id =?", id, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("User deleted from ", id);
        result(null,  res);
    });
};

Deal.removeALL = result => {
    sql.query("DELETE * FROM db", (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null.err)
            return;
        }
        
        console.log('deleted ${res.affectedRows}deals');
        result(null, res);
    });
};