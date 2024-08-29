import sys

file = input("Enter file name : ")
args = sys.argv[1:]

controller_content ="import "+file+"Model from \"../models/"+file+"Model.js\";\n\nexport const get"+file+" = async (req, res) => {\n\
    try {\n\
        let "+(file.lower())+" = await "+file+"Model.find();\n\
        res.json("+(file.lower())+");\n\
    }\n\
    catch(error) {\n\
        res.status(500).json({error : error.message})\n\
    }\n\
}"

router_content= "import express from \"express\";\n\
import {get"+file+"} from \"../controllers/"+file+"Controller.js\";\n\n\
const "+file+"Router = express.Router();\n\n\
"+file+"Router.get(\"/\", get"+file+");\n\n\
export default "+file+"Router;"

model_content = "import mongoose from \"mongoose\";\n\n\
const "+file+"Schema = new mongoose.Schema({ });\n\n\
const "+file+"Model = mongoose.model(\""+(file.lower())+"\", "+file+"Schema);\n\n\
export default "+file+"Model;"


for i, args in enumerate(args):
    if(args == "-c"):
        controller = open("./controllers/"+file+"Controller.js", 'w')
        print("Creating "+file+"Controller.js ...")
        controller.write(f'{controller_content}')
    if(args == "-r"):
        router = open("./routers/"+file+"Routers.js", 'w')
        print("Creating "+file+"Routers.js ...")
        router.write(f'{router_content}')
    if(args == "-m"):
        model = open("./models/"+file+"Model.js", 'w')
        print("Creating "+file+"Model.js ...")
        model.write(f'{model_content}')
