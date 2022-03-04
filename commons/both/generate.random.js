module.exports.email = function () {
    var int = "";
    var possible = "0123456789";
    for (var i = 1; i < 4; i++)
        int += possible.charAt(Math.floor(Math.random() * possible.length));
    return int + "@testeauto.com";
};