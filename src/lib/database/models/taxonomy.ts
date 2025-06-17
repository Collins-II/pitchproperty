
import mongoose, { Schema, Document, Model, models, model } from 'mongoose';

export interface IMake extends Document {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModel extends Document {
  name: string;
  makeId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModelVariant extends Document {
  name: string;
  modelId: mongoose.Types.ObjectId;
  yearStart: number;
  yearEnd: number;
  createdAt: Date;
  updatedAt: Date;
}

const MakeSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'makes' }
);

const ModelSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    makeId: { type: mongoose.Types.ObjectId, ref: 'Make', required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'models' }
);

ModelSchema.index({ makeId: 1, name: 1 }, { unique: true });

const ModelVariantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    modelId: { type: mongoose.Types.ObjectId, ref: 'Model', required: true },
    yearStart: { type: Number, required: true },
    yearEnd: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'model_variants' }
);

ModelVariantSchema.index({ modelId: 1, name: 1 }, { unique: true });

export const Make = models?.Make || model<IMake>("Make", MakeSchema);

export const CarModel = models?.CarModel || model<IModel>("CarModel", ModelSchema);

export const ModelVariant = models?.ModelVariant || model<IModelVariant>("ModelVariant", ModelVariantSchema);