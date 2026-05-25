/// <reference path="../pb_data/types.d.ts" />
//
// Adiciona campos de gamificacao em profiles:
//   - points       (int, default 0)    pontos acumulados via interacoes
//   - has_purchased (bool, default false) bypass de ranque (cliente do produto)

migrate((app) => {
    const collection = app.findCollectionByNameOrId("profiles");

    // points
    collection.fields.add(new Field({
        id: "number_points_001",
        name: "points",
        type: "number",
        required: false,
        presentable: false,
        system: false,
        min: 0,
        max: null,
        onlyInt: true
    }));

    // has_purchased
    collection.fields.add(new Field({
        id: "bool_has_purchased_001",
        name: "has_purchased",
        type: "bool",
        required: false,
        presentable: false,
        system: false
    }));

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("profiles");
    try {
        const f1 = collection.fields.getByName("points");
        if (f1) collection.fields.removeById(f1.id);
    } catch (e) {}
    try {
        const f2 = collection.fields.getByName("has_purchased");
        if (f2) collection.fields.removeById(f2.id);
    } catch (e) {}
    return app.save(collection);
});
