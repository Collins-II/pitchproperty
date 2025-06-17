import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectToDatabase } from "@/lib/database";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { totalCharge, payMethod, network, mobileNumber, cardDetails } = body;
        console.log("PAYMENT REQUEST:", body);

        // Validate the required fields for each payment method
        if (payMethod === "mobile") {
            if (!totalCharge || !network || !mobileNumber) {
                return new NextResponse("Bad Request: Missing required fields for mobile payment", { status: 400 });
            }

            // Check for valid network (MTN Zambia or Airtel Zambia)
            if (!["mtn", "airtel"].includes(network.toLowerCase())) {
                return new NextResponse("Bad Request: Unsupported mobile network", { status: 400 });
            }
        } else if (payMethod === "visa") {
            if (!totalCharge || !cardDetails) {
                return new NextResponse("Bad Request: Missing required fields for card payment", { status: 400 });
            }
        } else {
            return new NextResponse("Bad Request: Invalid payment method", { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Fetch the current user
        /*const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new NextResponse("Unauthorized: User not logged in", { status: 401 });
        }*/

        // Payment processing logic
        let paymentResponse;
        if (payMethod === "mobile") {
            // Mobile payment processing
            if (network.toLowerCase() === "mtn") {
                paymentResponse = await processMtnPayment(mobileNumber, totalCharge);
            } else if (network.toLowerCase() === "airtel") {
                paymentResponse = await processAirtelPayment(mobileNumber, totalCharge);
            }
        } else if (payMethod === "visa") {
            // Card payment processing
            paymentResponse = await processVisaPayment(cardDetails, totalCharge);
        }

        // Handle the response from payment APIs
        if (!paymentResponse || !paymentResponse.success) {
            return new NextResponse("Payment Failed: " + paymentResponse?.message, { status: 400 });
        }

        return NextResponse.json({ successMessage: "Payment processed successfully!" });
    } catch (error) {
        console.error("Error processing payment:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// Helper function for MTN Zambia payment
async function processMtnPayment(mobileNumber: string, amount: number) {
    const mtnApiUrl = "https://api.mtn.zm/payment";
    const headers = {
        Authorization: `Bearer YOUR_MTN_API_TOKEN`,
        "Content-Type": "application/json",
    };

    const payload = {
        msisdn: mobileNumber,
        amount,
        currency: "ZMW",
        transactionType: "DEBIT",
    };

    try {
        const response = await fetch(mtnApiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { success: data.status === "SUCCESS", message: data.message };
    } catch (error) {
        console.error("MTN Payment Error:", error);
        return { success: false, message: "MTN Payment failed" };
    }
}

// Helper function for Airtel Zambia payment
async function processAirtelPayment(mobileNumber: string, amount: number) {
    const airtelApiUrl = "https://api.airtel.zm/payment";
    const headers = {
        Authorization: `Bearer YOUR_AIRTEL_API_TOKEN`,
        "Content-Type": "application/json",
    };

    const payload = {
        phoneNumber: mobileNumber,
        amount,
        currency: "ZMW",
        transactionType: "PAYMENT",
    };

    try {
        const response = await fetch(airtelApiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { success: data.status === "SUCCESS", message: data.message };
    } catch (error) {
        console.error("Airtel Payment Error:", error);
        return { success: false, message: "Airtel Payment failed" };
    }
}

// Helper function for Visa card payment
async function processVisaPayment(cardDetails: any, amount: number) {
    const visaApiUrl = "https://api.visa.com/payment";
    const headers = {
        Authorization: `Bearer YOUR_VISA_API_TOKEN`,
        "Content-Type": "application/json",
    };

    const payload = {
        cardNumber: cardDetails.cardNumber,
        expiryDate: cardDetails.expiryDate,
        cvv: cardDetails.cvv,
        amount,
        currency: "ZMW",
    };

    try {
        const response = await fetch(visaApiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { success: data.status === "SUCCESS", message: data.message };
    } catch (error) {
        console.error("Visa Payment Error:", error);
        return { success: false, message: "Visa Payment failed" };
    }
}
