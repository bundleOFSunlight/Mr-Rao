const request = require("supertest");
const app = require("../app").app;
let userToken;
const moment = require(`moment`);
let FRUIT_NAME = `fb` + moment().format(`YYYYMMDDHHmmss`); // name is UQ
console.log("fjksdalfjjdajklfdjafjkdjpfjdsa" + FRUIT_NAME)
let SKU = `sku` + moment().format(`YYYYMMDDHHmmss`); // UQ
let BARCODE = `bc` + moment().format(`YYYYMMDDHHmmss`); // UQ
let id;
let id2;
const NUM = moment().format(`YYYYMMDDHHmmss`);
const qp = require('@flexsolver/flexqp2');
const dbcon = require('./preconfig.json');

beforeAll((done) => {
    qp.presetConnection(dbcon);
    request(app)
        .post('/authentication/login')
        .send({
            "username": "admin",
            "password": "123Qwe!!!"
        })
        .end((err, response) => {
            userToken = response.body.data.token; // save the token!
            done();
        });
});

describe("4.1.1 Datatable", () => {
    test("Bundle + cherries + preorder", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/datatable")
            .set('Authorization', userToken)
            .send({
                "draw": 1,
                "columns": [
                    {
                        "data": "id",
                        "name": "",
                        "searchable": true,
                        "orderable": true,
                        "search": {
                            "value": "",
                            "regex": false
                        }
                    }
                ],
                "order": [
                    {
                        "column": 0,
                        "dir": "asc"
                    }
                ],
                "start": 0,
                "length": 20,
                "search": {
                    "value": "",
                    "regex": true
                },
                "main_category": "bundle",
                "category": "cherries",
                "is_preorder": true
            });
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("datatable error", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/datatable")
            .set('Authorization', userToken)
            .send({
                "draw": 1,
                "columns": [
                    {
                        "data": "id",
                        "name": "",
                        "searchable": true,
                        "orderable": true,
                        "search": {
                            "value": "",
                            "regex": false
                        }
                    }
                ],
                "order": [
                    {
                        "column": 0,
                        "dir": "asc"
                    }
                ],
                "start": 0,
                "length": 20,
                "search": {
                    "value": "",
                    "regex": true
                }

            });
        expect(response.statusCode).toBe(500);
    }, 20000);
});
let id3;
let id4;
describe("4.1.3.1 Create a product", () => {
    test("Fruit Bundle", async () => {
        let response;
        try {
            response = await request(app)
                .post("/commerce_mgmt/product")
                .set('Authorization', userToken)
                .send({
                    "is_bundle": false,
                    "is_preorder": true,
                    "is_featured": true,
                    "is_hidden": false,
                    "image_url": [],
                    "type": "item",
                    "name": FRUIT_NAME,
                    "name_alt": "水果篮子",
                    "main_category": [
                        "fruits"
                    ],
                    "category": [
                        "cherries"
                    ],
                    "preorder_start_dt": "2021-04-01",
                    "preorder_end_dt": "2022-04-15",
                    "preorder_arrival_dt": "2022-04-30",
                    "preorder_limit": 30,
                    "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                    "information": "nutritional values",
                    "unit_price": 45.5,
                    "promo_price": 40,
                    "promo_name": "You save $5.5",
                    "promo_type": "FIXED",
                    "promo_value": 5.5,
                    "sku": SKU,
                    "barcode": BARCODE,
                    "weight": 4,
                    "weight_unit": "kg",
                    "uom": "pack",
                    "remark": "no remark",
                    "product_list": [
                        {
                            "id": 1,
                            "name": "Guava",
                            "barcode": "16478721248",
                            "quantity": 1,
                            "unit_price": 5.5,
                            "subtotal": 5.5
                        },
                        {
                            "id": 2,
                            "name": "Turkey Cherries",
                            "barcode": "164787215481248",
                            "quantity": 2,
                            "unit_price": 20,
                            "subtotal": 40
                        }
                    ],
                    "meta_title": "",
                    "meta_description": ""
                });

        } catch (err) {
            console.log(err);
        }
        expect(response.statusCode).toBe(200);
        id = response.body.data.id;
    }, 20000);
    test("Fruit Bundle id4", async () => {
        let response;
        try {
            response = await request(app)
                .post("/commerce_mgmt/product")
                .set('Authorization', userToken)
                .send({
                    "is_bundle": false,
                    "is_preorder": true,
                    "is_featured": true,
                    "is_hidden": false,
                    "image_url": [],
                    "name": `${FRUIT_NAME}and_id4`,
                    "name_alt": "水果篮子",
                    "main_category": [
                        "fruits",
                        "vegetables"
                    ],
                    "category": [
                        "cherries"
                    ],
                    "preorder_start_dt": "2021-04-01",
                    "preorder_end_dt": "2022-04-15",
                    "preorder_arrival_dt": "2022-04-30",
                    "preorder_limit": 30,
                    "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                    "information": "nutritional values",
                    "unit_price": 45.5,
                    "promo_price": 40,
                    "promo_name": "You save $5.5",
                    "promo_type": "FIXED",
                    "promo_value": 5.5,
                    "sku": `skukkkk${SKU}`,
                    "barcode": `${BARCODE}fffffffffff`,
                    "weight": 4,
                    "weight_unit": "kg",
                    "uom": "pack",
                    "remark": "no remark",
                    "product_list": [
                        {
                            "id": 1,
                            "name": "Guava",
                            "barcode": "16478721248",
                            "quantity": 1,
                            "unit_price": 5.5,
                            "subtotal": 5.5
                        },
                        {
                            "id": 2,
                            "name": "Turkey Cherries",
                            "barcode": "164787215481248",
                            "quantity": 2,
                            "unit_price": 20,
                            "subtotal": 40
                        }
                    ],
                    "meta_title": "abc",
                    "meta_description": "abc"
                });

        } catch (err) {
            console.log(err);
        }

        id4 = response.body.data.id;
        console.log(response);
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("Fruit Bundle3", async () => {
        let response;
        try {
            response = await request(app)
                .post("/commerce_mgmt/product")
                .set('Authorization', userToken)
                .send({
                    "is_bundle": true,
                    "is_preorder": true,
                    "is_featured": true,
                    "is_hidden": false,
                    "image_url": [],
                    "type": "bundle",
                    "name": FRUIT_NAME + "123",
                    "name_alt": "水果篮子",
                    "main_category": [
                        "fruits",
                        "vegetables"
                    ],
                    "category": [
                        "cherries"
                    ],
                    "preorder_start_dt": "2021-04-01",
                    "preorder_end_dt": "2022-04-15",
                    "preorder_arrival_dt": "2022-04-30",
                    "preorder_limit": 30,
                    "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                    "information": "nutritional values",
                    "unit_price": 45.5,
                    "promo_price": 40,
                    "promo_name": "You save $5.5",
                    "promo_type": "FIXED",
                    "promo_value": 5.5,
                    "sku": SKU + "3sku",
                    "barcode": BARCODE + "3bc",
                    "weight": 4,
                    "weight_unit": "kg",
                    "uom": "pack",
                    "remark": "no remark",
                    "product_list": [
                        {
                            "id": 1,
                            "name": "Guava",
                            "barcode": "16478721248",
                            "quantity": 1,
                            "unit_price": 5.5,
                            "subtotal": 5.5
                        },
                        {
                            "id": 2,
                            "name": "Turkey Cherries",
                            "barcode": "164787215481248",
                            "quantity": 2,
                            "unit_price": 20,
                            "subtotal": 40
                        }
                    ],
                    "meta_title": "",
                    "meta_description": ""
                });

        } catch (err) {
            console.log(err);
        }
        id3 = response.body.data.id;
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("Fruit Bundle2", async () => {
        let response
        try {
            response = await request(app)
                .post("/commerce_mgmt/product")
                .set('Authorization', userToken)
                .send({
                    "is_bundle": true,
                    "is_preorder": false,
                    "is_featured": true,
                    "is_hidden": false,
                    "image_url": [],
                    "type": "bundle",
                    "name": FRUIT_NAME + "2",
                    "name_alt": "水果篮子",
                    "main_category": [
                        "fruits",
                        "vegetables"
                    ],
                    "category": [
                        "cherries"
                    ],
                    "preorder_start_dt": "2021-04-01",
                    "preorder_end_dt": "2022-04-15",
                    "preorder_arrival_dt": "2022-04-30",
                    "preorder_limit": 30,
                    "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                    "information": "nutritional values",
                    "unit_price": 45.5,
                    "promo_price": 40,
                    "promo_name": "You save $5.5",
                    "promo_type": "FIXED",
                    "promo_value": 5.5,
                    "sku": SKU + "2",
                    "barcode": BARCODE + "2",
                    "weight": 4,
                    "weight_unit": "kg",
                    "uom": "pack",
                    "remark": "no remark",
                    "product_list": [
                        {
                            "id": 1,
                            "name": "Guava",
                            "barcode": "16478721248",
                            "quantity": 1,
                            "unit_price": 5.5,
                            "subtotal": 5.5
                        },
                        {
                            "id": 2,
                            "name": "Turkey Cherries",
                            "barcode": "164787215481248",
                            "quantity": 2,
                            "unit_price": 20,
                            "subtotal": 40
                        }
                    ],
                    "meta_title": "",
                    "meta_description": ""
                });

        } catch (err) {
            console.log(err);
        }
        id2 = response.body.data.id;
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("Fruit Bundle error", async () => {
        let response
        try {
            response = await request(app)
                .post("/commerce_mgmt/product")
                .set('Authorization', userToken)
                .send();

        } catch (err) {
            console.log("===============" + err);
        }
        expect(response.statusCode).toBe(500);
    }, 20000);
});
describe("4.1.2 Get single product", () => {
    test("ID 3", async () => {
        const response = await request(app)
            .get(`/commerce_mgmt/product/single_product/${id}`)
            .set('Authorization', userToken);
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("single product bundle", async () => {
        const response = await request(app)
            .get(`/commerce_mgmt/product/single_product/${id2}`)
            .set('Authorization', userToken);
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("single id error", async () => {
        const response = await request(app)
            .get(`/commerce_mgmt/product/single_product/999999999`)
            .set('Authorization', userToken);
        expect(response.statusCode).toBe(500);
    }, 20000);
});

describe("4.1.4 Update a product", () => {
    test("Fruit Bundle1", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id,
                "is_bundle": true,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "type": "item",
                "name": FRUIT_NAME,
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU,
                "barcode": BARCODE,
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(406);
    }, 20000);
    test("Fruit Bundle id3", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id3,
                "is_bundle": false,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "type": "item",
                "name": FRUIT_NAME + "12131",
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU + "123",
                "barcode": BARCODE + "123",
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(406);
    }, 20000);
    test("Fruit Bundle id311", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id3,
                "is_bundle": false,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "type": "item",
                "name": FRUIT_NAME + "12131",
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries",
                    "vegetables"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU + "123",
                "barcode": BARCODE + "123",
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(406);
    }, 20000);
    test("Fruit Bundle id hit if bundle false", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id4,
                "is_bundle": false,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "type": "item",
                "name": FRUIT_NAME + "21212121",
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries",
                    "vegetables"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU + "1232121",
                "barcode": BARCODE + "123212",
                "weight": 400000,
                "weight_unit": "g",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(200);
    }, 20000);

    test("success", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id3,
                "is_bundle": true,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "type": "bundle",
                "name": FRUIT_NAME + "12131",
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU + "12355",
                "barcode": BARCODE + "166623",
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(200);
    }, 20000);
    test("Fruit Bundle2", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id2,
                "is_bundle": true,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "name": FRUIT_NAME,
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU,
                "barcode": BARCODE,
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(409);
    }, 20000);
    test("Fruit Bundle3", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id2,
                "is_bundle": false,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "bundle": "item",
                "name": FRUIT_NAME,
                "name_alt": "水果篮子",
                "main_category": [
                    "fruits"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 46,
                "promo_price": 30,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU,
                "barcode": BARCODE,
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 6.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 120,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(409);
    }, 20000);
    test("update 9999999", async () => {
        const response = await request(app)
            .put("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": 999999999999,
                "is_bundle": true,
                "is_preorder": true,
                "is_featured": true,
                "is_hidden": false,
                "image_url": [],
                "name": FRUIT_NAME + '12345',
                "name_alt": "水果篮子",
                "main_category": [
                    "vegetables"
                ],
                "category": [
                    "cherries"
                ],
                "preorder_start_dt": "2021-04-01",
                "preorder_end_dt": "2022-04-15",
                "preorder_arrival_dt": "2022-04-30",
                "preorder_limit": 50,
                "description": "Freshest green papaya grown in natural environment. Insecticide free and boasts a good crunch when stir fried.",
                "information": "nutritional values",
                "unit_price": 45.5,
                "promo_price": 40,
                "promo_name": "You save $5.5",
                "promo_type": "FIXED",
                "promo_value": 5.5,
                "sku": SKU + "12354",
                "barcode": BARCODE + "12315",
                "weight": 4,
                "weight_unit": "kg",
                "uom": "pack",
                "remark": "no remark",
                "product_list": [
                    {
                        "id": 1,
                        "name": "Guava",
                        "barcode": "16478721248",
                        "quantity": 1,
                        "unit_price": 5.5,
                        "subtotal": 5.5
                    },
                    {
                        "id": 2,
                        "name": "Turkey Cherries",
                        "barcode": "164787215481248",
                        "quantity": 2,
                        "unit_price": 20,
                        "subtotal": 40
                    }
                ],
                "meta_title": "",
                "meta_description": ""
            });
        console.log(response)
        expect(response.statusCode).toBe(500);
    }, 20000);
});

describe("4.1.6 Toggle product featured", () => {
    test("toggle is_featured successful", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_featured")
            .set('Authorization', userToken)
            .send({
                "id": id,
            });
        expect(response.statusCode).toBe(200);
    });
    test("toggle id not exist", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_featured")
            .set('Authorization', userToken)
            .send({
                "id": 99999999999,
            });
        expect(response.statusCode).toBe(500);
    });
});

describe("4.1.7 Toggle product hidden", () => {
    test("Fruit Bundle", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_hidden")
            .set('Authorization', userToken)
            .send({
                "id": id,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle(not exist)", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_hidden")
            .set('Authorization', userToken)
            .send({
                "id": 9999999999999
            });
        expect(response.statusCode).toBe(500);
    });
});

describe("4.1.9 Update preoder in_stock status", () => {
    test("Fruit Bundle", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_instock")
            .set('Authorization', userToken)
            .send({
                "id": id,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_instock")
            .set('Authorization', userToken)
            .send({
                "id": id2,
            });
        expect(response.statusCode).toBe(406);
    });
    test("Fruit Bundle 2", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_instock")
            .set('Authorization', userToken)
            .send({
                "id": id2,
            });
        expect(response.statusCode).toBe(406);
    });
    test("not exist", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_instock")
            .set('Authorization', userToken)
            .send({
                "id": 9999999999999,
            });
        expect(response.statusCode).toBe(500);
    });
});

