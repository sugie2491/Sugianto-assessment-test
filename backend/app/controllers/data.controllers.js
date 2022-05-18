let md5 = require("md5")
const db = require("../models")
const User = db.user
const Event = db.event
const Op = db.Sequelize.Op

// create default user record
exports.createDefaultUser = (req, res) => {
    let userRecord = {}
    userRecord = {
        author_id: 1,
        author_name: 'Admin',
        type: 'HR',
        number: '0001',
        name: 'Admin',
        status: 'Active',
        username: 'admin',
        password: md5('admin')
    }

    User.create(userRecord).then(data => {
        res.send(data)
    })

    userRecord = {
        author_id: 1,
        author_name: 'Admin',
        type: 'Vendor',
        number: '0002',
        name: 'SG Hospital',
        status: 'Active',
        username: 'vendor',
        password: md5('admin')
    }

    User.create(userRecord).then(data => {
        res.send(data)
    })

    userRecord = {
        author_id: 1,
        author_name: 'Admin',
        type: 'Vendor',
        number: '0003',
        name: 'Sentosa Hospital',
        status: 'Active',
        username: 'vendor2',
        password: md5('admin')
    }

    User.create(userRecord).then(data => {
        res.send(data)
    })
}

exports.createEvents = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });

        return;
    }

    // get user data to populate foreign key
    User.findByPk(req.body.user_id).then(data => {
        if (data) {
            // Create an Event
            const eventRecord = {
                author_id: req.body.author_id,
                user_id: req.body.user_id,
                name: req.body.name,
                status: 'Pending',
                proposed_date_1: req.body.proposed_date_1,
                proposed_date_2: req.body.proposed_date_2,
                proposed_date_3: req.body.proposed_date_3,
                author_name: req.body.author_name,
                user_type: data.type,
                user_number: data.number,
                user_name: data.name,
                user_name: data.name,
                user_status: data.status,
            };

            // Save Event in the database
            Event.create(eventRecord).then(data => {
                const record = {
                    data: data,
                    status: 'success'
                }

                res.send(record)
            }).catch(err => {
                res.send({
                    status: 'error',
                    message: err.message || "Server Error."
                })
            });
        }
    })
};

exports.doLogin = (req, res) => {
    const username = req.body.username
    const password = md5(req.body.password)

    let condition = {
        username: username,
        password: password
    }

    User.findAll({
        where: condition
    }).then(data => {
        if (data.length > 0) {
            const record = {
                data: data,
                status: 'success'
            }
            res.send(record)
        }
        else {
            throw new Error('Wrong Username / Password.')
        }
    }).catch(err => {
        res.send({
            status: 'error',
            message: err.message || "Server Error."
        })
    })
};

exports.getAllEvent = (req, res) => {
    let conditions = (typeof req.body.user_id === 'undefined') ? {} : {
        user_id: req.body.user_id
    }

    Event.findAll({ where: conditions }).then(data => {
        if (data.length > 0) {
            const record = {
                data: data,
                status: 'success'
            }
            res.send(record)
        }
    }).catch(err => {
        res.send({
            status: 'error',
            message: err.message || "Server Error."
        })
    })
}

exports.getAllVendor = (req, res) => {
    let condition = {
        type: 'Vendor',
    }

    User.findAll({
        where: condition
    }).then(data => {
        if (data.length > 0) {
            const record = {
                data: data,
                status: 'success'
            }
            res.send(record)
        }
    }).catch(err => {
        res.send({
            status: 'error',
            message: err.message || "Server Error."
        })
    })
}

exports.getEventDetail = (req, res) => {
    Event.findByPk(req.body.event_id).then(data => {
        if (data) {
            const record = {
                data: data,
                status: 'success'
            }

            res.send(record)
        }
    }).catch(err => {
        res.send({
            status: 'error',
            message: err.message || "Server Error."
        })
    })
}

exports.updateEvent = (req, res) => {
    const eventId = req.body.event_id

    if (req.body.status == 'Approved') {
        req.body.remarks = ''
    }
    else {
        req.body.confirmed_date = 0
    }

    const eventRecord = {
        status: req.body.status,
        confirmed_date: req.body.confirmed_date,
        remarks: req.body.remarks
    }

    Event.update(eventRecord, { where: { id: eventId }}).then(num => {
        if (num == 1) {
            res.send({
                status: "success"
            });
        }
        else {
            throw new Error('Event not found.')
        }
    }).catch(err => {
        res.send({
            status: 'error',
            message: err.message || "Server Error."
        })
    });
}
