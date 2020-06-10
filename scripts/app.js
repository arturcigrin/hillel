function createTemplate(template) {
    return function (obj) {
        return Object.keys(obj).reduce((str, key) => {
            return str.replace(new RegExp("\\${{" + key + "}}", "g"), obj[key]);
        }, template);
    };
}