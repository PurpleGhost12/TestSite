import { BUG_ID } from "./settings";

describe("Тест формы заказа", () => {

    const PHONE_VALID = "89995553311  "
    const PHONE_INVALID = "3984938"
    const NAME = "Barsik"
    const ADRESS = "Sweet home"

    it(`Тест валидации - первый заказ и номер. Bug_id: ${BUG_ID}`, async ({ browser }) => {

        //подготовка - добавление товара
        await browser.url(`http://localhost:3000/hw/store/catalog/0?bug_id=${BUG_ID}`)
        await (await browser.$('.ProductDetails-AddToCart')).click()

        await browser.url(`http://localhost:3000/hw/store/cart?bug_id=${BUG_ID}`);

        const nameInput = await browser.$('.Form-Field_type_name')
        const phoneInput = await browser.$('.Form-Field_type_phone')
        const addressInput = await browser.$('.Form-Field_type_address')

        const sendBtn = await browser.$('.Form-Submit')

        //вводим корректные
        await nameInput.setValue(NAME)
        await phoneInput.setValue(PHONE_VALID)
        await addressInput.setValue(ADRESS)

        await sendBtn.click()

        await expect(browser.$(".Cart-SuccessMessage")).toExist()
        await expect(browser.$(".Cart-SuccessMessage")).toHaveElementClass("alert-success")
    });

    it(`Тест валидации формы НЕкорректный ввод. Bug_id: ${BUG_ID}`, async ({ browser }) => {

        //подготовка - добавление товара
        await browser.url(`http://localhost:3000/hw/store/catalog/0?bug_id=${BUG_ID}`)
        await (await browser.$('.ProductDetails-AddToCart')).click()
        await browser.url(`http://localhost:3000/hw/store/cart?bug_id=${BUG_ID}`);

        const nameInput = await browser.$('.Form-Field_type_name')
        const phoneInput = await browser.$('.Form-Field_type_phone')
        const addressInput = await browser.$('.Form-Field_type_address')

        const sendBtn = await browser.$('.Form-Submit')

        //вводим некорректные данные
        await nameInput.setValue('')
        await phoneInput.setValue(PHONE_INVALID)
        await addressInput.setValue('')

        await sendBtn.click()

        //форма не отправлена, инпуты подсвечены
        await expect(browser.$(".Cart-SuccessMessage")).not.toExist()
        await expect(nameInput).toHaveElementClass("is-invalid")
        await expect(nameInput).toHaveElementClass("is-invalid")
        await expect(nameInput).toHaveElementClass("is-invalid")

    });

});