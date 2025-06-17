"use client";

import { updateClassifiedAction } from "@/app/_actions/classified";
import { type UpdateClassifiedType, updateClassifiedSchema } from "@/app/schemas/classified.schema";
import { MAX_IMAGES } from "@/config/constants";
import { useToast } from "@/hooks/use-toast";
import { formatClassifiedStatus } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarStatus, CurrencyCode, ICar, OdoUnit } from "@/lib/database/models/car.model";
import { Loader2, PlusCircle, Star } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/uix/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/uix/form";
import { Select } from "@/components/uix/select";
import { CarFormFields } from "./car-form-fields";
import { MultiImageUploader } from "@/components/classified/multi-image-uploader";
import { CreateAuctionModal } from "./createAuctionModal";
import { IAuction } from "@/lib/database/models/auction.model";
import { setPremiumClassifiedAction } from "@/app/actions/setPremiumAction";

interface ClassifiedFormProps {
  classified: ICar;
}

export const CarForm = ({ classified }: ClassifiedFormProps) => {

  const [isPending, startTransition] = useTransition();
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [isLoadingAuctions, startAuctionTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<UpdateClassifiedType>({
    resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {
      id: classified._id,
      odoUnit: classified.odoUnit || OdoUnit.MILES,
      currency: classified.currency || CurrencyCode.GBP,
      make: classified.make,
      model: classified.carModel,
      modelVariant: classified.modelVariant,
      year: classified.year?.toString(),
      vrm: classified.vrm ?? "",
      description: classified.description ?? "",
      fuelType: classified.fuelType,
      bodyType: classified.bodyType,
      transmission: classified.transmission,
      colour: classified.colour,
      ulezCompliance: classified.ulezCompliance,
      status: classified.status,
      odoReading: classified.odoReading,
      seats: classified.seats,
      doors: classified.doors,
      price: classified.price / 100,
    },
  });

  const fetchAuctions = () => {
    if (!classified._id) return;
    startAuctionTransition(async () => {
      try {
        const res = await fetch("/api/auctions/listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId: classified._id }),
        });

        const data = await res.json();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    });
  };

  useEffect(() => {
    fetchAuctions();
  }, [classified._id]);

  const onSubmit: SubmitHandler<UpdateClassifiedType> = (data) => {
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
          description: "Listing updated successfully!",
        });
      }
    });
  };

  const setPremiumListing = () => {
    startTransition(async () => {
      const { success, message } = await setPremiumClassifiedAction(classified._id);
      if (!success) {
        toast({
          title: "Failed",
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Listing upgraded to Premium!",
        });
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-3xl font-bold text-muted mb-6">Manage Vehicle</h1>

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
            <CarFormFields car={classified} />

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

              <FormField
                control={form.control}
                name="status"
                render={({ field: { ref, ...rest } }) => (
                  <FormItem>
                    <FormLabel className="text-muted" htmlFor="status">
                      Status
                    </FormLabel>
                    <FormControl>
                      <Select
                        options={Object.values(CarStatus).map((value) => ({
                          label: formatClassifiedStatus(value) ?? value,
                          value,
                        }))}
                        noDefault={false}
                        selectClassName="bg-white border-transparent text-muted/75"
                        {...rest}
                      />
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
          data={classified}
          onClose={() => {
            setIsAuctionOpen(false);
            fetchAuctions(); // Refresh after creating auction
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
