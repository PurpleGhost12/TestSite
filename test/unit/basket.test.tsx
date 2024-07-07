import React from "react";
import { findByRole, findByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import { createApp } from "../utils/createApp";
import { productsCart } from "../utils/testProducts";

describe("Тест корзины товаров", () => {
  const path = "/cart";

  it("Все добавленные товары отображаются", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    await findByTestId(0);
    await findByTestId(1);

    expect(screen.queryByText(productsCart[0].name)).toBeInTheDocument()
    expect(screen.queryByText(productsCart[1].name)).toBeInTheDocument()
  });

  it("Данные о товарах корректны", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const product1 = await findByTestId(0);
    await findByText(product1, productsCart[0].name);
    await findByText(product1, `$${productsCart[0].price}`);
    await findByText(product1, productsCart[0].count);
    await findByText(product1, `$${productsCart[0].price * productsCart[0].count}`);

    const product2 = await findByTestId(1);
    await findByText(product2, productsCart[1].name);
    await findByText(product2, `$${productsCart[1].price}`);
    await findByText(product2, productsCart[1].count);
    await findByText(product2, `$${productsCart[1].price * productsCart[1].count}`);


  });

  it("Проверка общей суммы и ее соответствия", async () => {
    const { App } = createApp(path, productsCart);
    const { findByText } = render(<App />);

    await findByText(
      `$${productsCart[0].price * productsCart[0].count +
      productsCart[1].price * productsCart[1].count
      }`
    );
  });

  it("Проверка кнопки очистить ", async () => {
    const { App, store } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", {
      name: /clear shopping cart/i,
    });

    await userEvent.click(btn)

    //пусто
    expect(store.getState().cart).toEqual({});
    //отображение тоже пусто
    expect(screen.queryByText(productsCart[0].name)).not.toBeInTheDocument()
    expect(screen.queryByText(productsCart[1].name)).not.toBeInTheDocument()

  });



  it("При пустой корзине должна быть ссылка на каталог", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    const cartEmptyText = await findByText(
      /cart is empty\. please select products in the \./i
    );

    expect(screen.queryByText(/cart is empty\. please select products in the \./i)).toBeInTheDocument()

    await findByRole(cartEmptyText, "link", {
      name: /catalog/i,
    });
  });
});