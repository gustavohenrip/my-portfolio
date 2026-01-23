export interface TimelineEvent {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    image: string;
    color: string;
    stats?: { label: string; value: string }[];
}

export const timelineData: TimelineEvent[] = [
    {
        year: "1976",
        title: "The Garage Revolution",
        subtitle: "Where It All Began",
        description: "On April 1, 1976, Steve Jobs, Steve Wozniak, and Ronald Wayne founded Apple Computer Company in the Jobs family garage in Los Altos, California. With just $1,350 from selling Jobs' Volkswagen van and Wozniak's HP calculator, they started a revolution.",
        details: [
            "The Apple I was entirely hand-built by Wozniak",
            "Only 200 units were ever produced",
            "Sold for $666.66 at The Byte Shop",
            "Ronald Wayne sold his 10% stake for just $800"
        ],
        image: "images/timeline/1976_garage.png",
        color: "#6366f1",
        stats: [
            { label: "Initial Investment", value: "$1,350" },
            { label: "Apple I Price", value: "$666.66" },
            { label: "Units Sold", value: "200" }
        ]
    },
    {
        year: "1977",
        title: "Apple II: The People's Computer",
        subtitle: "Making Computing Personal",
        description: "The Apple II became one of the first successful mass-produced microcomputers. It was the first personal computer capable of displaying color graphics, and VisiCalc spreadsheet software made it indispensable for business.",
        details: [
            "First personal computer with color graphics",
            "VisiCalc became the 'killer app' that drove sales",
            "Produced for nearly 17 years (1977-1993)",
            "Over 6 million units sold in total"
        ],
        image: "images/timeline/1977_apple2.png",
        color: "#22c55e",
        stats: [
            { label: "Years in Production", value: "17" },
            { label: "Total Units Sold", value: "6M+" },
            { label: "Initial Price", value: "$1,298" }
        ]
    },
    {
        year: "1984",
        title: "Macintosh: Hello.",
        subtitle: "The Computer for the Rest of Us",
        description: "Introduced during a legendary Super Bowl commercial directed by Ridley Scott, the Macintosh brought the graphical user interface and mouse to mainstream consumers. It was a pivotal moment that defined what personal computing would become.",
        details: [
            "The '1984' ad cost $1.5 million and aired only once",
            "First commercially successful computer with GUI",
            "Steve Jobs personally unveiled it at the shareholders meeting",
            "Shipped with MacPaint and MacWrite"
        ],
        image: "images/timeline/1984_macintosh.png",
        color: "#f97316",
        stats: [
            { label: "Launch Price", value: "$2,495" },
            { label: "RAM", value: "128KB" },
            { label: "Display", value: "9-inch" }
        ]
    },
    {
        year: "1985",
        title: "The Exile",
        subtitle: "Steve Jobs Leaves Apple",
        description: "After a power struggle with CEO John Sculley, Steve Jobs was stripped of his managerial duties and left the company he co-founded. He went on to found NeXT Computer and acquire Pixar Animation Studios.",
        details: [
            "Jobs sold all but one of his Apple shares",
            "Founded NeXT Computer with $7 million",
            "Purchased Pixar from Lucasfilm for $5 million",
            "Apple would later acquire NeXT for $429 million"
        ],
        image: "images/timeline/1985_exile.png",
        color: "#ef4444",
        stats: [
            { label: "NeXT Investment", value: "$7M" },
            { label: "Pixar Purchase", value: "$5M" },
            { label: "Years Away", value: "12" }
        ]
    },
    {
        year: "1997",
        title: "The Return of the King",
        subtitle: "Think Different",
        description: "Apple acquired NeXT, bringing Steve Jobs back as interim CEO. The company was 90 days from bankruptcy. Jobs immediately killed 70% of products and launched the iconic 'Think Different' campaign, setting the stage for Apple's resurrection.",
        details: [
            "Apple was losing $1 billion per year",
            "Jobs secured $150 million investment from Microsoft",
            "Reduced product line from 350 to just 10",
            "Think Different campaign won Emmy Award"
        ],
        image: "images/timeline/1997_think_different.png",
        color: "#8b5cf6",
        stats: [
            { label: "Days from Bankruptcy", value: "90" },
            { label: "Microsoft Deal", value: "$150M" },
            { label: "Products Cut", value: "70%" }
        ]
    },
    {
        year: "1998",
        title: "iMac G3: Bondi Blue",
        subtitle: "Breaking All the Rules",
        description: "The translucent, Bondi Blue iMac G3 broke every convention of beige-box computing. It dropped the floppy drive, introduced USB as standard, and proved that computers could be both beautiful and accessible. It saved Apple.",
        details: [
            "Sold 800,000 units in first 5 months",
            "First Apple product with 'i' prefix (for internet)",
            "Designed by Jony Ive, beginning a legendary partnership",
            "Available in 13 different colors"
        ],
        image: "images/timeline/1998_imac_g3.png",
        color: "#0ea5e9",
        stats: [
            { label: "First 5 Months", value: "800K sold" },
            { label: "Colors Available", value: "13" },
            { label: "Launch Price", value: "$1,299" }
        ]
    },
    {
        year: "2001",
        title: "iPod: 1,000 Songs in Your Pocket",
        subtitle: "Reinventing Music",
        description: "The iPod, combined with iTunes, completely revolutionized the music industry. While not the first MP3 player, its intuitive scroll wheel, sleek design, and seamless ecosystem made it the defining music device of a generation.",
        details: [
            "First iPod held 5GB (about 1,000 songs)",
            "Click wheel became an iconic interface",
            "iTunes Store launched in 2003, selling songs for $0.99",
            "Over 450 million iPods sold in total"
        ],
        image: "images/timeline/2001_ipod.png",
        color: "#ec4899",
        stats: [
            { label: "Capacity", value: "1,000 songs" },
            { label: "Total Sold", value: "450M+" },
            { label: "Song Price", value: "$0.99" }
        ]
    },
    {
        year: "2007",
        title: "iPhone: This Changes Everything",
        subtitle: "The Device That Changed the World",
        description: "Steve Jobs introduced iPhone with the words: 'An iPod, a phone, and an internet communicator.' It combined multi-touch technology, a revolutionary mobile OS, and elegant design to create an entirely new product category that redefined modern life.",
        details: [
            "Jobs secretly developed it under 'Project Purple'",
            "Multi-touch was revolutionary at the time",
            "App Store launched in 2008 with 500 apps",
            "Over 2.3 billion iPhones sold to date"
        ],
        image: "images/timeline/2007_iphone.png",
        color: "#3b82f6",
        stats: [
            { label: "Launch Price", value: "$499" },
            { label: "Initial Apps", value: "500" },
            { label: "Total Sold", value: "2.3B+" }
        ]
    },
    {
        year: "2010",
        title: "iPad: A Magical Piece of Glass",
        subtitle: "Defining the Post-PC Era",
        description: "Critics called it a 'big iPhone,' but the iPad created the tablet market as we know it. Jobs called it 'the most personal device Apple has ever made' - a magical sheet of glass for consuming, creating, and connecting.",
        details: [
            "Sold 300,000 units on launch day",
            "Reached 1 million sales in just 28 days",
            "Faster adoption than iPhone or DVD players",
            "iPad Pro later rivaled laptop performance"
        ],
        image: "images/timeline/2010_ipad.png",
        color: "#6366f1",
        stats: [
            { label: "Launch Day Sales", value: "300K" },
            { label: "First Million", value: "28 days" },
            { label: "Launch Price", value: "$499" }
        ]
    },
    {
        year: "2011",
        title: "A Legend Passes",
        subtitle: "Tim Cook Takes the Helm",
        description: "On October 5, 2011, Steve Jobs passed away after a long battle with cancer. Tim Cook, Apple's operations wizard, became CEO. Under his leadership, Apple would become the world's first trillion-dollar company and continue to innovate.",
        details: [
            "Jobs introduced by Obama as 'symbol of American ingenuity'",
            "Apple stores worldwide became memorials",
            "Cook has doubled Apple's revenue since 2011",
            "Apple reached $3 trillion valuation in 2022"
        ],
        image: "images/timeline/2011_legacy.png",
        color: "#71717a",
        stats: [
            { label: "Jobs' Age", value: "56" },
            { label: "Apple Value 2011", value: "$350B" },
            { label: "Apple Value 2024", value: "$3T+" }
        ]
    },
    {
        year: "2015",
        title: "Apple Watch: Time Reimagined",
        subtitle: "The Most Personal Device Yet",
        description: "Apple Watch brought computing to the wrist, combining fitness tracking, notifications, and eventually life-saving health features. It became the world's best-selling watch and sparked a revolution in personal health technology.",
        details: [
            "First Apple product launched after Jobs' death",
            "Heart rate monitoring saved countless lives",
            "ECG feature approved by FDA",
            "Outsells the entire Swiss watch industry"
        ],
        image: "images/timeline/2015_watch.png",
        color: "#f43f5e",
        stats: [
            { label: "Annual Sales", value: "50M+" },
            { label: "Health Features", value: "12+" },
            { label: "Battery Life", value: "18hrs" }
        ]
    },
    {
        year: "2020",
        title: "Apple Silicon: M1",
        subtitle: "A New Era of Performance",
        description: "Apple announced the transition from Intel to its own custom-designed chips. Built on a 5-nanometer process with 16 billion transistors, M1 combined CPU, GPU, Neural Engine, and unified memory into a single SoC for dramatic gains in performance per watt.",
        details: [
            "First Mac chip built on 5-nanometer process",
            "16 billion transistors in a single SoC",
            "Unified memory architecture for high bandwidth",
            "8-core CPU with performance and efficiency cores"
        ],
        image: "https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-m1-chip-graphic_11102020_big.jpg.medium.jpg",
        color: "#f59e0b",
        stats: [
            { label: "Process", value: "5nm" },
            { label: "Transistors", value: "16B" },
            { label: "CPU", value: "8-core" }
        ]
    },
    {
        year: "2024",
        title: "Vision Pro: Spatial Computing",
        subtitle: "The Next Chapter Begins",
        description: "Apple Vision Pro introduced the era of spatial computing, blending digital content with the physical world. With micro-OLED displays delivering 23 million pixels and a new input model using eyes, hands, and voice, apps and memories live in the space around you.",
        details: [
            "Micro-OLED displays with 23 million pixels",
            "Eye, hand, and voice input model",
            "Spatial Audio that adapts to your room",
            "EyeSight reveals your eyes to others"
        ],
        image: "images/timeline/2024_vision_pro.png",
        color: "#a78bfa",
        stats: [
            { label: "Pixels", value: "23M" },
            { label: "Input", value: "Eyes + Hands + Voice" },
            { label: "Display", value: "micro-OLED" }
        ]
    }
];


