const Deal = function(deal) {
    this.text = deal.text
};

Deal.create = (newDeal, res) => {
    sql2.query ("INSERT INTO db SET ?", newDeal, (err, res) => {
        if (err) {
            console.log("err: ", err);
            res (err, null);
            return;
        }

        console.log("Done", {id: res.insertId, ...newDeal});
        res (null, {id: res.insertId, ...newDeal});
    });
};

Deal.findById = (dealId, res) => {
    sql2.query("SELECT * FROM db WHERE id = ?", [dealId], (err, res) => {
        if (err){
            console.log("err: ", err);
            res (err, null);
            return;
        }

        if (res.length){
            console.log("id found: ", res[0]);
            res(null,res[0]);
            return;
        }

        res({kind: "not_found"}, null);
    });
};

Deal.getAll = res => {
    sql2.query("SELECT * FROM db", (err, res) => {
        if (err) {
            console.log("err: ", err);
            res(null, err);
            return;
        }

        console.log("deals: ", res);
        res(null, res);
    })
}
Deal.updateById = (id, deal, res) => {
    sql2.query(
        "UPDATE db SET text =? WHERE id =?",
        [deal.text, id],
        (err, res) => {
            if (err) {
                console.log("err: ", err);
                res(null, err);
                return;
            }
            
            if (res.affectedRows == 0) {
                res({kind: "not_found"}, null);
                return;
            }

            console.log("id updated ", {id: id, ...deal});
            res(null, {id: id, ...deal});
        }
    );
};

Deal.remove = (id, res) => {
    sql2.query("DELETE FROM db WHERE id =?", id, (err, res) => {
        if (err) {
            console.log("err: ", err)
            res(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            res({kind: "not_found"}, null);
            return;
        }

        console.log("User deleted from ", id);
        res(null,  res);
    });
};

Deal.removeALL = res => {
    sql2.query("DELETE FROM db", (err, res) => {
        if (err) {
            console.log("err: ", err)
            res(null, err)
            return;
        }
        
        console.log('deleted ${res.affectedRows}deals');
        res(null, res);
    });
};