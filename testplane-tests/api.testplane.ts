import { BUG_ID } from "./settings";

describe("Тест данных от сервера", () => {

    it(`Тест получения данных о товарах - проверка наличия полей и их содержания. Bug_id: ${BUG_ID}`, async () => {
        const response = await fetch(`http://localhost:3000/hw/store/api/products?bug_id=${BUG_ID}`); // Выполняем запрос
        const json = await response.json();

        //все объекты корректны и их поля не пусты
        for (const obj of json) {
            //проверка наличия важных полей товара
            await expect(obj).toHaveProperty("id");
            await expect(obj).toHaveProperty("name")
            await expect(obj).toHaveProperty("price");

            //проверка - важные поля не пусты
            await expect(obj.id.toString().trim()).not.toBe('');
            await expect(obj.name.toString().trim()).not.toBe('');
            await expect(obj.price.toString().trim()).not.toBe('');
        }

    });

    it(`Тест получения данных о товарах - проверка, что нет дублей товаров, id - уникальны. Bug_id: ${BUG_ID}`, async () => {
        const response = await fetch(`http://localhost:3000/hw/store/api/products?bug_id=${BUG_ID}`); // Выполняем запрос
        const json = await response.json();

        //получение всех id
        const id_arr = json.map(object => object.id);
        //товары уникальны?
        const isUnique = new Set(id_arr).size === id_arr.length;

        //проверка уникальности товаров
        await expect(isUnique).toBe(true)

    });

    it(`Тест получение верной информации о конкретном товаре. Bug_id: ${BUG_ID}`, async () => {
        //получим данные о товарах - id = 1
        let search_id = 1
        const response_1 = await fetch(`http://localhost:3000/hw/store/api/products/${search_id}?bug_id=${BUG_ID}`);
        const json_1 = await response_1.json();

        await expect(json_1).toHaveProperty("id", search_id);
        await expect(json_1).toHaveProperty("name")
        await expect(json_1).toHaveProperty("price");

        //получим данные о товарах - id = 5
        search_id = 5
        const response_5 = await fetch(`http://localhost:3000/hw/store/api/products/${search_id}?bug_id=${BUG_ID}`);
        const json_5 = await response_5.json();

        await expect(json_5).toHaveProperty("id", search_id);
        await expect(json_5).toHaveProperty("name")
        await expect(json_5).toHaveProperty("price");

    });


});