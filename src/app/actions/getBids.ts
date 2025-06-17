import { auth } from './../../lib/firebase';

import { connectToDatabase } from "@/lib/database";
import { Auction, IAuction, IBid } from "@/lib/database/models/auction.model";
import { User } from '@/lib/database/models/user.model';
import { serializeDoc } from '@/lib/utils';
import axios from 'axios';

const populateEvent = (query: any) => {
  return query.populate([
    {
      path: "user",  // ✅ auction creator (NOT "userId")
      model: User,
      select: "_id name image email",
    },
    {
      path: "bids.bidder", // ✅ bids[].bidder
      model: User,
      select: "_id name image email",
    },
  ]);
};


export const getBidsById = async (auctionId: string): Promise<IBid[]> => {
    try {
      await connectToDatabase();
  
      const auction = await populateEvent(Auction.findOne({_id: auctionId })).lean() as IAuction | null;
  
      if (!auction || !auction.bids) return [];
  
      const sortedBids = auction.bids.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );

      //console.log("Sorted Bids:", sortedBids); // Debugging line to check the sorted bids
  
      return sortedBids.map(serializeDoc) as IBid[]; // ✅ Now TS will treat userId correctly
    } catch (error: any) {
      console.log("Error fetching items for user:", error.message);
      throw new Error("Failed to get user items");
    }
  };

export  const makeBid = async (auctionId: string, amount: number) => {
    try {
      await connectToDatabase();
  
      const auction = await axios.post(`/api/auction/bid`, {
                 method: "POST",
                 headers: {
                  "Content-Type": "application/json",
                 //Cookie: `next-auth.session-token=${token}`,
              },
                 body: JSON.stringify({ auctionId, amount }),
         });
      
          const data = await auction.data;
  
      if (!data || !data.bids) return [];
  
      console.log("AUCTION__ Bids:", data); // Debugging line to check the sorted bids
  
      return data; // ✅ Now TS will treat userId correctly
    } catch (error: any) {
      console.log("Error fetching items for user:", error.message);
      throw new Error("Failed to get user items");
    }
  };
  