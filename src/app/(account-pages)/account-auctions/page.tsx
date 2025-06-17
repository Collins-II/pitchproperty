import { EmptyState } from "./empty-state";
import { ItemCard } from "../account-auctions/components/item-card";
import { getSession } from "@/app/actions/getCurrentUser";
import { getUserAuctions } from "@/app/actions/getAuctions";

export default async function MyAuctionPage() {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const allItems = await getUserAuctions(session.user.email as string);
  console.log("allItemsAUCTIONS", allItems);

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">Your Current Auctions</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item:any) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
