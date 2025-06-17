import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { CarModel, Make, ModelVariant } from "@/lib/database/models/taxonomy";

export const GET = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;

  try {
    await connectToDatabase();

    const makes = await Make.find({}, { _id: 1, name: 1 }).sort({ name: 1 }).lean();

    let models: any[] = [];

    const makeId = params.get("make");
    if (makeId) {
      models = await CarModel.find({ make: makeId }, { _id: 1, name: 1 }).lean();
    }

    let modelVariants: any[] = [];

    const modelId = params.get("model");
    if (makeId && modelId) {
      modelVariants = await ModelVariant.find({ model: modelId }, { _id: 1, name: 1 }).lean();
    }

    const lvMakes = makes.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));

    const lvModels = models.map(({ _id, name }) => ({
      label: name,
      value: _id.toString(),
    }));

    const lvModelVariants = modelVariants.map(({ _id, name }) => ({
      label: name,
      value: _id.toString(),
    }));

    return NextResponse.json(
      {
        makes: lvMakes,
        models: lvModels,
        modelVariants: lvModelVariants,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching makes/models/variants:", error);

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
