import { findByRole, findByText, within } from "@testing-library/react";
import { createApp } from "../utils/createApp";
import React from "react";
import { productsCart, productsShort } from "../utils/testProducts";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Application } from "../../src/client/Application";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import 'jest-environment-jsdom'

describe("Тестирование каталога", () => {
    const path = "/catalog";

    it("Все товары корректно отображаются", async () => {
        const { App } = createApp(path);

        const { findAllByTestId, findByText } = render(<App />);

        const card1 = await findAllByTestId(productsShort[0].id).then(result => result[0]);
        const card2 = await findAllByTestId(productsShort[1].id).then(result => result[0]);

        await findByText(productsShort[0].name);
        await findByText(productsShort[1].name);

        await findByText(`$${productsShort[0].price}`);
        await findByText(`$${productsShort[1].price}`);

        const card1LinkEl = await findByRole(card1, "link", { name: /details/i });
        expect(card1LinkEl.getAttribute("href")).toEqual(
            `/catalog/${productsShort[0].id}`
        );

        const card2LinkEl = await findByRole(card2, "link", { name: /details/i });
        expect(card2LinkEl.getAttribute("href")).toEqual(
            `/catalog/${productsShort[1].id}`
        );
    });
});