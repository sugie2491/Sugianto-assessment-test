module.exports = {
    DB: 'apps_1_embreo',
    dialect: 'mysql',
    HOST: 'localhost',
    PASSWORD: '',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    USER: 'root',
};