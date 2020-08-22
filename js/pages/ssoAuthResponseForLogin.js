(function () {
    var deps = [
        "env/query",
        "env/tools/print_f",
        "env/cookie"
    ];
    require(deps, function () {
        var query = require("env/query");
        var printf = require("env/tools/print_f");
        var cookie = require("env/cookie");

        var data = query.parse(window.location.search.substring(1));

        api.user.register(1, {
            code: data.code
        }).then(function(_event){
            cookie.set("token", _event.token);

            var page = query.toString({
                page: "home",
                item: "currentMap"
            });
            window.location = printf("%s%s?%s", window.location.origin, window.location.pathname, page);
        }.bind(this), function(_err){
            // todo need show dialog with error response
            alert(JSON.stringify(_err, true, 3));
            window.location = window.location.origin + window.location.pathname;
        }.bind(this));
    });
})(window);


