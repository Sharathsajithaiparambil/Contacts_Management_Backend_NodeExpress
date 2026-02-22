const mangoose = require('mongoose');

const contactSchema = mangoose.Schema(
  {
    user_id: {
      type: mangoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mangoose.model('Contact', contactSchema);