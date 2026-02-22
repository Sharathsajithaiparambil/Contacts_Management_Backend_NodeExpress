import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IContact extends Document {
  user_id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContact>('Contact', contactSchema);

