const path = require('path');
const todoJson = path.join(__dirname, '../../data/TodoList.json');
const fs = require('fs');

const uuidv4 = require('uuid/v4');

const noteList = async (req, res) => {
    const { userID } = req.body;
    try {
        fs.readFile(todoJson, 'utf8', (err, contents) => {
            var existData = JSON.parse(contents);
            var result = existData.filter(data => data.userID == userID);
            if (result) {
                result = result.sort(comparison('postDate', 'desc'));
                return res.status(201).json({
                    msg:result,
                    status: true
                });
            }
            else{
                return res.status(201).json({
                    msg:'',
                    status: false
                });
            }
        });
    } 
    catch (error) {
        return res.status(201).json({
            msg:'',
            status: false
        });
    }
};

function comparison(key, order = 'asc') {
    return function innerSort(a, b) {
        const varA = a[key];
        const varB = b[key];
    
        let compare = 0;
        if (varA > varB) {
          compare = 1;
        } else if (varA < varB) {
          compare = -1;
        }
        return (
          (order === 'desc') ? (compare * -1) : compare
        );
    };
}

const submitNote = async (req, res) => {
    const { note, userID } = req.body;
    try {
        var data = {
            noteID: uuidv4(),
            userID: userID,
            note: note,
            postDate: Date.now()
        };

        fs.readFile(todoJson, 'utf8', (err, contents) => {
            var existData = JSON.parse(contents);
            existData.push(data);
            fs.writeFile(todoJson, JSON.stringify(existData), (err) => {
                if (!err) {
                    return res.status(201).json({
                        status: true
                    });
                }
                else{
                    return res.status(201).json({
                        msg:'Failed',
                        status: false
                    });
                }
            });
        });
    } 
    catch (error) {
        return res.status(201).json({
            msg:'Error',
            status: false
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { note, userID, noteID } = req.body;
        
        fs.readFile(todoJson, 'utf8', (err, contents) => {
            if (!err) {
                var existData = JSON.parse(contents);
                existData.forEach((item, index) => {
                    if (item.noteID == noteID && item.userID == userID){
                        existData[index].note = note;
                    }
                });

                fs.writeFileSync(todoJson, JSON.stringify(existData));
                return res.status(201).json({
                    msg:'Updated Successfully !',
                    status: true
                });
            }
        });
    } 
    catch (error) {
        return res.status(201).json({
            msg:'Error',
            status: false
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { userID, noteID } = req.body;
        fs.readFile(todoJson, 'utf8', (err, contents) => {
            var existData = JSON.parse(contents);

            existData.forEach((item, index) => {
                if (item.noteID == noteID && item.userID == userID) {
                    existData.splice(index, 1);
                }
            });

            

            fs.writeFileSync(todoJson, JSON.stringify(existData));
            return res.status(201).json({
                msg:'Deleted Successfully !',
                status: true
            });
        });
    } 
    catch (error) {
        return res.status(201).json({
            msg:'Error',
            status: false
        });
    }
};

export default {
    submitNote,
    updateNote,
    deleteNote,
    noteList
};