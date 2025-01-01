import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js"

dotenv.config();

const initializeSupabase = () => {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    const supabase = createClient(supabaseUrl, supabaseKey)
    const createBucketsIfNotExist = async () => {
        try {
          const bucketsToCreate = ["product_images"];
          for (const bucketName of bucketsToCreate) {
            const { data: buckets, error: listError } = await supabase.storage.listBuckets();
            if (listError) {
              console.error(`Error listing buckets: ${listError}`);
              return;
            }
    
            if (!buckets.some((bucket) => bucket.name === bucketName)) {
              const { data, error } = await supabase.storage.createBucket(
                bucketName,
                {
                  public: true, // Set to true if you want the bucket to be publicly accessible
                }
              );
              if (error) {
                console.error(`Error creating ${bucketName} bucket: ${error}`);
                console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
              } else {
                console.log(`${bucketName} bucket created successfully`);
              }
            } else {
              // console.log(`${bucketName} bucket already exists`);
            }
          }
        } catch (error) {
          console.error(`Unexpected error in createBucketsIfNotExist: ${error}`);
        }
      };
    
      createBucketsIfNotExist();
      console.log("Supabase client initialized:", !!supabase);

      return supabase;
}

export default initializeSupabase;

