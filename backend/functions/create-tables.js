export function createTables(database){
    produtoTable(database);
    cartTable(database);
}

function produtoTable(database) {
    const query = `
        CREATE TABLE IF NOT EXISTS produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL,
            estoque integer NOT NULL
        );
    `
    database.exec(query)
}
function cartTable(database) {
    const query = `
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_produto TEXT NOT NULL
        );
    `
    database.exec(query)
}