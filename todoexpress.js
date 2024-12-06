    const fs = require('fs');
    const path = require('path');
    const express = require('express');
    const { error } = require('console');
    const app = express();
    app.use(express.json());

    const todosFilePath = path.join(__dirname, 'todo.json');
    const loadtodos = ()=> {
        try{
        
    const data =  fs.readFileSync(todosFilePath,'utf8');
        return JSON.parse(data);
        }catch (err)
        {
            console.error('error found',err)
            return [];
        }
    }
    const save_todo = (todos)=>{
        
        try{
                fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
        }catch(err){
            console.error("error found",err);
        }
    }



        app.get('/gettodos',(req,res)=>{
        const todos = loadtodos();
        res.json(todos)
    })
    
    app.get('/todos.json',(req,res)=>{
       
       
        const filepath = '/home/kratos/backend/todo.json';
        fs.readFile(filepath,'utf8',(err,data)=>{
            if(err){
                console.log("error appered",err)
            }else{
            console.log("data:",data)
            res.send(data)
            }
        })
        })
    
    


    app.get('/',(req,res)=>{
        const folderPath = '/home/kratos/backend'; 

        fs.readdir(folderPath, (err, files) => {
            if (err) {
            
            console.log('Error reading folder:', err);
            return;
            }
            
        
            console.log('Files in folder:', files);

        res.json({
            message1: "This site is made for file management.",
            message2: "Enter the first route in the URL as your folder name.",
            message3: "Enter the second route as your file to see the content.",
            filesINfolder :files    
        });
        })
        })      
    app.get('/:foldername',(req,res)=>{
    const foldername = req.params.foldername;
    const folderpath = path.join(__dirname,foldername)

    if(fs.existsSync(folderpath)){
        console.log('folder exist',folderpath)
        
    }else{
        res.status(404).send({ error: `Folder "${foldername}" not found.` });
    }


        fs.readdir(folderpath,(err,files)=>{
            if(err){
                console.log("error appered",err)
                return;
            }   
            console.log(`the files contains "${files.length}" item`)
            console.log("item", files)
            res.json(files)
        })
        
    })

    app.get('/:foldername/:filename',(req,res)=>{
    const foldername  = req.params.foldername
    const filename  = req.params.filename
    const filepath = path.join(__dirname,foldername,filename)
    fs.readFile(filepath,'utf8',(err,data)=>{
        if(err){
            console.log("error appered",err)
        }else{
        console.log("data:",data)
        res.send(data)
        }
    })
    })



    app.post('/todos',(req,res)=>{
        const todos = loadtodos();
        const {des , status = 'pending' } = req.body
        
        const newtodo = 
        {
            id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
            des,
            status
        }
        todos.push(newtodo)
        save_todo(todos);

        res.status(201).json(newtodo)
    })

    app.delete('/todos/:id',(req,res)=>{
        let todos = loadtodos();  
    const deleteID = parseInt(req.params.id)

    for (let i = 0; i < todos.length; i++) {
            if(todos[i].id == deleteID){
                todos.splice(i,1)
                save_todo(todos);
            return res.status(200).json({ message: `Todo with ID ${deleteID} deleted successfully.`
            });
            }
        
    }
    })



    app.listen(3000,()=>{
        console.log('done')
    })