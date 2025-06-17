"use client";
import { Button } from "@/components/ui/button";
import { isBidOver } from "@/lib/utils/bids";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import AuctionTimer from "../../../(home)/auctions/components/auction-timer";
import { Route } from "next";

export function ItemCard({ item }: { item: any }) {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();

  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image
        src={item.imageUrls[0]}
        alt={item.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: {selectedCurrency} {formatNumberWithCommas(convertPrice(Number(item.startingPrice)))}
      </p>

      {isBidOver(item) ? (
        <p className="text-lg">Bidding is Over</p>
      ) : (
        <AuctionTimer endTime={item.endTime} />
      )}

      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/auctions/items/${item._id}` as Route}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
