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

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // await driver.get('http://www.google.com/ncr');
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriasdfasdfver - Google Search'), 10000);
        // //
        // await driver.get('http://www.google.com');
        // 
        // var cells = await driver.findElements(By.css('.gb_P'));
        // 
        // cells.forEach((cell) => {
        //     console.log(cell)
        // })
        // 
        // console.log('HERE WE GO!!!!!!!')
        // 
        // //doens't work 100% for wordmith table
        // // await forEach(cells, async(cell) => {
        // //     const contents = await cell.getText();
        // //     console.log(contents);
        // // });
        // 
        // async function processArray(cells) {
        //     for (const cell of cells) {
        //         // await delayedLog(item);
        // 
        //         const contents = await cell.getText();
        //         console.log(contents);
        //     }
        //     console.log('Done!');
        // }
        // 
        // await processArray(cells);
        // 
        // // for (var cell in cells) {
        // //     const contents = await cell.getText();
        // //     console.log(contents);
        // // }


        console.log(Key.TAB)


        // assert(false);
        await driver.get('https://wordsmith.automatedinsights.com/');
        await driver.findElement(By.css('input.email')).sendKeys('stuart.clifford@gmail.com');
        await driver.findElement(By.css('input.password')).sendKeys('strongpassword', Key.RETURN);


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
        await driver.findElement(By.css('input#file-upload')).sendKeys("/Users/stuart.robinson/Downloads/ai.csv");


        //Add Branch
        await driver.wait(until.elementLocated(By.xpath('//button[text()="Add Branch"]')), 10000);
        await driver.findElement(By.xpath('//button[text()="Add Branch"]')).click();

        await driver.wait(until.elementLocated(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']")), 1000);

        await driver
            .findElement(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']"))
            .sendKeys('temperature > 70' + Key.TAB + "It's hot");

        await driver.findElement(By.xpath('//*[text()="Done"]/../..')).click();

        //   //span[text()='asdf' and not(@class)]/../../../*[@class='branch']


        await driver.wait(until.elementLocated(By.xpath('//span[text()="It\'s hot" and not(@class)]/../../../*[@class="branch"]')), 1000);


        // 
        // 
        // 
        //         await driver.wait(until.elementLocated(By.xpath('//button[text()="Create Project"]')), 1000);
        // 
        //         var cells = await driver.findElements(By.css('.ws-input'));
        // 
        //         console.log(cells);
        // 
        //         console.log(cells.length);
        // 
        //         await console.log('hello');
        // 
        // 
        //         async function processArray(cells) {
        //             for (const cell of cells) {
        //                 // await delayedLog(item);
        // 
        //                 const contents = await cell.getAttribute("placeholder");
        //                 console.log(contents);
        //                 await cell.sendKeys(contents);
        //             }
        //             console.log('Done!');
        //         }
        // 
        //         await processArray(cells);
        // 
        //         await driver.findElement(By.xpath('//button[text()="Create Project"]')).click();
        // 
        //         //Add Branch
        //         await driver.wait(until.elementLocated(By.xpath('//button[text()="Add Branch"]')), 10000);
        //         await driver.findElement(By.xpath('//button[text()="Add Branch"]')).click();
        // 
        //         await driver.wait(until.elementLocated(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']")), 1000);
        // 
        //         await driver
        //             .findElement(By.xpath("//*[text()='If this is true:']/..//*[@role='textbox']"))
        //             .sendKeys('temperature > 70' + Key.TAB + "It's hot");
        // 
        //         await driver.findElement(By.xpath('//*[text()="Done"]/../..')).click();
        // 
        // //   //span[text()='asdf' and not(@class)]/../../../*[@class='branch']
        // 
        // 
        //         await driver.wait(until.elementLocated(By.xpath('//span[text()="It\'s hot" and not(@class)]/../../../*[@class="branch"]')), 1000);
        // 
        // 

        //   //*[text()='If this is true:']/..//*[@role='textbox']


        //this usually misses at least one.  cos async?
        // await forEach(cells, async(cell) => {
        //     const contents = await cell.getAttribute("placeholder");
        //     console.log(contents);
        //     await cell.sendKeys(contents);
        // });


        // 
        // cells.forEach((cell) => {
        //     console.log(cell.getAttribute("placeholder"))
        // })
        // 
        // await cells.forEach((cell) => (cell.sendKeys(cell.getAttribute("placeholder"))))


        // cells.forEach

        console.log('finished')
        // await driver.wait(until.elementLocated(By.xpath('//button[text()="Crasdfasdfeate Project"]')), 1000000);
        assert(true)

        // 
        // 


    } finally {
        await driver.quit();
    }
})();