function createTemplate(templateString) {
    return function (objectInformation) {
        Object.keys(objectInformation).forEach(key => {
            templateString = templateString.replace(`{{${key}}}`, objectInformation[key]);
        })

        return templateString;
    }
}