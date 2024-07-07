import React from "react";
import { createApp } from "../utils/createApp"
import { render } from "@testing-library/react";


describe('Навигация', () => {

    it('Все ссылки на месте и корректны', async () => {
        const { App } = createApp();
        const { findAllByRole, findByText } = render(<App />);

        //главная
        const logoLink = await findByText('Kogtetochka store');
        expect(logoLink.getAttribute("href")).toBe('/')

        //доставка
        await findAllByRole("link", {
            name: /delivery/i,
        });

        //каталОг
        await findAllByRole("link", {
            name: /catalog/i,
        });

        //контакты
        await findAllByRole("link", {
            name: /contacts/i,
        });

        //корзина
        await findAllByRole("link", {
            name: /cart/i,
        });
    })

})