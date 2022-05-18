module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
        deletable: {
            AllowNull: false,
            defaultValue: 1,
            type: Sequelize.BOOLEAN
        },
        editable: {
            AllowNull: false,
            defaultValue: 1,
            type: Sequelize.BOOLEAN
        },
        author_id: {
            AllowNull: false,
            defaultValue: 0,
            type: Sequelize.INTEGER
        },
        user_id: {
            AllowNull: false,
            defaultValue: 0,
            type: Sequelize.INTEGER
        },
        type: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        number: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        name: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        date: {
            AllowNull: false,
            defaultValue: '0',
            type: Sequelize.INTEGER
        },
        status: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        confirmed_date: {
            AllowNull: false,
            defaultValue: '0',
            type: Sequelize.INTEGER
        },
        proposed_date_1: {
            AllowNull: false,
            defaultValue: '0',
            type: Sequelize.INTEGER
        },
        proposed_date_2: {
            AllowNull: false,
            defaultValue: '0',
            type: Sequelize.INTEGER
        },
        proposed_date_3: {
            AllowNull: false,
            defaultValue: '0',
            type: Sequelize.INTEGER
        },
        remarks: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        author_name: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        user_type: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        user_number: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        user_name: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        user_date: {
            AllowNull: false,
            defaultValue: 0,
            type: Sequelize.INTEGER
        },
        user_status: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
    });

    return Event;
};