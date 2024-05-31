const mongoose = require('mongoose');   

const notificationSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['New', 'Update', 'Warning', 'Congratulation'],
      required: true,
    },
    expireAt: {
      type: Date,
      index: { expires: '24h' },    
    },
  }, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;