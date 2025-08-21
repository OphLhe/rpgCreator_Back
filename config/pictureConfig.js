import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


export const handleUploadPicture = (req) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const targetPath = path.join( __dirname , "../pictures", 
        req.file.originalname.split('.')[0] + path.extname(req.file.originalname));
        const extension = path.extname(req.file.originalname).toLowerCase();
        console.log(req.file.originalname);
        
        if (extension === ".png"
            || extension === ".jpg"
            || extension === ".jpeg"
            || extension === ".webp"
            || extension === ".gif") {
                fs.rename(req.file.path, targetPath, (err) => {
                    if(err){
                      console.error('Error while renaming file', err);
                    }
                });   
            };
}