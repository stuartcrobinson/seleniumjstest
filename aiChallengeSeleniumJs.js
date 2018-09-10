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

let driver;

(async function example() {
    driver = await new Builder().forBrowser('chrome').build();
    try {

        await login();
        await createProjectDefault();
        await addBranch();

        driver.quit();
        driver = await new Builder().forBrowser('chrome').build();

        await login();
        await createProjectCsvUpload("/Users/stuart.robinson/Downloads/ai.csv");
        await addBranch();

        console.log('finished');

    } finally {
        await driver.quit();
    }
})();