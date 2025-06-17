"use server";

import type { StreamableSkeletonProps } from "@/components/admin/classifieds/streamable-skeleton";
import { routes } from "@/config/routes";
import { generateThumbHashFromSrcUrl } from "@/lib/thumbhash-server";
import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";
import { randomInt } from "node:crypto";
import slugify from "slugify";
import { createPngDataUri } from "unlazy/thumbhash";
import { getSession } from "../actions/getCurrentUser";
import { CurrencyCode } from "@/lib/database/models/car.model";

import type { UpdateClassifiedType } from "../schemas/classified.schema";
import { CarModel, Make, ModelVariant } from "@/lib/database/models/taxonomy";
import { Image } from "@/lib/database/models/image.model";

export const createClassifiedAction = async (data: StreamableSkeletonProps) => {
	const session = await getSession();
	if (!session) return { success: false, error: "Unauthorized" };

	try {
		const make = await Make.findById(data.makeId);
		const model = await CarModel.findById(data.modelId);

		let title = `${data.year} ${make?.name} ${model?.name}`;

		if (data.modelVariantId) {
			const modelVariant = await ModelVariant.findById(data.modelVariantId);
			if (modelVariant) title += ` ${modelVariant.name}`;
		}

		let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`, { lower: true });

		const slugLikeFound = await CarModel.countDocuments({ slug: new RegExp(slug, "i") });
		if (slugLikeFound) {
			slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`, { lower: true });
		}

		const thumbhash = await generateThumbHashFromSrcUrl(data.image as string);
		const uri = createPngDataUri(thumbhash);

		const classified = new CarModel({
			slug,
			title,
			year: Number(data.year),
			makeId: data.makeId,
			modelId: data.modelId,
			modelVariantId: data.modelVariantId ?? undefined,
			vrm: data?.vrm ?? null,
			price: 0,
			currency: CurrencyCode.GBP,
			odoReading: data.odoReading,
			odoUnit: data.odoUnit,
			fuelType: data.fuelType,
			bodyType: data.bodyType,
			colour: data.colour,
			transmission: data.transmission,
			ulezCompliance: data.ulezCompliance,
			description: data.description,
			doors: data.doors,
			seats: data.seats,
		});

		await classified.save();

		await new Image({
			classifiedId: classified._id,
			isMain: true,
			blurhash: uri,
			src: data.image,
			alt: title,
		}).save();

		revalidatePath(routes.admin.classifieds);
		redirect(routes.admin.editClassified(classified._id as string));
	} catch (error) {
		return { success: false, message: "Something went wrong" };
	}
};

export const updateClassifiedAction = async (data: UpdateClassifiedType) => {
	const session = await getSession();
	if (!session) forbidden();

	try {
		const make = await Make.findById(data.make);
		const model = await CarModel.findById(data.model);

		let title = `${data.year} ${make?.name} ${model?.name}`;
		let modelVariantId = data.modelVariant || undefined;

		if (modelVariantId) {
			const modelVariant = await ModelVariant.findById(modelVariantId);
			if (modelVariant) title += ` ${modelVariant.name}`;
		}

		const slug = slugify(`${title} ${data.vrm}`, { lower: true });

		await Image.deleteMany({ classifiedId: data.id });

		const images = [] as any

		/*const images = await Promise.all(
			(data.galleryImgs as { src: string }[]).map(async ({ src }, index) => {
			  const hash = await generateThumbHashFromSrcUrl(src);
			  const uri = createPngDataUri(hash);
			  return new Image({
				classifiedId: data.id,
				isMain: index === 0,
				blurhash: uri,
				src,
				alt: `${title} ${index + 1}`,
			  });
			})
		  );*/
		  
		await Image.insertMany(images);

		await CarModel.findByIdAndUpdate(data.id, {
			slug,
			title,
			year: Number(data.year),
			makeId: data.make,
			modelId: data.model,
			modelVariantId,
			vrm: data.vrm,
			price: data.price as number * 100,
			currency: data.currency,
			odoReading: data.odoReading,
			odoUnit: data.odoUnit,
			fuelType: data.fuelType,
			bodyType: data.bodyType,
			transmission: data.transmission,
			colour: data.colour,
			ulezCompliance: data.ulezCompliance,
			description: data.description,
			doors: data.doors,
			seats: data.seats,
			status: data.status,
		});

		revalidatePath(routes.admin.classifieds);
		redirect(routes.admin.classifieds);
	} catch (err) {
		console.log({ err });
		return { success: false, message: err instanceof Error ? err.message : "Something went wrong" };
	}
};

export const deleteClassifiedAction = async (id: string) => {
	try {
		await CarModel.findByIdAndDelete(id);
		await Image.deleteMany({ classifiedId: id });
		revalidatePath(routes.admin.classifieds);
		return { success: true, message: "Classified deleted" };
	} catch (error) {
		console.log("Error deleting classified: ", { error });
		return { success: false, message: error instanceof Error ? error.message : "Something went wrong" };
	}
};
