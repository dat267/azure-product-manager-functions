import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import productsService from "../services/productsService";
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    let response;
    let client = new CosmosClient(process.env.CONNECTION_STRING);
    try {
        let products = await productsService.read();
        response = { body: products, status: 200 };
    } catch (err) {
        response = { body: err.message, status: 500 };
    }

    context.res = response;
};

export default httpTrigger;