// 4.1.8 and 4.1.9 both toggle is_preorder so one will unable to test
describe("4.1.8 Toggle preoder arrived status", () => {
    test("Fruit Bundle", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_arrived")
            .set('Authorization', userToken)
            .send({
                "id": id3,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle 2", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_arrived")
            .set('Authorization', userToken)
            .send({
                "id": id,
            });
        expect(response.statusCode).toBe(406);
    });
    test("Fruit Bundle 3", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_arrived")
            .set('Authorization', userToken)
            .send({
                "id": id2,
            });
        expect(response.statusCode).toBe(406);
    });
    test("Fruit Bundle id not exist", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/toggle_is_arrived")
            .set('Authorization', userToken)
            .send({
                "id": 9999999999999,
            });
        expect(response.statusCode).toBe(500);
    });
});


/*
*  last
*/
describe("4.1.5 Delete a product", () => {
    test("Get config", async () => {
        const response = await request(app)
            .post("/marketing_mgmt/promocode")
            .set('Authorization', userToken)
            .send({
                "name": "For 4.1.0 delete" + NUM,
                "code": "For 4.1.0 delete" + NUM,
                "type": "PERCENTAGE",
                "promocode_type": "CUSTOM",
                "value": 20,
                "valid_from": "2021-02-01 00:00:00",
                "valid_to": null,
                "valid_period": 60,
                "limit_per_user": 1,
                "total_quantity_limit": 20,
                "min_spending": 30,
                "product_list": [id, id2]
            })
        id = response.body.data.id;
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle1", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle2", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id3,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle3", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id4,
            });
        expect(response.statusCode).toBe(200);
    });
    test("delete id not exist", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": 9999999,
            });
        expect(response.statusCode).toBe(406);
    });
    test("Fruit Bundle id2", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": id2,
            });
        expect(response.statusCode).toBe(200);
    });
    test("Fruit Bundle id = 2 bundle_line_product", async () => {
        const response = await request(app)
            .delete("/commerce_mgmt/product")
            .set('Authorization', userToken)
            .send({
                "id": 2,
            });
        expect(response.statusCode).toBe(406);
    });
});

//4.1.10 Search Product
describe("4.1.10 Search product", () => {
    test("Get config", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/product_search")
            .set('Authorization', userToken)
            .send({
                "main_category": "others",
                "category": "Mushrooms",
                "search": "mushroom"
            })
        id = response.body.data.id;
        expect(response.statusCode).toBe(200);
    });
});

//4.1.11 Search Product
describe("4.1.11 Search by product name", () => {
    test("Get config", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/search_name")
            .set('Authorization', userToken)
            .send({
                "name": "mushroom"
            })
        id = response.body.data.id;
        expect(response.statusCode).toBe(200);
    });
});

//4.1.11 Search barcode
describe("4.1.12 Search barcode", () => {
    test("Get config", async () => {
        const response = await request(app)
            .post("/commerce_mgmt/product/search_barcode")
            .set('Authorization', userToken)
            .send({
                "barcode": "eb3320b1-8bb5-11eb-ae21-dd3d8bfa8c25"
            })
        id = response.body.data.id;
        expect(response.statusCode).toBe(200);
    });
});