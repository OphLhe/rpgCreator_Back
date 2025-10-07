import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import bdd from './config/db.js';
import userRoutes from './routes/user.routes.js';
import speciesRoutes from './routes/species.routes.js'
import genreRoutes from './routes/genre.routes.js'
import armourRoutes from './routes/armour.routes.js'
import spellsRoutes from './routes/spells.routes.js'
import propsRoutes from './routes/props.routes.js'
import weaponRoutes from './routes/weapon.routes.js'
import classRoutes from './routes/class.routes.js'
import skillsRoutes from './routes/skills.routes.js'
import abilityRoutes from './routes/ability.routes.js'
import classSkillsRoutes from './routes/classSkills.routes.js'
import npcRoutes from './routes/npc.routes.js'
import playerscharacterRoutes from './routes/playerscharacter.routes.js' 
import npcClassRoutes from './routes/npcClass.routes.js'
import playerscharClassRoutes from './routes/playerscharClass.routes.js'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//creation of application express 
const app = express();


// middleware 
app.use(cors()); 
app.use(express.json());

//using dotenv to load environment variables
dotenv.config();

// using routes
app.use('/api', 
    userRoutes, 
    speciesRoutes, 
    genreRoutes, 
    armourRoutes, 
    spellsRoutes, 
    propsRoutes, 
    weaponRoutes, 
    classRoutes,
    skillsRoutes,
    abilityRoutes,
    classSkillsRoutes, 
    npcRoutes, 
    playerscharacterRoutes, 
    npcClassRoutes, 
    playerscharClassRoutes
)

// starting the server on the specified port 
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    if(bdd){
        console.log('Database connection established');
    }
});

//multer configuration
// multer configuration to record files in the 'pictures' folder

const upload = multer({dest: './pictures/'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// POST routes to upload files
app.post('/pictures', upload.single('file'), (req, res) => {
    // getting the file
    const targetPath = path.join( __dirname , "./pictures", 
    req.file.originalname.split('.')[0] + path.extname(req.file.originalname));
    // cheching the file extension
    const extension = path.extname(req.file.originalname).toLowerCase();
    if (extension === ".png"
        || extension === ".jpg"
        || extension === ".jpeg"
        || extension === ".webp"
        || extension === ".gif") {
            fs.rename(req.file.path, targetPath, (err) => {
                if(err){
                    return res.status(500).json({message: 'Error while uploading file', err});
                }
                return res.status(200).json({message: 'File uploaded successfully'});
            });            
        };
});

// GET routes to retrieve files
app.get('/pictures/:name', (req, res) => {
    const fileName = req.params.name;
    return res.sendFile(path.join(__dirname, './pictures', fileName))
});

// DELETE routes to delete files
app.delete('/pictures/:name', (req, res) => {
    const fileName = req.params.name;
    fs.unlink(path.join(__dirname, './pictures' + fileName), (err) => {
        if(err){
            return res.status(500).json({message: 'Error while deleting file'});
        }
        return res.status(200).json({message: 'File deleted successfully'});
    });
});

// app export 
export default app;