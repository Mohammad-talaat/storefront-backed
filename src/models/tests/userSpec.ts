import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get Many Users method', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })

    it('should have a Get One User method', () => {
      expect(userModel.getUser).toBeDefined()
    })

    it('should have a Create User method', () => {
      expect(userModel.createUser).toBeDefined()
    })

    it('should have a Update User method', () => {
      expect(userModel.updateUser).toBeDefined()
    })

    it('should have a Delete User method', () => {
      expect(userModel.deleteUser).toBeDefined()
    })

    it('should have an Authenticate User method', () => {
      expect(userModel.authenticateUser).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123',
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      // if you are not using uuid u need to add `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.createUser({
        email: 'test7@test.com',
        user_name: 'test7User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test7@test.com',
        user_name: 'test7User',
        first_name: 'Test',
        last_name: 'User',
      } as User)
    })

    it('Get Many method should return All available users in DB', async () => {
      const users = await userModel.getAllUsers()
      expect(users.length).toBe(2)
    })

    it('Get One method should return testUser when called with ID', async () => {
      const returnedUser = await userModel.getUser(user.id as unknown as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.email).toBe(user.email)
      expect(returnedUser.user_name).toBe(user.user_name)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
    })

    it('Update One method should return a user with edited attributes', async () => {
      const updatedUser = await userModel.updateUser(user.id as unknown as string,{
        ...user,
        user_name: 'new testUser',
        first_name: 'Mohammed',
        last_name: 'Talaat',
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.user_name).toBe('new testUser')
      expect(updatedUser.first_name).toBe('Mohammed')
      expect(updatedUser.last_name).toBe('Talaat')
    })

    it('Delete One method should delete user from DB', async () => {
      const deletedUser = await userModel.deleteUser(user.id as unknown as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})
