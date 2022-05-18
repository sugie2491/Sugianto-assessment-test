module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('company', {
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
        author_name: {
            AllowNull: false,
            defaultValue: null,
            type: Sequelize.STRING
        }
    });

    return Company;
};