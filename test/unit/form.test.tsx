import React from "react";

import userEvent from "@testing-library/user-event";
import { findByRole, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { checkout } from "../../src/client/store";
import { productsCart } from "../utils/testProducts";
import { createApp } from "../utils/createApp";



describe("Форма заказа:", () => {
    const path = "/cart?bug_id=10";
    const formTestData = {
        name: "Barsik",
        phone: "+89993332211",
        address: "Sweet Home",
    };

    const invalidPhone = '674657'

    it("проверка: если форма пуста - то инпуты подсвечены красным", async () => {
        const { App } = createApp(path, productsCart);
        const { findByRole } = render(<App />);

        const btn = await findByRole("button", { name: /checkout/i });
        await userEvent.click(btn);

        const inputName = await findByRole("textbox", { name: /name/i });
        expect(inputName.classList.contains('is-invalid')).toBe(true);

        const inputPhone = await findByRole("textbox", { name: /phone/i });
        expect(inputPhone.classList.contains('is-invalid')).toBe(true);

        const inputAdress = await findByRole("textbox", { name: /address/i });
        expect(inputAdress.classList.contains('is-invalid')).toBe(true);
    });

    it("проверка: если номер невалидный", async () => {
        const { App } = createApp(path, productsCart);
        const { findByRole } = render(<App />);

        const btn = await findByRole("button", { name: /checkout/i });
        const inputPhone = await findByRole("textbox", { name: /phone/i });

        await userEvent.type(inputPhone, invalidPhone);
        await userEvent.click(btn);

        expect(inputPhone.classList.contains('is-invalid')).toBe(true);

    });


    it("проверка: если номер невалидный", async () => {
        const { App } = createApp(path, productsCart);
        const { findByRole } = render(<App />);

        const btn = await findByRole("button", { name: /checkout/i });
        const inputPhone = await findByRole("textbox", { name: /phone/i });

        await userEvent.type(inputPhone, invalidPhone);
        await userEvent.click(btn);

        expect(inputPhone.classList.contains('is-invalid')).toBe(true);

    });

    it("если все данные валидны - без is-invalid", async () => {
        const { App } = createApp(path, productsCart);
        const { findByRole } = render(<App />);

        const btn = await findByRole("button", { name: /checkout/i });

        const inputName = await findByRole("textbox", { name: /name/i });
        await userEvent.type(inputName, formTestData.name);

        const inputPhone = await findByRole("textbox", { name: /phone/i });
        await userEvent.type(inputPhone, formTestData.phone);

        const inputAdress = await findByRole("textbox", { name: /address/i });
        await userEvent.type(inputAdress, formTestData.address);

        await userEvent.click(btn);

        expect(inputName.classList.contains('is-invalid')).toBe(false);
        expect(inputPhone.classList.contains('is-invalid')).toBe(false);
        expect(inputAdress.classList.contains('is-invalid')).toBe(false);

    });

    it("после оформления должны быть сообщение об успехе", async () => {
        const { App, store } = createApp(path, productsCart);
        const { findByText } = render(<App />);

        store.dispatch(checkout(formTestData, productsCart));
        await findByText(/order # has been successfully completed\./i);

    });


    it("после оформления заказа список товаров очищается", async () => {
        const { App, store } = createApp(path, productsCart);
        const { findByText } = render(<App />);

        store.dispatch(checkout(formTestData, productsCart));

        //надпись появляется
        await findByText(/cart is empty\. please select products in the \./i);

    });
});