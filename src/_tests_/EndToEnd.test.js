import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let page;
    let browser;
    beforeAll(async () => {
        jest.setTimeout(300000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');  
    });

    afterAll(() => {
        browser.close();
    });
    
    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event event__Details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event event__Details');
        expect(eventDetails).toBeNull();
    });

})

describe('Filter events by city', () => {
    let page;
    let browser;
    beforeAll(async () => {
        jest.setTimeout(300000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
           ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.CitySearch');  
    });

    afterAll(() => {
        browser.close();
    });

    test('Events list of all cities will be rendered when on main page', async () => {
        const cityFilter = await page.$('.CitySearch .city');
        expect(cityFilter).toBeDefined();
    });

    test('Input text will render suggestions', async () => {
        const citySearch = await page.$('.city');
        await citySearch.type('Berlin');
        const suggestions = await page.$('.suggestions li');
        expect(suggestions).toBeDefined();
    });

    test('user clicks on suggested city from the list', async () => {
        const listSuggestions = await page.$('.suggestions');
        await page.click('.suggestions li');
        expect(listSuggestions).toBeDefined();
    });

})