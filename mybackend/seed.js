const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sportscart';

const products = [
    // Basketball (10)
    { name: 'Premium Leather Basketball', description: 'Professional-grade leather basketball with superior grip.', price: 2499, category: 'Basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600', stock: 25, featured: true },
    { name: 'Indoor/Outdoor Composite Ball', description: 'Durable composite leather for all surfaces.', price: 1299, category: 'Basketball', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600', stock: 40, featured: false },
    { name: 'Pro Series Basketball Hoop', description: 'Adjustable height professional backboard system.', price: 15999, category: 'Basketball', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600', stock: 10, featured: true },
    { name: 'Training Cones Set', description: 'Set of 20 high-visibility training cones.', price: 599, category: 'Basketball', image: 'https://images.unsplash.com/photo-1628173432729-f9f30b91d22b?w=600', stock: 100, featured: false },
    { name: 'Basketball Jersey - Lakers', description: 'Authentic team jersey with breathable mesh.', price: 3499, category: 'Basketball', image: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?w=600', stock: 30, featured: false },
    { name: 'Air Flight Shoes', description: 'High-performance footwear with extra ankle support.', price: 8999, category: 'Basketball', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', stock: 15, featured: true },
    { name: 'Dribble Trainer Mitts', description: 'Improves ball handling and control.', price: 899, category: 'Basketball', image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600', stock: 20, featured: false },
    { name: 'Rebounder Net', description: 'Solo training system for shooting and passing.', price: 4599, category: 'Basketball', image: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=600', stock: 8, featured: false },
    { name: 'Basketball Shorts Pro', description: 'Moisture-wicking fabric for maximum mobility.', price: 1499, category: 'Basketball', image: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?w=600', stock: 50, featured: false },
    { name: 'Team Kit Bag', description: 'Extra large bag to carry all your basketball gear.', price: 2199, category: 'Basketball', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', stock: 12, featured: false },

    // Soccer/Football (10)
    { name: 'Elite Match Soccer Ball', description: 'FIFA-approved match ball for professional play.', price: 2999, category: 'Soccer', image: 'https://images.unsplash.com/photo-1614632537190-23e4b78ff0c3?w=600', stock: 30, featured: true },
    { name: 'Speed Pro Cleats', description: 'Lightweight cleats for explosive speed on firm ground.', price: 6499, category: 'Soccer', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600', stock: 20, featured: true },
    { name: 'Goalie Gloves Pro', description: 'Superior grip and shock absorption for goalkeepers.', price: 1899, category: 'Soccer', image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600', stock: 25, featured: false },
    { name: 'Training Agility Ladder', description: '15ft ladder for improving footwork and speed.', price: 799, category: 'Soccer', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600', stock: 45, featured: false },
    { name: 'Portable Soccer Goal', description: 'Easy setup pop-up goal for practice anywhere.', price: 2499, category: 'Soccer', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600', stock: 15, featured: false },
    { name: 'Shin Guards Elite', description: 'Hard shell protection with comfortable foam backing.', price: 699, category: 'Soccer', image: 'https://images.unsplash.com/photo-1558191053-859bb2957380?w=600', stock: 60, featured: false },
    { name: 'Compression Socks', description: 'Performance socks with arch support.', price: 499, category: 'Soccer', image: 'https://images.unsplash.com/photo-1582967702081-15b818312f02?w=600', stock: 100, featured: false },
    { name: 'Soccer Jersey - FC Elite', description: 'Official club home jersey.', price: 1999, category: 'Soccer', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600', stock: 35, featured: false },
    { name: 'Tactic Board', description: 'Magnetic dry-erase board for coaches.', price: 1299, category: 'Soccer', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600', stock: 10, featured: false },
    { name: 'Whistle Pro', description: 'Professional stainless steel whistle.', price: 299, category: 'Soccer', image: 'https://images.unsplash.com/photo-1563604085-78e718cc2749?w=600', stock: 80, featured: false },

    // Tennis (10)
    { name: 'Carbon Fiber Racket', description: 'Ultra-lightweight for maximum power and control.', price: 9999, category: 'Tennis', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600', stock: 15, featured: true },
    { name: 'Championship Tennis Balls', description: 'Pack of 12 pressurized balls.', price: 1499, category: 'Tennis', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600', stock: 50, featured: false },
    { name: 'Court Shoes Elite', description: 'Non-marking sole for hard court surfaces.', price: 4999, category: 'Tennis', image: 'https://images.unsplash.com/photo-1617083266333-5a5050febead?w=600', stock: 20, featured: true },
    { name: 'Tennis Bag 6-Racket', description: 'Thermal-lined bag to protect your rackets.', price: 3299, category: 'Tennis', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', stock: 12, featured: false },
    { name: 'Vibration Dampener', description: 'Reduces string vibration for better comfort.', price: 399, category: 'Tennis', image: 'https://images.unsplash.com/photo-1518314916301-73c13b105dbe?w=600', stock: 100, featured: false },
    { name: 'Overgrip Pack (3)', description: 'Absorbent and tacky feel for secure grip.', price: 599, category: 'Tennis', image: 'https://images.unsplash.com/photo-1562211516-724497e885d5?w=600', stock: 80, featured: false },
    { name: 'Tennis String Reel', description: 'High-durability polyester string.', price: 2999, category: 'Tennis', image: 'https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?w=600', stock: 10, featured: false },
    { name: 'Training Target Set', description: 'Cones and markers for court practice.', price: 1199, category: 'Tennis', image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1741e?w=600', stock: 30, featured: false },
    { name: 'Tennis Cap Pro', description: 'Quick-dry fabric to keep you cool.', price: 899, category: 'Tennis', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600', stock: 40, featured: false },
    { name: 'Wristbands (Pair)', description: 'Extra absorbent cotton wristbands.', price: 299, category: 'Tennis', image: 'https://images.unsplash.com/photo-1518314916301-73c13b105dbe?w=600', stock: 90, featured: false },

    // Running (10)
    { name: 'Cloud Runner Shoes', description: 'Maximum cushioning for long-distance runs.', price: 7999, category: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', stock: 40, featured: true },
    { name: 'Running GPS Watch', description: 'Track your pace, distance, and heart rate.', price: 12999, category: 'Running', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600', stock: 15, featured: true },
    { name: 'Hydration Belt', description: 'Includes two 250ml bottles and storage.', price: 1499, category: 'Running', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600', stock: 25, featured: false },
    { name: 'Reflective Vest', description: 'High visibility for night running.', price: 599, category: 'Running', image: 'https://images.unsplash.com/photo-1502758712723-5e74be88390b?w=600', stock: 50, featured: false },
    { name: 'Compression Sleeves', description: 'Reduces muscle fatigue during and after runs.', price: 899, category: 'Running', image: 'https://images.unsplash.com/photo-1518481612222-68bbe828eba1?w=600', stock: 30, featured: false },
    { name: 'Phone Armband', description: 'Touchscreen-compatible water-resistant sleeve.', price: 799, category: 'Running', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600', stock: 60, featured: false },
    { name: 'Anti-Blister Socks', description: 'Double-layer fabric to prevent friction.', price: 449, category: 'Running', image: 'https://images.unsplash.com/photo-1582967702081-15b818312f02?w=600', stock: 100, featured: false },
    { name: 'Running Cap', description: 'Lightweight and breathable mesh cap.', price: 699, category: 'Running', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600', stock: 45, featured: false },
    { name: 'Massage Foam Roller', description: 'High-density foam for muscle recovery.', price: 1199, category: 'Running', image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600', stock: 20, featured: false },
    { name: 'Race Number Belts', description: 'Easy attachment for competition bibs.', price: 399, category: 'Running', image: 'https://images.unsplash.com/photo-1500462859194-8176587c672a?w=600', stock: 50, featured: false },

    // Fitness/Training (10)
    { name: 'Adjustable Dumbbell Set', description: 'Replaces 15 sets of weights.', price: 18999, category: 'Fitness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', stock: 20, featured: true },
    { name: 'Latex Resistance Bands', description: 'Set of 5 levels for full body workout.', price: 999, category: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600', stock: 100, featured: false },
    { name: 'Kettlebell 12kg', description: 'Wide handle for comfortable grip.', price: 2499, category: 'Fitness', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?w=600', stock: 35, featured: false },
    { name: 'Yoga Mat Premium', description: 'Non-slip 6mm thick professional mat.', price: 1799, category: 'Fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', stock: 40, featured: false },
    { name: 'Jump Rope Pro', description: 'Adjustable speed rope for cardio.', price: 499, category: 'Fitness', image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600', stock: 75, featured: false },
    { name: 'Pull-Up Bar', description: 'Doorway mount with multiple grip positions.', price: 2199, category: 'Fitness', image: 'https://images.unsplash.com/photo-1598136490941-30d885318abd?w=600', stock: 15, featured: true },
    { name: 'Weight Bench', description: 'Adjustable incline/decline positions.', price: 7499, category: 'Fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', stock: 10, featured: false },
    { name: 'Workout Gloves', description: 'Padded palms for better grip and protection.', price: 699, category: 'Fitness', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600', stock: 50, featured: false },
    { name: 'Ab Roller Pro', description: 'Wide wheel for stability and core strength.', price: 899, category: 'Fitness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', stock: 25, featured: false },
    { name: 'Medicine Ball 5kg', description: 'Durable rubber bounce ball.', price: 1599, category: 'Fitness', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600', stock: 18, featured: false },

    // Apparel (10)
    { name: 'Tech Tee Performance', description: 'Moisture-wicking fabric for intense workouts.', price: 999, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600', stock: 50, featured: true },
    { name: 'Training Joggers', description: 'Athletic fit with zippered pockets.', price: 1799, category: 'Apparel', image: 'https://images.unsplash.com/photo-1552664110-ad6124b99d62?w=600', stock: 40, featured: false },
    { name: 'Sport Compression Shorts', description: 'Quick-dry base layer for support.', price: 699, category: 'Apparel', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600', stock: 60, featured: false },
    { name: 'Running Windbreaker', description: 'Water-resistant and packable jacket.', price: 3499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', stock: 15, featured: true },
    { name: 'Training Hoodie', description: 'Soft fleece lining for cold weather sport.', price: 2499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600', stock: 25, featured: false },
    { name: 'Snapback Sports Cap', description: 'Classic 6-panel embroidered design.', price: 1199, category: 'Apparel', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600', stock: 35, featured: false },
    { name: 'Ankle Socks Pack (6)', description: 'Cushioned sole for all-day comfort.', price: 599, category: 'Apparel', image: 'https://images.unsplash.com/photo-1582967702081-15b818312f02?w=600', stock: 100, featured: false },
    { name: 'Seamless Sports Bra', description: 'Medium support for gym and running.', price: 1499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=600', stock: 30, featured: false },
    { name: 'High-Waist Yoga Leggings', description: 'Squat-proof 4-way stretch fabric.', price: 2199, category: 'Apparel', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', stock: 45, featured: false },
    { name: 'Micro-Fiber Gym Towel', description: 'Super absorbent and fast-drying.', price: 499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600', stock: 50, featured: false },

    // Cricket (10)
    { name: 'English Willow Cricket Bat', description: 'Grade 1 willow for professional players.', price: 24999, category: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600', stock: 8, featured: true },
    { name: 'Leather Match Ball', description: 'Hand-stitched 4-piece leather ball.', price: 899, category: 'Cricket', image: 'https://images.unsplash.com/photo-1589131008106-7c376180d5ca?w=600', stock: 100, featured: false },
    { name: 'Cricket Batting Pads', description: 'Moulded protection with high-density foam.', price: 3499, category: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600', stock: 15, featured: false },
    { name: 'Batting Gloves Elite', description: 'Sheep leather palm for maximum comfort.', price: 1999, category: 'Cricket', image: 'https://images.unsplash.com/photo-1512711339732-f70bc551d7f6?w=600', stock: 20, featured: false },
    { name: 'Cricket Helmet Pro', description: 'Adjustable titanium grille for head protection.', price: 4999, category: 'Cricket', image: 'https://images.unsplash.com/photo-1510255476906-8809a7b9736c?w=600', stock: 12, featured: true },
    { name: 'Spike Cricket Shoes', description: 'Metal spikes for traction on grass.', price: 5499, category: 'Cricket', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', stock: 10, featured: false },
    { name: 'Cricket Wheelie Bag', description: 'Large capacity to fit full kit.', price: 4299, category: 'Cricket', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', stock: 10, featured: false },
    { name: 'Wicket Keeping Gloves', description: 'Classic design with suction grip.', price: 2799, category: 'Cricket', image: 'https://images.unsplash.com/photo-1512711339732-f70bc551d7f6?w=600', stock: 8, featured: false },
    { name: 'Cricket Thigh Guard', description: 'Lightweight dual-density foam protection.', price: 1199, category: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600', stock: 25, featured: false },
    { name: 'Grip Cone \u0026 Grips', description: 'Kit for easy bat grip replacement.', price: 499, category: 'Cricket', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600', stock: 40, featured: false },

    // Badminton (10)
    { name: 'Graphite Badminton Racket', description: 'High-tension graphite for powerful smashes.', price: 4499, category: 'Badminton', image: 'https://images.unsplash.com/photo-1626225916029-798889163e79?w=600', stock: 20, featured: true },
    { name: 'Feather Shuttlecocks (12)', description: 'Premium grade goose feather shuttles.', price: 1299, category: 'Badminton', image: 'https://images.unsplash.com/photo-1617415170366-239563c0aef4?w=600', stock: 50, featured: false },
    { name: 'Synthetic Shuttlecocks (6)', description: 'Durable nylon shuttles for practice.', price: 499, category: 'Badminton', image: 'https://images.unsplash.com/photo-1617414902699-28c05406085a?w=600', stock: 80, featured: false },
    { name: 'Professional Court Shoes', description: 'Excellent lateral support and grip.', price: 3999, category: 'Badminton', image: 'https://images.unsplash.com/photo-1617083266333-5a5050febead?w=600', stock: 15, featured: true },
    { name: 'Badminton Racket Bag', description: 'Compact bag for 2-3 rackets.', price: 1299, category: 'Badminton', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', stock: 25, featured: false },
    { name: 'Towel Grip Roll', description: 'Absorbent towel grip for sweaty palms.', price: 399, category: 'Badminton', image: 'https://images.unsplash.com/photo-1562211516-724497e885d5?w=600', stock: 60, featured: false },
    { name: 'Badminton Net Pro', description: 'Tournament standard regulation net.', price: 1799, category: 'Badminton', image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=600', stock: 10, featured: false },
    { name: 'Stringing Machine', description: 'Reliable string for high tension.', price: 899, category: 'Badminton', image: 'https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?w=600', stock: 40, featured: false },
    { name: 'Badminton Grip Tape', description: 'Self-adhesive comfortable grip tape.', price: 249, category: 'Badminton', image: 'https://images.unsplash.com/photo-1562211516-724497e885d5?w=600', stock: 100, featured: false },
    { name: 'Court Socks Pro', description: 'Thick cushioning to prevent foot slip.', price: 349, category: 'Badminton', image: 'https://images.unsplash.com/photo-1582967702081-15b818312f02?w=600', stock: 70, featured: false },

    // Accessories (10)
    { name: 'Sports Water Bottle 1L', description: 'BPA-free leak-proof water bottle.', price: 799, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523362628742-0c26012bc227?w=600', stock: 100, featured: true },
    { name: 'Digital Stopwatch', description: 'Precise timing for intervals and sprints.', price: 499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1524311854101-729938b8ca7d?w=600', stock: 40, featured: false },
    { name: 'Cooling Sport Towel', description: 'Instant cooling for intense sweat.', price: 349, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600', stock: 60, featured: false },
    { name: 'Earbuds Sport Fit', description: 'Wireless buds with secure over-ear hook.', price: 2999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', stock: 20, featured: true },
    { name: 'Duffel Training Bag', description: 'Waterproof bag with ventilated shoe compartment.', price: 2499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', stock: 15, featured: false },
    { name: 'Knee Support Sleeve', description: 'Elastic compression for joint stability.', price: 699, category: 'Accessories', image: 'https://images.unsplash.com/photo-1583454155160-032c25389650?w=600', stock: 50, featured: false },
    { name: 'Resistance Band Door Anchor', description: 'Expands home training possibilities.', price: 399, category: 'Accessories', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600', stock: 80, featured: false },
    { name: 'Hand Sanitizer Sport Spray', description: 'Travel-size gym hygiene must-have.', price: 199, category: 'Accessories', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600', stock: 150, featured: false },
    { name: 'Sports Sunglasses', description: 'Polarized lenses for outdoor activity.', price: 1799, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', stock: 25, featured: false },
    { name: 'First Aid Compact Kit', description: 'Basic sports injury essentials.', price: 1299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?w=600', stock: 20, featured: false }
];

// Accessories (10)
{ name: 'Sports Water Bottle 1L', description: 'BPA-free leak-proof water bottle.', price: 799, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523362628742-0c26012bc227?w=500', stock: 100, featured: true },
{ name: 'Digital Stopwatch', description: 'Precise timing for intervals and sprints.', price: 499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1524311854101-729938b8ca7d?w=500', stock: 40, featured: false },
{ name: 'Cooling Sport Towel', description: 'Instant cooling for intense sweat.', price: 349, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500', stock: 60, featured: false },
{ name: 'Earbuds Sport Fit', description: 'Wireless buds with secure over-ear hook.', price: 2999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', stock: 20, featured: true },
{ name: 'Duffel Training Bag', description: 'Waterproof bag with ventilated shoe compartment.', price: 2499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', stock: 15, featured: false },
{ name: 'Knee Support Sleeve', description: 'Elastic compression for joint stability.', price: 699, category: 'Accessories', image: 'https://images.unsplash.com/photo-1583454155160-032c25389650?w=500', stock: 50, featured: false },
{ name: 'Resistance Band Door Anchor', description: 'Expands home training possibilities.', price: 399, category: 'Accessories', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500', stock: 80, featured: false },
{ name: 'Hand Sanitizer Sport Spray', description: 'Travel-size gym hygiene must-have.', price: 199, category: 'Accessories', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500', stock: 150, featured: false },
{ name: 'Sports Sunglasses', description: 'Polarized lenses for outdoor activity.', price: 1799, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', stock: 25, featured: false },
{ name: 'First Aid Compact Kit', description: 'Basic sports injury essentials.', price: 1299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?w=500', stock: 20, featured: false }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} products`);

        // Display summary
        const categories = [...new Set(products.map(p => p.category))];
        console.log('\n📊 Product Summary:');
        for (const category of categories) {
            const count = products.filter(p => p.category === category).length;
            console.log(`   ${category}: ${count} products`);
        }

        console.log('\n✨ Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
