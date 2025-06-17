import { Schema, model, Types, models } from "mongoose";

export interface IImage {
  alt: string;
  src: string;
  classified: Types.ObjectId; // foreign key reference
  blurhash: string;
  isMain: boolean;
}

const ImageSchema = new Schema<IImage>(
  {
    alt: { type: String, required: true },
    src: { type: String, required: true },
    classified: {
      type: Schema.Types.ObjectId,
      ref: "Classified",
      required: true,
    },
    blurhash: { type: String, required: true },
    isMain: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Image = models?.Image || model<IImage>("Image", ImageSchema);
