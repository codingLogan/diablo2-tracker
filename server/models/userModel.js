import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import hashPassword from '../utils/hashPassword.js'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// mongoose middleware
// Note - pre-save doesn't run when insertMany is called
// You must call create instead, which calls save underneath
userSchema.pre('save', async function (next) {
  // Only run when password changes
  if (!this.isModified('password')) {
    next()
  }

  this.password = await hashPassword(this.password)
})

const User = mongoose.model('User', userSchema)

export default User
