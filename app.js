function createTemplate(templateString) {
    return function (objectInformation) {
        let copyTemplateString = templateString;

        Object.keys(objectInformation).forEach(key => {
            copyTemplateString = copyTemplateString.replace(`{{${key}}}`, objectInformation[key]);
        })

        return copyTemplateString;
    }
}