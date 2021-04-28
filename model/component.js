/**
 * Has an ID 
 */
class Component{
    constructor(id){
        this._id = id;
    }

    //getter
    getId(){
        return this._id;
        
    }
    //Setter 
    setId(id){
        this._id = id;
    }
}