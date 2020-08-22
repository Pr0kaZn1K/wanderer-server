(function () {
    var deps = [
        "env/query",
        "env/tools/print_f"
    ];
    require(deps, function () {
        var query = require("env/query");
        var printf = require("env/tools/print_f");

        var data = query.parse(window.location.search.substring(1));

        api.eve.character.add(data.code).then(function(_event){
            var page = query.toString({
                page: "home",
                item: "characters"
            });
            window.location = printf("%s%s?%s", window.location.origin, window.location.pathname, page);
        }.bind(this), function(_err){
            // todo need show dialog with error response
            alert(JSON.stringify(_err, true, 3));
            window.location = window.location.origin + window.location.pathname;
        }.bind(this));
    });
})(window);


