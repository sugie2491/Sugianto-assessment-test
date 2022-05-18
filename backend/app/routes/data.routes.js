module.exports = app => {
    const data = require("../controllers/data.controllers.js");
    var router = require("express").Router();

    // Do Login
    router.post("/create_events/", data.createEvents);
    router.post("/login/", data.doLogin);
    router.post("/update_event/", data.updateEvent);
    router.get("/create_default_user/", data.createDefaultUser);
    router.get("/get_event/", data.getAllEvent);
    router.get("/get_vendor/", data.getAllVendor);
    router.get("/get_event_detail/", data.getEventDetail);

    app.use('/api/', router);
};