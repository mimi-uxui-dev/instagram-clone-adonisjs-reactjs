import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email')
      table.string('username', 25).index()
      table.string('avatar').nullable()
      table.text('bio').nullable()
      table.dateTime('email_varified_at').nullable()
      table.string('password')
      table.timestamps(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      /* table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }) */
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
