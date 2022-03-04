const protractorHelper = require("protractor-helper");

// Validation Methods

module.exports.clickByText = (text) => {
    let objClick = element.all(by.xpath("//*[text() = '" + text + "']")).first();
    protractorHelper.click(objClick, 20000, `Não foi localizado nenhum elemento através do texto ${text}`);
}