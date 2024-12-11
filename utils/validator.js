export const validateBody = (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
  
      if (result.error) {
        if (req.file) {
          const oldFilePath = path.join(__dirname, "..", req.file.path);
          deleteFile(oldFilePath);
        }
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  };