const Atm = require('./atm.model');
// const moneyRander = require()
// add new atm method
exports.add = (req, res) => {
    console.log("Inside add");
    console.log("req.body: ", req.body);

    let atm = new Atm({
        // bankName: req.body.bank,
        atmID: req.body.atmID,
        cashInMachine: req.body.cashInMachine,
        twoThousand: req.body.twoThousand,
        fiveHundred: req.body.fiveHundred,
        hundred: req.body.hundred
    });

    /*   NOTE: We can call save method on atm bcz its an object of atm  */

    atm.save((err, atmCashData) => {
        if (err) {
            console.log("Error in creating new atm: ", err);
            res.send(err);
        } else {
            console.log("atm add successfully!: ", atmCashData);
            res.send(atmCashData);
        }
    });
};

exports.withDraw = (req, res) => {
    console.log("Inside withdraw");
    console.log("req.body: ", req.body);

    const atmProp = {
        atmID: req.body.atmID
    };

    Atm.findOne(atmProp, (err, atm) => {
        if (err) {
            console.log("FindOne Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Found atm !", atm);
            // res.send(atm);

            // Setting data
            // console.log("", )

            let withdrawAmount = (req.body.withdrawAmount);
            console.log("withdrawAmount", withdrawAmount);
            console.log("withdrawAmount", typeof (withdrawAmount));

            let ATM_AMOUNT = atm.cashInMachine;
            const NOTES_IN_MACHINE = {
                twoThousand: atm.twoThousand,
                fiveHundred: atm.fiveHundred,
                hundred: atm.hundred
            }

            // Logic to render notes
            let notesToRender = {
                twoThousand: 0,
                fiveHundred: 0,
                hundred: 0
            };

            let errorInRender = null;

            if (ATM_AMOUNT === 0)
                errorInRender = "error: Cash not available";
            else if (withdrawAmount > ATM_AMOUNT)
                errorInRender = "error: Enough cash is not available";
            else {
                console.log("Inside else");

                while (withdrawAmount > 0) {
                    console.log("Inside while");
                    if (NOTES_IN_MACHINE.twoThousand > 0 && withdrawAmount % 2000 == 0) {
                        ATM_AMOUNT -= 2000;
                        NOTES_IN_MACHINE.twoThousand -= 1;
                        notesToRender.twoThousand += 1;
                        withdrawAmount -= 2000;
                    } else if (NOTES_IN_MACHINE.fiveHundred > 0 && withdrawAmount % 500 == 0) {
                        ATM_AMOUNT -= 500;
                        NOTES_IN_MACHINE.fiveHundred -= 1;
                        notesToRender.fiveHundred += 1;
                        withdrawAmount -= 500;
                    } else if (NOTES_IN_MACHINE.hundred > 0 && withdrawAmount % 100 == 0) {
                        ATM_AMOUNT -= 100;
                        NOTES_IN_MACHINE.hundred -= 1;
                        notesToRender.hundred += 1;
                        withdrawAmount -= 100;
                    } else {
                        errorInRender = "error: Plz enter an amount in multiple of 100,500 and 2000";
                        break;
                    }
                }
            }

            if (errorInRender !== null)
                res.send({ error: errorInRender });
            else
                res.send({
                    notesToRender: notesToRender,
                    atm: atm
                });
            console.log("notesToRender", notesToRender);
        }
    });
}

exports.update = (req, res) => {
    console.log("Inside update: ");
    console.log("Update req.body: ", req.body);

    let withdrawedAmount = Number.parseInt(req.body.withdrawedAmount);
    let withdrawedNotes = req.body.withdrawedNotes;
    let oldDataAtm = req.body.oldDataAtm;
    // console.log(" req.body.atmID", typeof(req.body.atmID));
    const updateAtmProp = {
        _id: oldDataAtm._id,
    }
    console.log("updateAtmProp", updateAtmProp);

    let newAtm = new Atm({
        _id: oldDataAtm._id,
        // atmID: oldDataAtm.atmID,
        cashInMachine: oldDataAtm.cashInMachine - withdrawedAmount,
        twoThousand: oldDataAtm.twoThousand - withdrawedNotes.twoThousand,
        fiveHundred: oldDataAtm.fiveHundred - withdrawedNotes.fiveHundred,
        hundred: oldDataAtm.hundred - withdrawedNotes.hundred
    });

    Atm.findOneAndUpdate(updateAtmProp, newAtm, (err, atm) => {
        if (err) {
            console.log("Update Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Atm updated successfully!");
            res.send(atm);
        }
    });
}