import { IAuction } from "../database/models/auction.model";

export function isBidOver(item: IAuction) {
  return item.endTime < new Date();
}
