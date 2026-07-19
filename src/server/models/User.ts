import mongoose, { Schema, Document, Model } from 'mongoose';

export interface VehicleInfo {
  ownerName: string;
  number: string;
  brand: string;
  model: string;
  type: string;
  color: string;
  deviceId: string;
}

export interface EmergencyContactInfo {
  name: string;
  relationship: string;
  phone: string;
  altPhone?: string;
}

export interface IUser extends Document {
  email: string;
  name: string;
  mobile: string;
  verified: boolean;
  vehicle?: VehicleInfo;
  emergencyContact?: EmergencyContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<VehicleInfo>({
  ownerName: { type: String, required: true },
  number: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  deviceId: { type: String, required: true },
});

const EmergencyContactSchema = new Schema<EmergencyContactInfo>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
  altPhone: { type: String },
});

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    vehicle: {
      type: VehicleSchema,
    },
    emergencyContact: {
      type: EmergencyContactSchema,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
