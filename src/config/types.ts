import type { UpdateClassifiedType } from "@/app/schemas/classified.schema";
import type { ICar} from "@/lib/database/models/car.model";
import type { ICustomer } from "@/lib/database/models/customer.model";
import type { ChangeEvent } from "react";

type Params = {
  [x: string]: string | string[];
};

export type PrevState = {
  success: boolean;
  message: string;
};

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

export interface MultiStepFormComponentProps extends AwaitedPageProps {
  classified: ICar
}

export type ClassifiedWithImages = ICar& {
  images: {
    _id: string;
    url: string;
    key: string;
  }[];
};

export type CustomerWithClassified = ICustomer & {
  classified?: ICar;
};

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export interface Favourites {
  ids: string[]; // Assuming MongoDB ObjectIds stored as strings
}

export interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type FilterOptions<LType, VType> = Array<{
  label: LType;
  value: VType;
}>;

export interface SidebarProps extends AwaitedPageProps {
  minMaxValues: {
    _min: {
      year?: number;
      price?: number;
      odoReading?: number;
      size?: number
    };
    _max: {
      year?: number;
      price?: number;
      odoReading?: number;
      size?: number
    };
  };
}

export interface ProgressArgs {
  sent: number;
  total: number;
  uuid: string;
  percentage: number;
  key?: string;
}

//export type ClassifiedImages = UpdateClassifiedType["images"];

export type ClassifiedKeys = keyof Pick<
  ICar,
  | "status"
  | "title"
  | "vrm"
  | "views"
  | "year"
  | "colour"
  | "price"
  | "createdAt"
>;

export type CustomerKeys = keyof Pick<
  ICustomer & { classified?: ICar},
  | "email"
  | "mobile"
  | "firstName"
  | "lastName"
  | "updatedAt"
  | "createdAt"
  | "status"
  | "bookingDate"
  | "classified"
>;
