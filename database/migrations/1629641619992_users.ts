import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email').index() // to make searching fast
      table.string('username', 25).index()
      table.string('avatar').nullable()
      table.text('bio').nullable()
      table.dateTime('email_varified_at').nullable()
      table.string('password')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
