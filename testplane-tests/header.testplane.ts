import { BUG_ID } from "./settings";
import { jest } from '@jest/globals';

describe("Тест панели навигации", () => {

    it(`Тест появления/сокрытия меню бургера и панели навигации при изменении размера окна. Bug_id: ${BUG_ID}`, async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`);
        const navBurger = await browser.$('.navbar-toggler');
        const navPanel =  await browser.$('.Application-Menu');

        await browser.setWindowSize(576, 900)
        await expect(navBurger).not.toBeDisplayed()
        await expect(navPanel).toBeDisplayed()

        await browser.setWindowSize(575, 900)
        await expect(navBurger).toBeDisplayed()
        await expect(navPanel).not.toBeDisplayed()

    });

    it(`Тест открытия/закрытия меню (моб. версия). Bug_id: ${BUG_ID}`, async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`);

        const navBurger = await browser.$('.navbar-toggler');
        const navPanel =  await browser.$('.Application-Menu');

        await browser.setWindowSize(567, 1095)

        // сначала панель скрыта, потом открывается/закрывается
        await expect(navPanel).not.toBeDisplayed()
        await navBurger.click()
        await expect(navPanel).toBeDisplayed()
        await navBurger.click()
        await expect(navPanel).not.toBeDisplayed()    
    });

    it(`Тест авт. закрытия меню при взамоидействии с ссылками в меню (моб. версия). Bug_id: ${BUG_ID}`, async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`);
        await browser.setWindowSize(567, 1095)
        const navBurger = await browser.$('.navbar-toggler');
        const navPanel =  await browser.$('.Application-Menu');
        const testLink = await browser.$('.nav-link')


        //кликаем на ссылку и проверяем, что после перехода меню скрылось
        await navBurger.click()
        await testLink.click()
        await expect(navPanel).not.toBeDisplayed()

    });

});