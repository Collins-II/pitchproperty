import { CarModel, Make, ModelVariant } from "./database/models/taxonomy";


interface MapToTaxonomyOrCreateType {
	year: number;
	make: string;
	model: string;
	modelVariant: string | null;
}

export async function mapToTaxonomyOrCreate(object: MapToTaxonomyOrCreateType) {
	// attempt to find the make
	const make = await Make.findOne({
		name: new RegExp(`^${object.make}$`, "i"),
	}).lean();

	if (!make) throw new Error(`Make "${object.make}" not found.`);

	// attempt to find the model
	let model = await CarModel.findOne({
		makeId: make,
		name: new RegExp(object.model, "i"),
	}).lean();

	if (!model) {
		model = await CarModel.create({
			name: object.model,
			makeId: make,
		});
	}

	if (!model) throw new Error("Model not found");

	let modelVariant = null;

	if (object.modelVariant) {
		modelVariant = await ModelVariant.findOne({
			modelId: model,
			name: new RegExp(object.modelVariant, "i"),
		}).lean();

		if (!modelVariant) {
			modelVariant = await ModelVariant.create({
				name: object.modelVariant,
				modelId: model,
				yearStart: object.year,
				yearEnd: object.year,
			});
		}
	}

	return {
		year: object.year,
		make: make,
		model: model,
		modelVariant: modelVariant?.name || null,
		makeId: make,
		modelId: model,
		modelVariantId: modelVariant?._id || null,
	};
}
