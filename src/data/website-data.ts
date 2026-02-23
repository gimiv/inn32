import { GuestWebsiteProps } from '../types/website'

export const websiteData: GuestWebsiteProps = {
    property: {
        id: "inn-32",
        name: "Inn 32",
        tagline: "Refined & Reopened",
        description: "Welcome to Inn 32, a newly revitalized boutique hotel located in the heart of North Woodstock, New Hampshire—just minutes from Franconia Notch and the White Mountain National Forest. Originally a classic roadside inn, Inn 32 has been fully reimagined in 2025 with a fresh design and modern comforts, all while honoring its vintage charm.",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        contact: {
            phone: "(603) 745-2416",
            email: "info@inn32.com",
            instagram: "@inn32nh"
        },
        address: {
            street: "180 Main Street",
            city: "North Woodstock",
            state: "NH",
            zip: "03262",
            country: "USA",
            coordinates: {
                lat: 44.0281,
                lng: -71.6817
            }
        }
    },
    websiteConfig: {
        theme: "mountain-modern",
        primaryColor: "#1e293b", // Slate 800 - Deep, modern dark
        secondaryColor: "#475569", // Slate 600
        fontFamily: "Inter",
        metaTitle: "Inn 32 | North Woodstock, NH",
        metaDescription: "A newly revitalized boutique hotel in the heart of the White Mountains. Modern comforts, vintage charm.",
        socialImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
    },
    sections: {
        hero: {
            id: "hero",
            enabled: true,
            order: 0,
            title: "Hero",
            content: {
                heading: "Your White Mountains Gateway",
                subheading: "Your basecamp for all-season mountain fun in the heart of the White Mountains.",
                ctaText: "Book Your Stay",
                ctaLink: "https://inn32.com/booking",
                secondaryCtaText: "View Rooms",
                secondaryCtaLink: "#rooms",
                backgroundImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=2000",
                backgroundVideos: ["/hero.mp4"]
            }
        },
        rooms: {
            id: "rooms",
            enabled: true,
            order: 1,
            title: "Rooms",
            content: {
                heading: "Our Rooms",
                description: "Fresh design and modern comforts, honoring our vintage charm."
            }
        },
        amenities: {
            id: "amenities",
            enabled: true,
            order: 2,
            title: "Amenities",
            content: {
                heading: "Amenities",
                description: "Everything you need for a comfortable stay."
            }
        },
        thingsToDo: {
            id: "things-to-do",
            enabled: true,
            order: 3,
            title: "Things To Do",
            content: {
                heading: "Explore North Woodstock",
                description: "From hiking to dining, adventure is just steps away."
            }
        },
        events: {
            id: "events",
            enabled: false,
            order: 4,
            title: "Events",
            content: {
                heading: "Upcoming Events",
                description: "See what's happening around town."
            }
        },
        reviews: {
            id: "reviews",
            enabled: true,
            order: 5,
            title: "Reviews",
            content: {
                heading: "Guest Reviews",
                description: "Don't just take our word for it."
            }
        },
        gallery: {
            id: "gallery",
            enabled: true,
            order: 6,
            title: "Gallery",
            content: {
                heading: "Gallery",
                description: "A glimpse into the Inn 32 experience."
            }
        },
        location: {
            id: "location",
            enabled: true,
            order: 7,
            title: "Location",
            content: {
                heading: "Getting Here",
                description: "Conveniently located on Main Street."
            }
        }
    },
    roomTypes: [
        {
            id: "standard-queen",
            name: "Standard Queen",
            shortDescription: "Perfect for couples or solo travelers, this cozy room features a plush queen-size bed.",
            basePrice: 159,
            currency: "USD",
            maxOccupancy: 2,
            bedType: "1 Queen Bed",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/df0d9ff8-9d6f-44c6-b2f3-7d82d2909bbd/Room10_Bed.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/083f9408-db62-4ef7-b355-1579ef649479/Room01.jpg"
            ],
            amenities: ["Wi-Fi", "A/C", "Coffee Maker", "Smart TV"],
            available: true
        },
        {
            id: "riverside-queen",
            name: "Riverside Queen",
            shortDescription: "Enjoy soothing sights and sounds of the river with peaceful views.",
            basePrice: 179,
            currency: "USD",
            maxOccupancy: 2,
            bedType: "1 Queen Bed",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/07ddf86d-1f17-482b-bb5d-2f65c7039955/Room14_Bed.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/44a65b52-52ae-42ec-8b48-f8ec73d6a960/Room04_02.jpg"
            ],
            amenities: ["River View", "Wi-Fi", "A/C", "Coffee Maker"],
            available: true
        },

        {
            id: "standard-family",
            name: "Standard Family Room",
            shortDescription: "Designed for small families, offering one queen bed and one full bed.",
            basePrice: 199,
            currency: "USD",
            maxOccupancy: 3,
            bedType: "1 Queen + 1 Full",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/041351dd-2733-4787-9522-a0af7b2b69ce/Room03.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/083f9408-db62-4ef7-b355-1579ef649479/Room01.jpg"
            ],
            amenities: ["Wi-Fi", "A/C", "Microwave", "Mini Fridge"],
            available: true
        },
        {
            id: "double-queen",
            name: "Double Queen",
            shortDescription: "Spacious room with two queen beds, perfect for families or groups.",
            basePrice: 219,
            currency: "USD",
            maxOccupancy: 4,
            bedType: "2 Queen Beds",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/44a65b52-52ae-42ec-8b48-f8ec73d6a960/Room04_02.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/041351dd-2733-4787-9522-a0af7b2b69ce/Room03.jpg"
            ],
            amenities: ["Wi-Fi", "A/C", "Microwave", "Mini Fridge"],
            available: true
        },
        {
            id: "2-bed-apt",
            name: "Two-Bedroom Apartment",
            shortDescription: "Our most sought-after option with two bedrooms, private patio, and ample space.",
            basePrice: 349,
            currency: "USD",
            maxOccupancy: 6,
            bedType: "2 Queen + 2 Twin",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/0f3063bf-5bb4-44e5-97eb-16a8cbad558e/Living_Room_02.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/1eba0066-9216-4b5b-8eb1-ee81cee8f5a4/Sunroom.jpg"
            ],
            amenities: ["Kitchenette", "Private Patio", "Living Area", "Wi-Fi"],
            available: true
        },
        {
            id: "4-bed-apt",
            name: "Four-Bedroom Apartment",
            shortDescription: "Expansive lodge apartment sleeping up to 8 guests across four separate rooms.",
            basePrice: 499,
            currency: "USD",
            maxOccupancy: 8,
            bedType: "1 King, 1 Queen, 1 Full, 1 Bunk",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/1eba0066-9216-4b5b-8eb1-ee81cee8f5a4/Sunroom.jpg",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/0f3063bf-5bb4-44e5-97eb-16a8cbad558e/Living_Room_02.jpg"
            ],
            amenities: ["Full Kitchen", "Living Room", "Multiple Bathrooms", "Wi-Fi"],
            available: true
        }
    ],
    amenities: [
        { id: "wifi", name: "Free Wi-Fi", icon: "wifi", category: "Essentials" },
        { id: "ac", name: "Air Conditioning", icon: "wind", category: "Comfort" },
        { id: "coffee", name: "Coffee Maker", icon: "coffee", category: "Food & Drink" },
        { id: "parking", name: "Free Parking", icon: "car", category: "Services" },
        { id: "tv", name: "Smart TV", icon: "tv", category: "Entertainment" },
        { id: "fridge", name: "Mini Fridge", icon: "snowflake", category: "Food & Drink" }
    ],
    thingsToDo: [
        // Food & Drink
        {
            id: "woodstock-inn",
            name: "Woodstock Inn Brewery",
            category: "Food & Drink",
            description: "Local craft beers, hearty comfort food, and a cozy atmosphere right in town.",
            image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "pemi-public-house",
            name: "Pemi Public House",
            category: "Food & Drink",
            description: "A relaxed spot for American fare, cocktails, and gathering with friends.",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "truants",
            name: "Truant's Taverne",
            category: "Food & Drink",
            description: "A local favorite featuring a classic pub atmosphere and delicious eats.",
            image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "coneheads",
            name: "Coneheads Ice Cream",
            category: "Food & Drink",
            description: "The perfect post-hike treat featuring a wide variety of ice cream flavors.",
            image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=800"
        },
        // Hiking
        {
            id: "flume",
            name: "Flume Gorge",
            category: "Hiking",
            description: "Spectacular natural gorge with waterfalls, boardwalks, and dramatic rock formations.",
            image: "https://images.unsplash.com/photo-1443632864897-15c52cd7c51e?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "mt-pemi",
            name: "Mount Pemigewasset",
            category: "Hiking",
            description: "A rewarding short hike offering sweeping views of the Franconia Range.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "franconia-notch",
            name: "Franconia Notch State Park",
            category: "Hiking",
            description: "Scenic trails, lakes, and the heart of the White Mountain National Forest.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
        },
        // Attractions
        {
            id: "clarks",
            name: "Clark's Bears",
            category: "Attractions",
            description: "Famous trained bear shows, steam train rides, and family entertainment.",
            image: "https://images.unsplash.com/photo-1589656966895-2f33e7653e00?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "whales-tale",
            name: "Whale's Tale Waterpark",
            category: "Attractions",
            description: "New England's favorite waterpark, perfect for cooling off on summer days.",
            image: "https://images.unsplash.com/photo-1582653291997-079a1c04c792?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "cannon-tram",
            name: "Cannon Mountain Tramway",
            category: "Attractions",
            description: "Ride the aerial tramway to the summit for stunning panoramic views.",
            image: "https://images.unsplash.com/photo-1548281561-547e70477163?auto=format&fit=crop&q=80&w=800"
        },
        // Shopping
        {
            id: "local-works",
            name: "Local Works Marketplace",
            category: "Shopping",
            description: "A curated marketplace featuring handcrafted goods and local art.",
            image: "https://images.unsplash.com/photo-1472851294608-415522f96385?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "faddens",
            name: "Fadden’s General Store",
            category: "Shopping",
            description: "Historic general store known for its authentic maple syrup and souvenirs.",
            image: "https://images.unsplash.com/photo-1527960669566-f881763cd33e?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "chutters",
            name: "Chutters",
            category: "Shopping",
            description: "Home to the world’s longest candy counter – a sweet tooth's paradise.",
            image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800"
        },
        // Seasonal
        {
            id: "loon",
            name: "Loon Mountain",
            category: "Seasonal Activities",
            description: "World-class skiing, snowboarding, and year-round gondola adventures.",
            image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "ice-castles",
            name: "Ice Castles",
            category: "Seasonal Activities",
            description: "Magical, LED-lit ice sculptures and tunnels to explore in winter.",
            image: "https://images.unsplash.com/photo-1612450637672-0f5ea211fb84?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "kancamagus",
            name: "Kancamagus Highway",
            category: "Seasonal Activities",
            description: "One of the world's most spectacular fall foliage drives just minutes away.",
            image: "https://images.unsplash.com/photo-1504681869696-d97721183f4b?auto=format&fit=crop&q=80&w=800"
        }
    ],
    events: [
        {
            id: "brewery-music",
            title: "Woodstock Inn Brewery Live Music Nights",
            date: "Ongoing",
            location: "North Woodstock, NH",
            image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
            description: "Regular live bands and solo acts in the pub a short walk from Inn 32; check their calendar for multiple March 2026 shows such as Mitch Alden, Dan Parkhurst, and Blue Matter.",
            isFeatured: true,
            customLabel: "Staff Pick"
        },
        {
            id: "lincoln-events",
            title: "Lincoln / Franconia Notch Event Series",
            date: "Winter - Spring 2026",
            location: "Lincoln, NH",
            image: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&q=80&w=1200",
            description: "Regional calendar lists \"Live Music – Woodstock Inn Brewery\" Saturdays through March 28, plus other Franconia Notch-area happenings like guided outings and community events typically within a 15–25 minute drive.",
            isFeatured: false
        },
        {
            id: "maple-month",
            title: "Maple Month in the White Mountains",
            date: "March 2026",
            location: "White Mountains, NH",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200",
            description: "March is Maple Month across the region: sugarhouses open for tours, tastings, and demonstrations, with several producers located within an easy drive of North Woodstock.",
            isFeatured: true,
            customLabel: "Local Tradition"
        },
        {
            id: "bretton-woods-beach-party",
            title: "Beach Party on the Slopes",
            date: "Early March 2026",
            location: "Bretton Woods, NH",
            image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=1200",
            description: "Spring-ski party at Bretton Woods with live music and on-snow games, roughly 45–60 minutes from Inn 32.",
            isFeatured: false
        },
        {
            id: "spring-skiing-family",
            title: "Spring Skiing & Family Fun Week",
            date: "Mid-March 2026",
            location: "Bretton Woods, NH",
            image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=1200",
            description: "Multi-day spring event at a White Mountains ski area with kids’ races, costume days, and family activities.",
            isFeatured: false
        },
        {
            id: "maple-sugar-tours",
            title: "Annual Maple Sugar Tours",
            date: "Late March 2026",
            location: "White Mountains, NH",
            image: "https://images.unsplash.com/photo-1527960669566-f881763cd33e?auto=format&fit=crop&q=80&w=1200",
            description: "Organized maple tours in the White Mountains, showcasing the sugaring process and offering samples; good as a half-day outing from North Woodstock.",
            isFeatured: false
        },
        {
            id: "psychic-fair",
            title: "Psychic Fair Weekend",
            date: "April 24–25, 2026",
            location: "Indian Head Resort, Lincoln",
            image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1200",
            description: "Themed weekend with psychic fair at Indian Head Resort just south of Lincoln, a short drive from Inn 32.",
            isFeatured: false
        },
        {
            id: "girlfriends-weekend",
            title: "2026 Girlfriends Weekend Spring Fling",
            date: "May 1–3, 2026",
            location: "North Conway, NH",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
            description: "Themed weekend package at White Mountain Hotel & Resort with artisan fair, spa options, dinner, entertainment, yoga, and brunch.",
            isFeatured: false
        },
        {
            id: "alton-weagle",
            title: "Alton Weagle Day",
            date: "May 23, 2026",
            location: "Mt. Washington Auto Road",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
            description: "Quirky Mt. Washington Auto Road event celebrating \"first ascents\" in unusual ways; about 1–1.5 hours from Inn 32.",
            isFeatured: false
        }
    ],
    blogPosts: [
        {
            id: "1",
            title: "Top 5 Hiking Trails Near North Woodstock",
            excerpt: "Discover the breathtaking beauty of the White Mountains with our guide to the best local hiking trails for all skill levels.",
            date: "Oct 15, 2025",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200",
            author: "Sarah Jenkins",
            slug: "top-5-hiking-trails"
        },
        {
            id: "2",
            title: "A Season for Every Traveler: When to Visit",
            excerpt: "From vibrant fall foliage to snowy winter wonderlands, find out which season suits your travel style best.",
            date: "Sep 22, 2025",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200",
            author: "Inn 32 Team",
            slug: "best-time-to-visit"
        },
        {
            id: "3",
            title: "The Story Behind Our Renovation",
            excerpt: "Take a look inside the complete transformation of Inn 32, harmonizing modern comfort with our historic roots.",
            date: "Aug 10, 2025",
            image: "https://images.unsplash.com/photo-1556912172-45b7abe8d7e1?auto=format&fit=crop&q=80&w=1200",
            author: "Michael Ross",
            slug: "renovation-story"
        },
        {
            id: "4",
            title: "Local Eats: A Foodie's Guide to Lincoln & Woodstock",
            excerpt: "Explore the culinary delights of our town, from cozy cafes to gourmet dining experiences just steps from your room.",
            date: "Jul 05, 2025",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200",
            author: "Sarah Jenkins",
            slug: "local-food-guide"
        }
    ],
    socialPosts: [
        {
            id: "s1",
            image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800",
            caption: "Cozy vibes by the fire 🔥 #Inn32 #WhiteMountains #CozyGetaway",
            platform: "instagram",
            link: "https://instagram.com"
        },
        {
            id: "s2",
            image: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&q=80&w=800",
            caption: "Fresh powder day at Loon Mountain! 🎿 Who's ready to hit the slopes? #SkiNH #LoonMountain",
            platform: "instagram",
            link: "https://instagram.com"
        },
        {
            id: "s3",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
            caption: "Summer sunsets on the patio are unmatched. 🌅 #NHSummer #VacationMode",
            platform: "instagram",
            link: "https://instagram.com"
        },
        {
            id: "s4",
            image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=800",
            caption: "Breakfast is served! Local maple syrup is a must. 🥞🍁 #NHFoodie #BreakfastGoals",
            platform: "instagram",
            link: "https://instagram.com"
        },
        {
            id: "s5",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
            caption: "Fall foliage is peaking right now! 🍂 Don't miss the colors. #LeafPeeping #NHFall",
            platform: "instagram",
            link: "https://instagram.com"
        },
        {
            id: "s6",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
            caption: "Relax and unwind in our newly renovated suites. 🛌✨ #HotelDesign #Renovation",
            platform: "instagram",
            link: "https://instagram.com"
        }
    ],
    reviews: [
        {
            id: "r1",
            author: "Ryan",
            rating: 5,
            date: "June 2025",
            text: "Very welcoming staff, loved listening to the river, and we could walk to dinner and shops; we will be back.",
            source: "Expedia"
        },
        {
            id: "r2",
            author: "Amanda",
            rating: 5,
            date: "August 2025",
            text: "We loved the location close to dining, shopping, and the river to relax by, and the room was clean and welcoming just like the photos.",
            source: "Expedia"
        },
        {
            id: "r3",
            author: "Eric",
            rating: 5,
            date: "March 2025",
            text: "Staff is excellent and the manager, Sage, gave great recommendations for things to do; I would stay here again.",
            source: "Travelocity"
        },
        {
            id: "r4",
            author: "Tripadvisor Guest",
            rating: 5,
            date: "September 2025",
            text: "Top notch guest experience with excellent service and a very comfortable stay.",
            source: "TripAdvisor"
        },
        {
            id: "r5",
            author: "Tripadvisor Guest",
            rating: 5,
            date: "2025",
            text: "I loved my stay at Inn32; the room backed onto the forest so I could hear the river, and it was very comfortable, well equipped, and very clean.",
            source: "TripAdvisor"
        },
        {
            id: "r6",
            author: "Michael",
            rating: 5,
            date: "2025",
            text: "Inn 32 was everything I was looking for at an affordable price point and I would certainly recommend them and stay again.",
            source: "Expedia"
        },
        {
            id: "r7",
            author: "Tripadvisor Guest",
            rating: 5,
            date: "2025",
            text: "We found Inn 32 covered all our needs with a clean room, new bathroom and above-average linens, and the location let us walk to Woodstock Inn, shops, and Cascade Falls.",
            source: "TripAdvisor"
        },
        {
            id: "r8",
            author: "Tripadvisor Guest",
            rating: 5,
            date: "2025",
            text: "Our room was spotlessly clean and very quiet at night, and although the outside has an 'old motel' look, the interior had everything we needed.",
            source: "TripAdvisor"
        },
        {
            id: "r9",
            author: "Tripadvisor Guest",
            rating: 5,
            date: "2025",
            text: "Clean, budget-friendly and safe with easy check-in, easy parking right in front of the room, and a beautiful spot by the river; I would recommend and stay again.",
            source: "TripAdvisor"
        },
        {
            id: "r10",
            author: "Google Guest",
            rating: 5,
            date: "2025",
            text: "Cozy, budget-friendly rooms in a great riverfront location with easy access to local restaurants and White Mountains attractions.",
            source: "Google"
        }
    ],
    promotions: [],
    offers: [
        {
            id: "winter-escape",
            title: "Winter Wonderland Escape",
            description: "Save 20% on mid-week stays this winter. Includes complimentary hot cocoa and snowshoe rentals.",
            image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=800",
            validUntil: "Mar 31, 2026",
            promoCode: "WINTER20"
        },
        {
            id: "stay-longer",
            title: "Stay Longer, Save More",
            description: "Book 3 nights or more and receive 15% off your entire stay. Perfect for a long weekend getaway.",
            image: "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/1eba0066-9216-4b5b-8eb1-ee81cee8f5a4/Sunroom.jpg",
            minStay: 3,
            promoCode: "LONGSTAY15"
        },
        {
            id: "romantic-getaway",
            title: "Romantic Retreat Package",
            description: "Includes a bottle of wine, local chocolates, and late checkout at 1:00 PM.",
            image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800",
            promoCode: "ROMANCE"
        }
    ],
    gallery: [
        {
            id: "hero-cabin",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200",
            alt: "Cozy exterior view",
            category: "Exterior"
        },
        {
            id: "hotel-lobby",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
            alt: "Main Lobby",
            category: "Interior"
        },
        {
            id: "room-detail",
            url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
            alt: "Room Interior Detail",
            category: "Rooms"
        },
        // Adding more images for masonry layout
        {
            id: "woodstock-brewery",
            url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
            alt: "Local Brewery",
            category: "Surroundings"
        },
        {
            id: "flume-gorge",
            url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
            alt: "Flume Gorge",
            category: "Surroundings"
        },
        {
            id: "room-living",
            url: "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/0f3063bf-5bb4-44e5-97eb-16a8cbad558e/Living_Room_02.jpg",
            alt: "Apartment Living Area",
            category: "Rooms"
        }
    ]
}
