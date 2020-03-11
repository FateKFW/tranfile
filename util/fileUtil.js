const fs = require('fs')

class File{
    constructor(path,name,isFile){
        this.path = path;
        this.name = name;
        this.isFile = isFile;
    }

    toString(){
        return "{path:'"+this.path+"',name:'"+this.name+"',isFile:'"+this.isFile+"'}"
    }

    toJSONString(){
        return JSON.stringify(this)
    }
}

const file = (function(){
    let showFileList = (path)=>{
        //let fsList = new Set(),
        let fsList = new Array(),
            file,
            filePath = ""
        fs.readdirSync(path).forEach((item,idx)=>{
            filePath = path+"/"+item
            file = new File(filePath,item,fs.statSync(filePath).isFile())
            //fsList.add(file)
            fsList.push(file)
        })
        return fsList
    }

    return showFileList
})()

module.exports = file