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
            id: "standard-single",
            name: "Standard Single Room",
            shortDescription: "A thoughtfully designed, compact space for solo travelers or couples.",
            basePrice: 79,
            currency: "USD",
            maxOccupancy: 2,
            bedType: "1 Full Bed",
            images: [
                "/gallery/Room9_Bed.webp",
                "/gallery/Room9_Bath.webp"
            ],
            amenities: ["Wi-Fi", "A/C", "Smart TV", "Mini Fridge"],
            available: true
        },
        {
            id: "standard-queen",
            name: "Standard Queen",
            shortDescription: "Perfect for couples or solo travelers, this cozy room features a plush queen-size bed.",
            basePrice: 89,
            currency: "USD",
            maxOccupancy: 2,
            bedType: "1 Queen Bed",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/df0d9ff8-9d6f-44c6-b2f3-7d82d2909bbd/Room10_Bed.jpg",
                "/gallery/bedroom-02.webp"
            ],
            amenities: ["Wi-Fi", "A/C", "Coffee Maker", "Smart TV"],
            available: true
        },
        {
            id: "riverside-queen",
            name: "Riverside Queen",
            shortDescription: "Enjoy soothing sights and sounds of the river with peaceful views.",
            basePrice: 99,
            currency: "USD",
            maxOccupancy: 2,
            bedType: "1 Queen Bed",
            images: [
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/07ddf86d-1f17-482b-bb5d-2f65c7039955/Room14_Bed.jpg",
                "/gallery/Room04_Bath.webp"
            ],
            amenities: ["River View", "Wi-Fi", "A/C", "Coffee Maker"],
            available: true
        },

        {
            id: "standard-family",
            name: "Standard Family Room",
            shortDescription: "Designed for small families, offering one queen bed and one full bed.",
            basePrice: 109,
            currency: "USD",
            maxOccupancy: 3,
            bedType: "1 Queen + 1 Full",
            images: [
                "/gallery/room03.webp",
                "/gallery/Room03_Bath.webp"
            ],
            amenities: ["Wi-Fi", "A/C", "Microwave", "Mini Fridge"],
            available: true
        },
        {
            id: "double-queen",
            name: "Double Queen",
            shortDescription: "Spacious room with two queen beds, perfect for families or groups.",
            basePrice: 119,
            currency: "USD",
            maxOccupancy: 4,
            bedType: "2 Queen Beds",
            images: [
                "/gallery/room04-1.webp",
                "https://images.squarespace-cdn.com/content/v1/67ffef3a58b5ce132a913b94/44a65b52-52ae-42ec-8b48-f8ec73d6a960/Room04_02.jpg",
                "/gallery/Room04_Bath.webp"
            ],
            amenities: ["Wi-Fi", "A/C", "Microwave", "Mini Fridge"],
            available: true
        },
        {
            id: "2-bed-apt",
            name: "Two-Bedroom Apartment",
            shortDescription: "Our most sought-after option with two bedrooms, private patio, and ample space.",
            basePrice: 149,
            currency: "USD",
            maxOccupancy: 6,
            bedType: "2 Queen + 2 Twin",
            images: [
                "/gallery/living-room-01--1-.webp",
                "/gallery/living-room-02.webp",
                "/gallery/Kitchen_01.webp",
                "/gallery/Dining_Room.webp",
                "/gallery/Detail_Couch.webp",
                "/gallery/Bedroom1.webp",
                "/gallery/Bedroom2.webp",
                "/gallery/bathroom.webp",
                "/gallery/Detail_Master.webp",
                "/gallery/Detail_Faucet.webp",
                "/gallery/Detail_Vanity.webp"
            ],
            amenities: ["Kitchenette", "Private Patio", "Living Area", "Wi-Fi"],
            available: true
        },
        {
            id: "4-bed-apt",
            name: "Four-Bedroom Apartment",
            shortDescription: "Expansive lodge apartment sleeping up to 8 guests across four separate rooms.",
            basePrice: 199,
            currency: "USD",
            maxOccupancy: 8,
            bedType: "1 King, 1 Queen, 1 Full, 1 Bunk",
            images: [
                "/gallery/Living_1.webp",
                "/gallery/Kitchen_1.webp",
                "/gallery/Kitchen_2.webp",
                "/gallery/Dining_2.webp",
                "/gallery/Game_Room.webp",
                "/gallery/Sunroom.webp",
                "/gallery/Bedroom_01.webp",
                "/gallery/Bedroom_02.webp",
                "/gallery/Bedroom_03.webp",
                "/gallery/Bedroom_04.webp",
                "/gallery/Bathroom_01a.webp",
                "/gallery/Bathroom_01b.webp",
                "/gallery/Bathroom_02.webp"
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
            description: "Iconic brewpub with 15+ beers on tap, full restaurant, and outdoor beer garden right in town.",
            image: "/gallery/Woodstock Inn Brewing.webp",
            link: "https://www.woodstockinnnh.com/"
        },
        {
            id: "base-camp-brewing",
            name: "Base Camp Brewing",
            category: "Food & Drink",
            description: "Local craft brewery and gathering place perfect for unwinding after a long day in the mountains.",
            image: "/gallery/basecamp_brewing.webp",
            link: "https://basecampbrewing.com/"
        },
        {
            id: "schilling-beer",
            name: "Schilling Beer Co.",
            category: "Food & Drink",
            description: "European-style beers with a taproom and scenic beer garden right on the river.",
            image: "/gallery/schilling beer co.webp",
            link: "https://schillingbeer.com/"
        },
        {
            id: "common-man",
            name: "The Common Man",
            category: "Food & Drink",
            description: "Classic New England comfort dishes like pot roast and Nantucket Pie in a cozy, rustic setting.",
            image: "/gallery/common man.webp",
            link: "https://www.thecman.com/"
        },
        // Hiking
        {
            id: "franconia-ridge",
            name: "Franconia Ridge",
            category: "Hiking",
            description: "One of the top White Mountain day hikes for huge views along a stunning alpine ridge; best for experienced hikers.",
            image: "/gallery/Franconia Ridge.webp",
            link: "https://www.alltrails.com/trail/us/new-hampshire/mount-lafayette-and-franconia-ridge-trail-loop"
        },
        {
            id: "mt-moosilauke",
            name: "Mount Moosilauke",
            category: "Hiking",
            description: "Major 4,000-footer with excellent sweeping summit views above the treeline.",
            image: "/gallery/Mount Moosilauke.webp",
            link: "https://www.alltrails.com/trail/us/new-hampshire/mount-moosilauke-via-gorge-brook-and-moosilauke-carriage-trail"
        },
        {
            id: "garfield-4000",
            name: "Mount Garfield & 4,000 Footers",
            category: "Hiking",
            description: "Praised as slightly easier big-view alternatives to Franconia Ridge with phenomenal panoramic vistas.",
            image: "/gallery/Mount Garfield.webp",
            link: "https://www.alltrails.com/trail/us/new-hampshire/mount-garfield-trail"
        },
        {
            id: "kancamagus-trails",
            name: "Kancamagus Highway Trails",
            category: "Hiking",
            description: "A mix of scenic riverside walks like Lincoln Woods, and longer backcountry routes.",
            image: "/gallery/kancamagus.webp",
            link: "https://www.kancamagushighway.com/hiking/"
        },
        // Attractions
        {
            id: "lost-river",
            name: "Lost River Gorge & Boulder Caves",
            category: "Attractions",
            description: "Signature natural attraction featuring a boardwalk through a gorgeous gorge, waterfalls, and family-friendly caves.",
            image: "/gallery/Lost River Gorge.webp",
            link: "https://lostrivergorge.com/"
        },
        {
            id: "ice-castles",
            name: "Ice Castles (Winter)",
            category: "Attractions",
            description: "Destination winter attraction in Lincoln with illuminated ice slides, caverns, and magical light walks.",
            image: "/gallery/ice castles.webp",
            link: "https://icecastles.com/new-hampshire/"
        },
        {
            id: "kancamagus-byway",
            name: "Kancamagus Scenic Byway",
            category: "Attractions",
            description: "Classic White Mountains drive offering breathtaking overlooks, trailheads, and river pull-offs.",
            image: "/gallery/kancamagus.webp",
            link: "https://www.kancamagushighway.com/"
        },
        {
            id: "cascade-park",
            name: "Cascade Park",
            category: "Attractions",
            description: "Small in-town river spot right in North Woodstock, perfect for wading, picnicking, and relaxing.",
            image: "/gallery/cascade_park.webp",
            link: "https://www.nhstateparks.org/find-parks-trails/franconia-notch-state-park"
        },
        {
            id: "hubbard-brook",
            name: "Hubbard Brook Experimental Forest",
            category: "Attractions",
            description: "Expansive forest research area offering quiet nature trails and interpretive access points.",
            image: "/gallery/hubbard brooke.webp",
            link: "https://hubbardbrook.org/"
        },
        {
            id: "clarks-bears",
            name: "Clark's Bears",
            category: "Attractions",
            description: "A nostalgic, family-friendly summer attraction featuring famous bear shows and an antique steam train ride.",
            image: "/gallery/clarks_bears.webp",
            link: "https://clarksbears.com/"
        },
        {
            id: "pemi-moose-tours",
            name: "Pemi Valley Moose Tours",
            category: "Attractions",
            description: "Guided evening tours departing from Lincoln to safely spot majestic New Hampshire moose in their natural habitat.",
            image: "/gallery/pemi_moose_tour.webp",
            link: "https://pemivalleymoosetours.com/"
        },
        {
            id: "loon-gondola",
            name: "Loon Mountain Gondola Summit",
            category: "Attractions",
            description: "Take a scenic gondola ride to the summit of Loon Mountain for expansive views, glacial caves, and mountaintop dining.",
            image: "/gallery/loon_gondola.webp",
            link: "https://www.loonmtn.com/summer-activities/gondola-skyride"
        },
        {
            id: "alpine-adventures",
            name: "Alpine Adventures",
            category: "Attractions",
            description: "Thrilling outdoor adventure park offering year-round ziplining, off-road tours, and an aerial obstacle course.",
            image: "/gallery/alpine_adventures.webp",
            link: "https://alpinezipline.com/"
        },
        {
            id: "cannon-tramway",
            name: "Cannon Mountain Aerial Tramway",
            category: "Attractions",
            description: "Ride to the summit of Cannon Mountain on this iconic cable car for striking views across multiple states and into Canada.",
            image: "/gallery/cannon_tramway.webp",
            link: "https://www.cannonmt.com/things-to-do/attractions/tram"
        },
        // Shopping
        {
            id: "kancamagus-collectibles",
            name: "Kancamagus Collectibles",
            category: "Shopping",
            description: "Small local museum and collectibles shop—a great quick stop on a rainy day to find unique souvenirs.",
            image: "/gallery/kancamagus collectables.webp",
            link: "https://www.facebook.com/kancamaguscollectibles/"
        },
        {
            id: "jeanette-fournier",
            name: "Jeanette Fournier Fine Art",
            category: "Shopping",
            description: "Elegant local art gallery located right in the Woodstock area showcasing regional talent.",
            image: "/gallery/fournier fine art.webp",
            link: "https://jfournierart.com/"
        },
        {
            id: "specialty-shops",
            name: "Local Village Shops",
            category: "Shopping",
            description: "Explore dozens of charming small specialty and gift shops lining the streets of Woodstock and Lincoln.",
            image: "/gallery/village_shops.webp"
        },
        // Seasonal Activities
        {
            id: "winter-activities",
            name: "Winter Sports & Festivals",
            category: "Seasonal Activities",
            description: "Explore the Ice Castles, hit the slopes at nearby ski areas, and enjoy regional winter festivals.",
            image: "/gallery/winter_festival.webp"
        },
        {
            id: "spring-activities",
            name: "Spring Maple & Hiking",
            category: "Seasonal Activities",
            description: "Visit local sugarhouses during March Maple Month and hit the hiking trails as the snow melts out.",
            image: "/gallery/spring maple.webp",
            link: "https://nhmapleproducers.com/"
        },
    ],
    events: [
        {
            id: "brewery-music",
            title: "Woodstock Inn Brewery Live Music Nights",
            date: "Ongoing",
            location: "North Woodstock, NH",
            image: "/gallery/live_music_pub.webp",
            description: "Regular live bands and solo acts in the pub a short walk from Inn 32; check their calendar for multiple March 2026 shows such as Mitch Alden, Dan Parkhurst, and Blue Matter.",
            isFeatured: true,
            customLabel: "Staff Pick"
        },
        {
            id: "lincoln-events",
            title: "Lincoln / Franconia Notch Event Series",
            date: "Winter - Spring 2026",
            location: "Lincoln, NH",
            image: "/gallery/pub_band.webp",
            description: "Regional calendar lists \"Live Music – Woodstock Inn Brewery\" Saturdays through March 28, plus other Franconia Notch-area happenings like guided outings and community events typically within a 15–25 minute drive.",
            isFeatured: false
        },

        {
            id: "maple-month",
            title: "Maple Month in the White Mountains",
            date: "March 2026",
            location: "White Mountains, NH",
            image: "/gallery/maple month mountains.webp",
            description: "March is Maple Month across the region: sugarhouses open for tours, tastings, and demonstrations, with several producers located within an easy drive of North Woodstock.",
            isFeatured: true,
            customLabel: "Local Tradition"
        },
        {
            id: "bretton-woods-beach-party",
            title: "Beach Party on the Slopes",
            date: "Early March 2026",
            location: "Bretton Woods, NH",
            image: "/gallery/beach party slopes.webp",
            description: "Spring-ski party at Bretton Woods with live music and on-snow games, roughly 45–60 minutes from Inn 32.",
            isFeatured: false
        },
        {
            id: "spring-skiing-family",
            title: "Spring Skiing & Family Fun Week",
            date: "Mid-March 2026",
            location: "Bretton Woods, NH",
            image: "/gallery/spring_skiing_stock.webp",
            description: "Multi-day spring event at a White Mountains ski area with kids’ races, costume days, and family activities.",
            isFeatured: false
        },
        {
            id: "maple-sugar-tours",
            title: "Annual Maple Sugar Tours",
            date: "Late March 2026",
            location: "White Mountains, NH",
            image: "/gallery/annual maple sugar tours.webp",
            description: "Organized maple tours in the White Mountains, showcasing the sugaring process and offering samples; good as a half-day outing from North Woodstock.",
            isFeatured: false
        },
        {
            id: "psychic-fair",
            title: "Psychic Fair Weekend",
            date: "April 24–25, 2026",
            location: "Indian Head Resort, Lincoln",
            image: "/gallery/psychich fair.webp",
            description: "Themed weekend with psychic fair at Indian Head Resort just south of Lincoln, a short drive from Inn 32.",
            isFeatured: false
        },
        {
            id: "girlfriends-weekend",
            title: "2026 Girlfriends Weekend Spring Fling",
            date: "May 1–3, 2026",
            location: "North Conway, NH",
            image: "/gallery/2026 girlfriends weekend spring fling.webp",
            description: "Themed weekend package at White Mountain Hotel & Resort with artisan fair, spa options, dinner, entertainment, yoga, and brunch.",
            isFeatured: false
        },
        {
            id: "alton-weagle",
            title: "Alton Weagle Day",
            date: "May 23, 2026",
            location: "Mt. Washington Auto Road",
            image: "/gallery/alton_weagle_day.webp",
            description: "Quirky Mt. Washington Auto Road event celebrating \"first ascents\" in unusual ways; about 1–1.5 hours from Inn 32.",
            isFeatured: false
        }
    ],
    blogPosts: [
        {
            id: "1",
            title: "Maple Month Magic in the White Mountains",
            excerpt: "Discover the sweet tradition of New Hampshire's Maple Month. We guide you through the best local sugarhouses and tasting tours near Inn 32.",
            date: "Mar 10, 2025",
            image: "/gallery/spring maple.webp",
            author: "Inn 32 Team",
            slug: "maple-month-magic",
            content: "March in the White Mountains signals the arrival of one of New England's sweetest traditions: Maple Month. As the days grow warmer and the nights remain freezing, the sap begins to flow in the sugar maples that dot our landscape. Here at Inn 32, we love pointing guests toward local sugarhouses where you can experience the magic firsthand.\n\nJust a short drive from North Woodstock, family-owned farms open their doors to visitors. You'll smell the wood smoke before you even pull into the driveway. Inside, you can watch sap boiling down into thick, amber syrup. Most sugarhouses offer free tours, explaining the rich history of tapping trees—a practice that dates back centuries.\n\nDon't leave without trying maple sugar candy, maple cream, or even a 'sugar on snow' treat if the weather permits. It's the perfect mid-day excursion before heading back to relax by the fire pit at the Inn."
        },
        {
            id: "2",
            title: "Spring Hiking Guide: Mud Season Survival",
            excerpt: "Spring in the White Mountains is uniquely beautiful and challenging. Learn how to navigate 'mud season' and which lower-elevation trails offer the best early-season payoffs.",
            date: "Apr 15, 2025",
            image: "/gallery/blog_hiking.webp",
            author: "Inn 32 Team",
            slug: "spring-hiking-guide",
            content: "Spring brings a rush of energy to the White Mountains as the snowpack melts and waterfalls roar back to life. However, locals know this time of year by another name: mud season. High-elevation trails are often fragile and dangerous due to lingering ice and deep mud, so early spring is the time to explore lower elevations.\n\nWe recommend sticking to trails below 3,000 feet. The Lincoln Woods Trail is a fantastic, flat walk along the Pemigewasset River that's usually clear early in the season. Another great option is the flume gorge area, where the rushing runoff makes for spectacular waterfall viewing.\n\nRemember to wear waterproof boots, stay on the center of the trail to avoid widening the muddy path, and always check trail conditions with the local ranger station before heading out. After a brisk spring hike, Inn 32's comfortable rooms are waiting to warm you up."
        },
        {
            id: "3",
            title: "Welcoming Summer: Ziplining and Aerial Adventures",
            excerpt: "As the weather warms up, it's time to take to the skies! A spotlight on Alpine Adventures and the thrill of ziplining through the dense mountain canopy.",
            date: "May 20, 2025",
            image: "/gallery/alpine_adventures.webp",
            author: "Inn 32 Team",
            slug: "summer-ziplining-adventures",
            content: "If you're looking for an adrenaline rush right here in town, look no further than Alpine Adventures. Located just down the road from Inn 32, this is the premier destination for soaring above the White Mountain canopy.\n\nTheir zipline tours are legendary, offering breathtaking views of the Franconia Notch that you simply can't get from the ground. Whether you're a seasoned thrill-seeker or trying it for the first time, their expert guides ensure a safe and exhilarating experience.\n\nBeyond ziplining, they also offer off-road safari tours in massive 6-wheel drive Pinzgauers, taking you up steep, rugged terrain to the top of Barron Mountain. It's the perfect way to kick off the summer season with an unforgettable adventure."
        },
        {
            id: "4",
            title: "Pemi Valley Moose Tours: A Majestic Evening",
            excerpt: "One of the most unforgettable experiences in the region is spotting a wild moose. Join us as we recount an evening tour into the heart of moose country.",
            date: "Jun 12, 2025",
            image: "/gallery/pemi_moose_tour.webp",
            author: "Inn 32 Team",
            slug: "pemi-valley-moose-tours",
            content: "Seeing a wild moose in its natural habitat is an iconic New Hampshire experience, but finding these elusive giants on your own can be tricky. That's why we always recommend booking an evening excursion with Pemi Valley Moose Tours.\n\nThe tours run during the summer months when moose are most active, especially at dusk. You'll board a comfortable, specially equipped bus and head north into the deep woods near the Franconia Notch and beyond. The guides are incredibly knowledgeable, sharing local history, wildlife facts, and a few tall tales along the way.\n\nWhen the spotlight finally catches that massive silhouette emerging from the treeline, it's a moment you won't forget. Remember to bring your camera, a light jacket, and a sense of wonder!"
        },
        {
            id: "5",
            title: "Beat the Heat: Kayaking and River Wading",
            excerpt: "Summer is in full swing. Dive into the best spots for a refreshing dip, from the relaxing shallows of Cascade Park to kayaking on pristine mountain lakes.",
            date: "Jul 08, 2025",
            image: "/gallery/group_kayaking.webp",
            author: "Inn 32 Team",
            slug: "beat-the-heat-kayaking",
            content: "When the July heat hits, the White Mountains offer plenty of ways to cool off. Right in our backyard in North Woodstock is Cascade Park, a hidden gem sitting right on the Pemigewasset River. Here, you'll find smooth rocks, small cascading waterfalls, and crystal-clear pools perfect for wading or setting up a chair right in the shallows.\n\nIf you're looking to get out on the water, kayaking is a must. Echo Lake in Franconia Notch State Park provides stunning views of Cannon Mountain from the calmness of the water. You can rent paddleboards or kayaks right at the beach.\n\nWhether you're floating down the Pemi or simply dipping your toes in a mountain stream after a long hike, the pristine waters of our region are the perfect antidote to the summer sun."
        },
        {
            id: "6",
            title: "Family Fun at Clark's Bears and Lost River",
            excerpt: "August is peak family vacation time. Read our itinerary for an action-packed weekend featuring the famous Clark's Bears and the boardwalks of Lost River Gorge.",
            date: "Aug 05, 2025",
            image: "/gallery/clarks_bears.webp",
            author: "Inn 32 Team",
            slug: "family-fun-clarks-bears",
            content: "August is the traditional month for final summer family getaways, and Lincoln/Woodstock is built for family fun. No trip is complete without a visit to Clark's Bears. This beloved roadside attraction has been going strong for nearly 100 years. Watch the famous trained black bear show, ride the White Mountain Central Railroad into Wolfman's territory, and enjoy the water-blaster bumper boats.\n\nJust a few miles away is another must-see: Lost River Gorge & Boulder Caves. Kids and adults alike will love exploring the boardwalks that wind through the gorge and scrambling through the glacially formed boulder caves like the 'Lemon Squeezer'.\n\nBoth of these iconic attractions are quintessentially New Hampshire, providing memories that families have been making for generations."
        },
        {
            id: "7",
            title: "Local Pints: A Guide to Woodstock's Craft Breweries",
            excerpt: "After a long day of exploring, nothing beats a cold craft beer. We review local favorites, including the Woodstock Inn Brewery and the scenic Schilling Beer Co.",
            date: "Sep 15, 2025",
            image: "/gallery/live_music_pub.webp",
            author: "Inn 32 Team",
            slug: "local-craft-breweries",
            content: "The craft beer scene in the White Mountains has exploded in recent years, and Inn 32 is perfectly positioned to serve as your 'basecamp' for tasting them. Just a short walk down Main Street is the famous Woodstock Inn Brewery. With over a dozen beers on tap, ranging from their classic Pig's Ear Brown Ale to seasonal IPAs, it's a bustling spot with fantastic pub food and live music.\n\nIf you're willing to take a scenic 25-minute drive north to Littleton, Schilling Beer Co. is a revelation. Situated in a converted 18th-century grist mill right on the Ammonoosuc River, they specialize in European-inspired lagers and ales. Their wood-fired pizzas are the perfect pairing for a crisp pilsner on their riverside deck.\n\nWhether you are a casual fan or a serious beer enthusiast, our local breweries offer something truly special."
        },
        {
            id: "8",
            title: "Chasing Colors: The Ultimate Fall Foliage Drive",
            excerpt: "The White Mountains transform into a sea of red, orange, and gold. Join us for a scenic drive down the Kancamagus Highway during peak leaf-peeping season.",
            date: "Oct 01, 2025",
            image: "/gallery/blog_fall_drive.webp",
            author: "Inn 32 Team",
            slug: "fall-foliage-drive",
            content: "There's a reason people travel from all over the world to see autumn in the White Mountains. The explosion of color—vibrant reds, deep oranges, and golden yellows—is nothing short of spectacular. And the best way to experience it is by driving the Kancamagus Highway (Route 112).\n\nStarting right here in Woodstock, the 'Kanc' stretches for 34 miles to Conway without a single gas station or restaurant in sight. It's pure, uninterrupted wilderness. We recommend packing a picnic lunch at a local North Woodstock cafe and hitting the road early in the morning before the crowds.\n\nTake your time pulling over at the scenic overlooks. The Sabbaday Falls and Rocky Gorge stops are essential. Don't forget to have your camera ready, as the way the morning light hits the foliage is truly mesmerizing."
        },
        {
            id: "9",
            title: "Cozying Up: The Story Behind Our Renovation",
            excerpt: "As the crisp November air sets in, we reflect on the complete transformation of Inn 32. Take a look inside how we harmonized modern comfort with historic roots.",
            date: "Nov 05, 2025",
            image: "/gallery/blog_renovation.webp",
            author: "Inn 32 Team",
            slug: "story-behind-inn-32-renovation",
            content: "November brings a quiet chill to the air, making it the perfect time to hunker down and reflect. This month, we're looking back at the journey of renovating Inn 32. Our goal from day one was to create a space that offered premium, modern comforts while still honoring the rugged, historic charm of the White Mountains.\n\nWe completely redesigned our rooms to feature clean, minimalist aesthetics layered with warm, natural textures—think rich woods, luxury bedding, and modern bathroom fixtures. We wanted to provide a sanctuary where guests could truly decompress after a long day of skiing or hiking.\n\nBut a hotel is more than just rooms. Our communal spaces, like the fire pit area, were intentionally built to foster connection. We wanted to build a modern basecamp, and looking at the feedback from our incredible guests over the past year, we're so proud of what Inn 32 has become."
        },
        {
            id: "10",
            title: "Winter Wonderlands: The Lincoln Ice Castles",
            excerpt: "Step into a fairy tale this winter. We explore the mesmerizing, illuminated pathways of the famous Ice Castles just minutes from our door.",
            date: "Dec 18, 2025",
            image: "/gallery/winter_festival.webp",
            author: "Inn 32 Team",
            slug: "lincoln-ice-castles",
            content: "When winter arrives, Lincoln undergoes a magical transformation thanks to the famous Ice Castles. Built entirely by hand using hundreds of thousands of icicles, this award-winning attraction is an absolute must-see during the snowy months.\n\nWalking through the towering, glacial-like structures feels like stepping into another world. The experience is incredibly immersive, featuring ice-carved tunnels, fountains, and slides that kids (and adults) love to race down. If you visit in the evening, you're in for a treat: the entire castle is illuminated with color-changing LEDs synchronized to music.\n\nBecause the Ice Castles are located just a few minutes from Inn 32, it's an easy add-on to your evening itinerary. Just remember to book your tickets well in advance, as they sell out very quickly, and dress warmly!"
        },
        {
            id: "11",
            title: "Hitting the Slopes: Skiing Cannon and Loon",
            excerpt: "The snow is falling, and the mountains are calling. A breakdown of the varied terrain, stunning views, and fresh powder at Cannon Mountain and Loon Mountain Resort.",
            date: "Jan 10, 2026",
            image: "/gallery/group_skiing.webp",
            author: "Inn 32 Team",
            slug: "skiing-cannon-and-loon",
            content: "January means one thing in North Woodstock: prime ski season. Inn 32 is strategically located right between two of the best resorts in the East: Loon Mountain and Cannon Mountain.\n\nLoon Mountain, just a 5-minute drive away, is known for its excellent grooming, massive terrain parks, and the state-of-the-art Kancamagus 8 chairlift. It's incredibly family-friendly while still offering challenging runs on South Peak.\n\nIf you prefer old-school, rugged skiing with unparalleled views, head 10 minutes north through Franconia Notch to Cannon Mountain. It's home to the highest ski area summit in NH and boasts challenging steeps that will test even expert skiers. No matter which mountain you choose, returning to a warm room at Inn 32 makes for the perfect end to a powder day."
        },
        {
            id: "12",
            title: "A Winter Getaway: Dining and Relaxing in the Mountains",
            excerpt: "Embrace the chill. February is the perfect time for a romantic or cozy group getaway, complete with fine local dining at The Common Man and evening fire pits at Inn 32.",
            date: "Feb 14, 2026",
            image: "/gallery/blog_food.webp",
            author: "Inn 32 Team",
            slug: "winter-getaway-dining",
            content: "Sometimes the best mountain vacation doesn't involve breaking a sweat. February's deep freeze is the ideal excuse to slow down, indulge, and enjoy a cozy, relaxing getaway. The Lincoln/Woodstock area is packed with excellent dining options for those nights you just want to treat yourself.\n\nThe Common Man, situated in a historic mill building right in Lincoln, is a staple and a fantastic dining experience offering hearty New England comfort food by a roaring fireplace. After dinner, there's no need to rush. Head back to Inn 32, grab a blanket, and settle into the Adirondack chairs around our outdoor fire pits.\n\nIt's quiet under the stars, even in the middle of winter. Whether you're here with a partner or a group of friends, taking the time to simply enjoy the mountain air with good company is what a winter getaway is all about."
        }
    ],
    socialPosts: [
        {
            id: "s1",
            image: "/gallery/pool-firepit-night-.webp",
            caption: "Cozy vibes by the fire 🔥 #Inn32 #WhiteMountains #CozyGetaway",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
        },
        {
            id: "s2",
            image: "/gallery/front-view.webp",
            caption: "Welcome to Inn 32! 🏔️ Your basecamp for all-season mountain fun. #SkiNH #LoonMountain",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
        },
        {
            id: "s3",
            image: "/gallery/river-entry.webp",
            caption: "Summer sunsets on the patio are unmatched. 🌅 #NHSummer #VacationMode",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
        },
        {
            id: "s4",
            image: "/gallery/Dining_Room.webp",
            caption: "Gather around for a perfect evening. 🍷 #NHFoodie #DinnerGoals",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
        },
        {
            id: "s5",
            image: "/gallery/hotel.webp",
            caption: "Fall foliage is peaking right now! 🍂 Don't miss the colors. #LeafPeeping #NHFall",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
        },
        {
            id: "s6",
            image: "/gallery/living-room-01--1-.webp",
            caption: "Relax and unwind in our newly renovated suites. 🛌✨ #HotelDesign #Renovation",
            platform: "instagram",
            link: "https://instagram.com/inn32nh"
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
            id: "front-view",
            url: "/gallery/front-view.webp",
            alt: "Inn 32 Front Exterior View",
            category: "Exterior"
        },
        {
            id: "river-entry",
            url: "/gallery/river-entry.webp",
            alt: "River Entry Area",
            category: "Exterior"
        },
        {
            id: "pool-firepit",
            url: "/gallery/pool-firepit-night-.webp",
            alt: "Evening Firepit Area",
            category: "Exterior"
        },
        {
            id: "living-room-01",
            url: "/gallery/living-room-01--1-.webp",
            alt: "Apartment Living Room",
            category: "Interior"
        },
        {
            id: "sunroom",
            url: "/gallery/sunroom.webp",
            alt: "Bright Sunroom Area",
            category: "Interior"
        },
        {
            id: "dining",
            url: "/gallery/dining-1--1-.webp",
            alt: "Dining Area setup",
            category: "Interior"
        },
        {
            id: "kitchen",
            url: "/gallery/kitchen-1--1-.webp",
            alt: "Full Kitchen Area",
            category: "Interior"
        },
        {
            id: "bedroom-01",
            url: "/gallery/bedroom.webp",
            alt: "Cozy Bedroom setup",
            category: "Rooms"
        },
        {
            id: "room03",
            url: "/gallery/room03.webp",
            alt: "Room 3 Interior",
            category: "Rooms"
        },
        {
            id: "room04",
            url: "/gallery/room04-1.webp",
            alt: "Room 4 Layout",
            category: "Rooms"
        },
        {
            id: "room02-02",
            url: "/gallery/room02-02--2-.webp",
            alt: "Room 2 Alternate Layout",
            category: "Rooms"
        },
        {
            id: "room14-bed",
            url: "/gallery/room14-bed.webp",
            alt: "Room 14 Bed Detail",
            category: "Rooms"
        },
        {
            id: "bathroom-general",
            url: "/gallery/bathroom.webp",
            alt: "Newly Renovated Bathroom",
            category: "Interior"
        },
        {
            id: "hotel-exterior",
            url: "/gallery/hotel.webp",
            alt: "Inn 32 Exterior Details",
            category: "Exterior"
        }
    ]
}
