module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
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
            defaultValue: '0',
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
            defaultValue: 0,
            type: Sequelize.INTEGER
        },
        status: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        position: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        address_line_1: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        address_line_2: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        address_line_3: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        phone: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        email: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        username: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        password: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        },
        author_name: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        }
    });

    return User;
  };