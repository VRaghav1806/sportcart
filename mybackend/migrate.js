const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Configuration
const LOCAL_URI = 'mongodb://localhost:27017/sportscart';
// Expecting Atlas URI as the first command line argument
const ATLAS_URI = process.argv[2];

if (!ATLAS_URI) {
    console.error('❌ Error: Please provide your MongoDB Atlas URI as an argument.');
    console.error('Usage: node migrate.js <your_atlas_connection_string>');
    process.exit(1);
}

const migrate = async () => {
    try {
        // 1. Fetch from Local
        console.log('🔄 Connecting to Local MongoDB...');
        await mongoose.connect(LOCAL_URI);

        console.log('📥 Fetching products from local database...');
        const products = await Product.find({}, { _id: 0, __v: 0 }).lean(); // Exclude ID to let Atlas generate new ones or keep them if you want identical IDs (remove { _id: 0 } if you want to keep IDs)
        // Actually, keeping IDs is better for consistency if we want to update later, 
        // but for a clean migration, sometimes new IDs are safer. 
        // However, user might have relationships. Let's keep original IDs for now but handle duplicates.

        const productsToMigrate = await Product.find({}).lean();

        console.log(`✅ Found ${productsToMigrate.length} products locally.`);
        await mongoose.disconnect();
        console.log('🔌 Disconnected from Local DB.');

        if (productsToMigrate.length === 0) {
            console.log('⚠️ No products to migrate.');
            return;
        }

        // 2. Upload to Atlas
        console.log('\n🚀 Connecting to MongoDB Atlas...');
        await mongoose.connect(ATLAS_URI);

        console.log('📤 Uploading products to Atlas...');

        // Use upsert to avoid duplicates if running multiple times
        let successCount = 0;
        let errorCount = 0;

        for (const product of productsToMigrate) {
            try {
                // Delete _id to allow Mongo to generate a fresh one if there are conflicts, 
                // OR use replaceOne to overwrite.
                // Best approach for migration: Check if exists by name/slug or just InsertMany with ordered: false

                await Product.replaceOne(
                    { _id: product._id },
                    product,
                    { upsert: true }
                );
                successCount++;
            } catch (err) {
                console.error(`❌ Failed to upload ${product.name}:`, err.message);
                errorCount++;
            }
        }

        console.log(`\n✨ Migration Complete!`);
        console.log(`✅ Successfully migrated: ${successCount}`);
        if (errorCount > 0) console.log(`⚠️ Errors: ${errorCount}`);

    } catch (error) {
        console.error('🔥 Migration failed:', error);
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('👋 Connection closed.');
        }
    }
};

migrate();
