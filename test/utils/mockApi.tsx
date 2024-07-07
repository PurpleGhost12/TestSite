import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { ExampleApi } from "../../src/client/api";
import { products, productsShort } from "./testProducts";

const mockApi = new ExampleApi("");
const axiosResponseSchema: AxiosResponse = {
    data: {},
    status: 200,
    statusText: "OK",
    headers: {},
    config: { 
        headers: {} as AxiosRequestHeaders
     },
    request: {},
};

//all products
mockApi.getProducts = async () => ({
    ...axiosResponseSchema,
    data: productsShort,
});

//one product for cart
mockApi.getProductById = async (id) => ({
    ...axiosResponseSchema,
    data: products[id],
});

//form
mockApi.checkout = async () => ({
    ...axiosResponseSchema,
    data: { id: 1 },
});

export default mockApi;