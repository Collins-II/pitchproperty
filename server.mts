import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { BidEvent } from "@/app/(home)/auctions/components/bids-section";

interface BidResponse {
    newPrice: number;
    success: boolean;
  }

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000",10);

const app = next({ dev, hostname, port});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log(`User connected on ${socket.id}`)

        socket.on('joinAuction', ({ auctionId }) => {
        socket.join(auctionId);
        console.log(`${socket.id} joined auction ${auctionId}`);
      });

      socket.on('placeBid', data => {
        const { auctionId, bid } = data;
        socket.to(auctionId).emit('newBid', bid);
        console.log(`Bid placed on ${auctionId}:`, bid);
      });
// Broadcast globally (e.g., to all)
     socket.on("new-bid", (bid: BidEvent) => {
       io.emit("new-bid", bid); // 🔁 Emit to ALL clients
       console.log("🆕 Global bid received:", bid);
      });
        
        socket.on("disconnected", () => {
           console.log("User is disconnected!")
        })
    })


    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname} :${port}`)
    })
})