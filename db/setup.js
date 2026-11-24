// Creates the tables the API needs if they don't exist yet,
// so a brand-new free database works with no manual SQL.
const setupDatabase = async (db) => {
    if (!(await db.schema.hasTable('users'))) {
        await db.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name', 100);
            table.text('email').unique().notNullable();
            table.bigInteger('entries').defaultTo(0);
            table.timestamp('joined').notNullable();
        });
    }
    if (!(await db.schema.hasTable('login'))) {
        await db.schema.createTable('login', (table) => {
            table.increments('id').primary();
            table.string('hash', 100).notNullable();
            table.text('email').unique().notNullable();
        });
    }
};

module.exports = { setupDatabase };
