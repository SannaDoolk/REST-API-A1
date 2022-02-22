/**
 * Mongoose model Subscriber.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  secret: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
})

/**
 * Saves a subscriber to the database.
 *
 * @param {string} subscriberData - The user to save.
 * @returns {Promise<Subscriber>} The Promise to be fulfilled.
 */
schema.statics.saveSubscriber = async function (subscriberData) {
  const subscriber = new Subscriber(subscriberData)
  return subscriber.save()
}

export const Subscriber = mongoose.model('Subscriber', schema)
