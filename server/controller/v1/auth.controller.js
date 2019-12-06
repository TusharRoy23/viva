const path = require('path');
const userJson = path.join(__dirname, '../../data/User.json');
const fs = require('fs');
import Bcrypt from 'bcryptjs';
const uuidv4 = require('uuid/v4');

const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        var data = {
            username: username,
            password: password
        };

        fs.readFile(userJson, 'utf8', (err, contents) => {
            var existData = JSON.parse(contents);
            var exists = false; var auth = {};
            
            for (let i = 0; i < existData.length; i++) {
                if (existData[i].username == data.username) {
                    if (Bcrypt.compareSync(data.password, existData[i].password)) {
                        exists = true;
                        auth = existData[i];
                    }
                    break;
                }
            }

            if (exists) {
                return res.status(201).json({
                    'msg' : 'Username Exists !',
                    status: true,
                    auth: auth
                });
            }
            else{
                return res.status(201).json({
                    'msg' : 'Username/Password Not Exists !',
                    status: false
                });
            }
        });
    } catch (error) {
        return res.status(201).json({
            'msg' : 'Failed !',
            status: false
        });
    }
};

const register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        var data = {
            userID: uuidv4(),
            username: username,
            password: Bcrypt.hashSync(password)
        };

        fs.readFile(userJson, 'utf8', (err, contents) => {
            var existData = JSON.parse(contents);
            if (existData.filter(user => user.username == data.username).length != '0') {
                return res.status(201).json({
                    msg : 'User Already Exists',
                    status : false
                });
            }
            else{
                existData.push(data);

                fs.writeFileSync(userJson, JSON.stringify(existData));
                return res.status(201).json({
                    msg : 'Successfully Store !',
                    status : true
                });
            }
        });
    } catch (error) {
        return res.status(201).json({
            'msg' : 'Failed !'
        });
    }
};

export default {
    login,
    register
};