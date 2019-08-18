'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  userName: {
    type: String,
    default: ''
  },
  isAdmin:{
    type:Boolean
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  confirmed:{
    type:Boolean,
    default:false
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn :{
    type:Date,
    default:""
  },
  meeting:{
    type:Array
  }


})


mongoose.model('User', userSchema);