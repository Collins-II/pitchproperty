"use client";

import { MAX_IMAGES } from "@/config/constants";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProperty } from "@/lib/database/models/property.model";
import { Loader2, PlusCircle, Star } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/uix/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/uix/form";
import { MultiImageUploader } from "@/components/classified/multi-image-uploader";
import { IAuction } from "@/lib/database/models/auction.model";
import { updateClassifiedSchema, UpdateClassifiedType } from "@/app/schemas/classified.schema";
import { updateClassifiedAction } from "@/app/_actions/classified";
import { CurrencyCode } from "@/lib/database/models/car.model";
import { CreateAuctionModal } from "./createAuctionModal";
import { setPremiumClassifiedAction } from "@/app/actions/setPremiumAction";

interface PropertyFormProps {
  property: IProperty;
}

export const PropertyForm = ({ property }: PropertyFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [isLoadingAuctions, startAuctionTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    //resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {
      id: property._id,
      title: property.title,
      desc: property.description,
      address: property.address,
      price: parseFloat(property.price),
      currency: property.currency as CurrencyCode,
      propertySize: property.propertySize,
      rentalForm: property.rentalForm,
      maxGuests: property.maxGuests,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      amenities: property.amenities,
      rules: property.rules,
      galleryImgs: property.galleryImgs,
      listingCategory: property.listingCategory,
      listingType: property.listingType,
    },
  });

  const onSubmit = (data:any) => {
    startTransition(async () => {
      const { success, message } = await updateClassifiedAction(data);
      if (!success) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Property updated successfully!",
        });
      }
    });
  };

  const setPremiumListing = () => {
    startTransition(async () => {
      const { success, message } = await setPremiumClassifiedAction(property._id);
      if (!success) {
        toast({
          title: "Failed",
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Property upgraded to Premium!",
        });
      }
    });
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-3xl font-bold text-muted mb-6">Manage Property</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                   <Button
                     type="button"
                     onClick={() => setIsAuctionOpen(true)}
                     variant="secondary"
                     className="flex items-center gap-2"
                   >
                     <PlusCircle size={18} />
                     Create Auction
                   </Button>
       
                   <Button
                     type="button"
                     onClick={setPremiumListing}
                     variant="outline"
                     className="flex items-center gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                   >
                     <Star size={18} />
                     Set as Premium
                   </Button>
                 </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="galleryImgs"
              render={({ field: { name, onChange } }) => (
                <FormItem>
                  <FormLabel className="text-muted" htmlFor="images">
                    Images (up to {MAX_IMAGES})
                  </FormLabel>
                  <FormControl>
                    <MultiImageUploader name={name} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-x-2 bg-red-500 hover:bg-red-600 text-white"
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>

     {isAuctionOpen && (
            <CreateAuctionModal
              data={property}
              onClose={() => {
                setIsAuctionOpen(false);
                //fetchAuctions(); // Refresh after creating auction
              }}
            />
          )}
    
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-muted mb-4">Active Auctions</h2>
    
            {isLoadingAuctions ? (
              <p className="text-muted">Loading auctions...</p>
            ) : auctions.length === 0 ? (
              <p className="text-muted">No auctions found for this car.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auctions.map((auction) => (
                  <div
                    key={auction._id}
                    className="p-4 bg-primary-800 text-muted rounded shadow hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">
                        Starting at £{(auction.startingPrice / 100).toFixed(2)}
                      </h3>
                      <span className="text-sm">{new Date(auction.endTime).toLocaleString()}</span>
                    </div>
                    <p className="text-sm mt-2">Status: {auction.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
    </>
  );
};
