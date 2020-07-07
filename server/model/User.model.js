import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: [String],
      default: ['user']
    }
  },
  {
    timestamp: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hashSync(this.password)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    console.log(bcrypt.hashSync(password), this.password)
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No email')
    }
    if (!password) {
      throw new Error('No Password')
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordIncorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
