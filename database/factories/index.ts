import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const UserFactory = Factory.define(User, ({ faker}) => {
    return {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        email_varified_at: DateTime.local(),
    }
}).build()