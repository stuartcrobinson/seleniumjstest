const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');
const {
    forEach
} = require('p-iteration');

var assert = require('assert');

async function login() {

    await driver.get('https://wordsmith.automatedinsights.com/');
    await driver.findElement(By.css('input.email')).sendKeys('stuart.clifford@gmail.com');
    await driver.findElement(By.css('input.password')).sendKeys('strongpassword', Key.RETURN);

    await driver.wait(until.elementLocated(By.xpath('//*[text()="Dashboard"]')), 1000);
}

async function createProjectDefault() {

    await driver.findElement(By.xpath('//button[text()="New Project"]')).click();

    await driver.wait(until.elementLocated(By.xpath('//button[text()="Create Project"]')), 1000);

    var cells = await driver.findElements(By.css('.ws-input'));

    async function processArray(cells) {
        for (const cell of cells) {
            const contents = await cell.getAttribute("placeholder");
            await cell.sendKeys(contents);
        }
    }

    await processArray(cells);

    await driver.findElement(By.xpath('//button[text()="Create Project"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//button[text()="Add Branch"]')), 10000);
}

async function createProjectCsvUpload(csvFile) {

    await driver.wait(until.elementLocated(By.xpath('//*[text()="Dashboard"]')), 1000);

    // debugger

    //New Project
    await driver.findElement(By.xpath("//*[text()='New Project']/following-sibling::*/button")).click();

    //ws-input

    //Upload CSV
    await driver.wait(until.elementLocated(By.xpath('//a[text()="Upload CSV"]')), 1000);
    await driver.findElement(By.xpath('//a[text()="Upload CSV"]')).click();


    //input#name
    await driver.wait(until.elementLocated(By.css('input#name')), 1000);
    await driver.findElement(By.css('input#name')).sendKeys('Challenge 2 wdjs');

    //   /Users/stuart.robinson/repos/cypresstest/cypress/integration/'Project 4.csv'
    await driver.findElement(By.css('input#file-upload')).sendKeys(csvFile);


    //Add Branch
    await driver.wait(until.elementLocated(By.xpath('//button[text()="Add Branch"]')), 10000);

}

async function addBranch() {

    await driver.wait(until.elementLocated(By.xpath('//button[text()="Add Branch"]')), 10000);
    await driver.findElement(By.xpath('//button[text()="Add Branch"]')).click();

    await driver.wait(until.elementLocated(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']")), 1000);

    await driver
        .findElement(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']"))
        .sendKeys('temperature > 70' + Key.TAB + "It's hot");

    await driver.findElement(By.xpath('//*[text()="Done"]/../..')).click();

    await driver.wait(until.elementLocated(By.xpath('//span[text()="It\'s hot" and not(@class)]/../../../*[@class="branch"]')), 1000);
}

/**
 * Deletes the given project, assuming it's already listed in the Dashboard. 
 * 
 * @param {string} projectName 
 */
async function deleteListedProject(projectName) {

    await driver.findElement(By.xpath('//*[text()="' + projectName + '"]/../../button[contains(@class, "table-dropdown-button")]')).click();

    //a[text()='Delete']

    await driver.findElement(By.xpath("//a[text()='Delete']")).click();
    await driver.findElement(By.xpath("//button[text()='Delete']")).click();

    //button[text()='Delete']


    //   //Clicks the project line caret.
    //   cy.contains(projectName)
    //   .parent()
    //   .siblings()
    //   .first()
    //   .find('span.mdl-button__ripple-container')
    //   .click()

    // //Clicks Delete.
    // cy.contains(projectName)
    //   .parent()
    //   .siblings()    
    //   .first()
    //   .contains('Delete')
    //   .click()

    // //Confirms deletion.
    // cy.get('.btn-danger')
    //   .click()



}

async function siteClean(numToDelete) {

    //delete all projects

    console.log("here0")

    var rows = await driver.findElements(By.css(".table-row.clickable"));

    let numDeleted = 0;

    console.log("here1")

    while (rows.length > 1) {
        await driver.findElement(By.css(".table-dropdown-button")).click();
        await driver.wait(until.elementLocated(By.xpath("//a[text()='Delete']")), 10000);

        await driver.findElement(By.xpath("//a[text()='Delete']")).click();
        // await driver.wait(until.elementIsNotVisible(By.xpath("//a[text()='Delete']")), 10000);

        await driver.wait(until.elementLocated(By.xpath("//button[text()='Delete']")), 10000);
        await driver.findElement(By.xpath("//button[text()='Delete']")).click();
        // await driver.wait(until.elementIsNotVisible(By.xpath("//button[text()='Delete']")), 10000);
        numDeleted++;

        await driver.get("http://localhost")
        await driver.get("https://wordsmith.automatedinsights.com/")
        if (numDeleted > numToDelete) {
            break;
        }
        rows = await driver.findElements(By.css(".table-row.clickable"));
    }
}
async function siteCleanByNameScrape(numToDelete) {

    //Gets the names of all the projects listed in the Dashboard and then deletes each by name.  

    var projectNamesSpans = await driver.findElements(By.css('.table-row.clickable * .flex.flex-column.flex-center > span'));

    async function processArray(spans) {

        var names = [];

        for (const span of spans) {
            const contents = await span.getText();
            console.log(contents);
            names.push(contents);
            // await cell.sendKeys(contents);
        }
        return names;
    }

    const names = await processArray(projectNamesSpans);


    console.log("here1");
    for (let i = 0; i < numToDelete; i++) {
        // deleteListedProject(names[i])

        const projectName = names[i]

        console.log("deleting " + projectName)

        await driver.wait(until.elementLocated(By.xpath('//*[text()="' + projectName + '"]/../..//button[contains(@class, "table-dropdown-button")]')), 10000);

        await driver.findElement(By.xpath('//*[text()="' + projectName + '"]/../..//button[contains(@class, "table-dropdown-button")]')).click();

        await driver.wait(until.elementLocated(By.xpath("//a[text()='Delete']")), 10000);


        //a[text()='Delete']

        await driver.findElement(By.xpath("//a[text()='Delete']")).click();

        await driver.wait(until.elementLocated(By.xpath("//button[text()='Delete']")), 10000);

        await driver.findElement(By.xpath("//button[text()='Delete']")).click();


    }
}

let driver;

(async function example() {
    try {

        // //1.  delete all projects
        // driver = await new Builder().forBrowser('chrome').build();
        // await login();
        // await siteClean(6);
        // driver.quit();


        //2.  create project default
        driver = await new Builder().forBrowser('chrome').build();
        await login();
        await createProjectDefault();
        driver.quit();


        // driver = await new Builder().forBrowser('chrome').build();
        // await login();
        // await createProjectDefault();
        // await addBranch();
        // driver.quit();

        // driver = await new Builder().forBrowser('chrome').build();
        // await login();
        // await createProjectCsvUpload("/Users/stuart.robinson/Downloads/ai.csv");
        // await addBranch();

        console.log('finished');

    } finally {
        await driver.quit();
    }
})();