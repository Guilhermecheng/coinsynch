import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
            {
                "name": "John",
                "email": "john@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 100000,
                    "quantity": 300
                },
                {
                    "crypto": "ETH",
                    "average_price": 4000,
                    "quantity": 1000
                },
                {
                    "crypto": "SOL",
                    "average_price": 200,
                    "quantity": 5000
                }
                ]
            },
            {
                "name": "Alice",
                "email": "alice@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 95000,
                    "quantity": 500
                },
                {
                    "crypto": "ETH",
                    "average_price": 4200,
                    "quantity": 800
                },
                {
                    "crypto": "ADA",
                    "average_price": 2.5,
                    "quantity": 20000
                }
                ]
            },
            {
                "name": "Bob",
                "email": "bob@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 110000,
                    "quantity": 200
                },
                {
                    "crypto": "ETH",
                    "average_price": 3800,
                    "quantity": 1200
                },
                {
                    "crypto": "ADA",
                    "average_price": 1.2,
                    "quantity": 50000
                }
                ]
            },
            {
                "name": "Sarah",
                "email": "sarah@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 98000,
                    "quantity": 600
                },
                {
                    "crypto": "ETH",
                    "average_price": 4100,
                    "quantity": 900
                },
                {
                    "crypto": "USDC",
                    "average_price": 30,
                    "quantity": 1000
                }
                ]
            },
            {
                "name": "Michael",
                "email": "michael@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 105000,
                    "quantity": 400
                },
                {
                    "crypto": "ETH",
                    "average_price": 3900,
                    "quantity": 1100
                },
                {
                    "crypto": "SOL",
                    "average_price": 20,
                    "quantity": 2000
                }
                ]
            },
            {
                "name": "Emma",
                "email": "emma@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 97000,
                    "quantity": 700
                },
                {
                    "crypto": "ETH",
                    "average_price": 4300,
                    "quantity": 700
                },
                {
                    "crypto": "SOL",
                    "average_price": 350,
                    "quantity": 1500
                }
                ]
            },
            {
                "name": "Daniel",
                "email": "daniel@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 102000,
                    "quantity": 350
                },
                {
                    "crypto": "ETH",
                    "average_price": 4100,
                    "quantity": 800
                },
                {
                    "crypto": "ADA",
                    "average_price": 0.5,
                    "quantity": 5000
                }
                ]
            },
            {
                "name": "Sophia",
                "email": "sophia@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 95000,
                    "quantity": 800
                },
                {
                    "crypto": "ADA",
                    "average_price": 4200,
                    "quantity": 600
                },
                {
                    "crypto": "USDC",
                    "average_price": 0.3,
                    "quantity": 10000
                }
                ]
            },
            {
                "name": "Matthew",
                "email": "matthew@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "ADA",
                    "average_price": 100000,
                    "quantity": 250
                },
                {
                    "crypto": "ETH",
                    "average_price": 4100,
                    "quantity": 750
                },
                {
                    "crypto": "USDC",
                    "average_price": 8,
                    "quantity": 3000
                }
                ]
            },
            {
                "name": "Isabella",
                "email": "isabella@example.com",
                "avatar_img": "https://github.com/Guilhermecheng.png",
                "wallet": [
                {
                    "crypto": "BTC",
                    "average_price": 99000,
                    "quantity": 500
                },
                {
                    "crypto": "ETH",
                    "average_price": 4300,
                    "quantity": 500
                },
                {
                    "crypto": "ADA",
                    "average_price": 50,
                    "quantity": 2000
                }
                ]
            }
        ]
    )
}