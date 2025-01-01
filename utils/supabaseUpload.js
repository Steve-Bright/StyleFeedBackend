import initializeSupabase from "../dbconnection/supbaseConnect.js";

const supabase = initializeSupabase();

export const uploadImageToSupabase = async (file, bucketName) => {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
  
    if (!file) {
      throw new Error("No file provided");
    }
  
    if (!bucketName) {
      throw new Error("Bucket name is required ");
    }
  
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
  
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });
  
      if (uploadError) {
        console.error(
          "Supabase upload error:",
          JSON.stringify(uploadError, null, 2)
        );
        throw new Error(`File upload failed: ${uploadError.message}`);
      }
  
      const { data: urlData, error: urlError } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
  
      if (urlError) {
        console.error(
          "Error getting public URL:",
          JSON.stringify(urlError, null, 2)
        );
        throw new Error("Failed to get public URL for uploaded file");
      }
  
      return urlData.publicUrl;
    } catch (error) {
      console.error(
        "Detailed Supabase upload error:",
        JSON.stringify(error, null, 2)
      );
      throw error;
    }
  };