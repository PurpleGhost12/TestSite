import React from "react";
import { act, findByRole, findByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import { createApp } from "../utils/createApp";
import { products, productsCart } from "../utils/testProducts";

describe("Тест корзины товаров", () => {
    const path = "/catalog/0";


    it("Все данные о товаре отображаются корректно", async () => {
        const { App } = createApp(path);
        const { findByText } = render(<App />);

        await findByText(products[0].name);
        await findByText(`$${products[0].price}`);
        await findByText(products[0].description)
        await findByText(products[0].color);
        await findByText(products[0].material);

    });

    it("В шапке должно отображаться, что товар добавлен при клике", async () => {
        const { App } = createApp(path);
        const { findByRole } = render(<App />);

        //сначала пусто
        await findByRole("link", {
            name: /cart/i,
        });

        const btn = await findByRole("button", { name: /add to cart/i });
        await userEvent.click(btn);

        //добавили товар - он появился
        await findByRole("link", {
            name: /cart \(1\)/i,
        });

    });

    it("Кнопка добавить добавляет товар при каждом нажатии :)", async () => {
        const { App, store } = createApp(path);
        const { findByRole } = render(<App />);

        const btn = await findByRole("button", { name: /add to cart/i });
        await userEvent.click(btn);

        //товар записан
        expect(store.getState().cart).toEqual({
            "0": { ...productsCart[0], count: 1 },
        });


        await userEvent.click(btn);
        expect(store.getState().cart).toEqual({
            "0": { ...productsCart[0], count: 2 },
        });

    });
});