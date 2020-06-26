class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    plus(vector){
        let newX = this.x + vector.x;
        let newY = this.y + vector.y;
        return  new Vec(newX, newY);
    }

    minus(vector){
        let newX = this.x - vector.x;
        let newY = this.y - vector.y;
        return new Vec(newX, newY);
    }

    get length(){
        return (Math.hypot(this.x, this.y));
    }
}

class Group {
    constructor(...values){
        this.values = values;
        this.length = this.values.length;
        
    }

    add(newValue){
        if(!this.has(newValue)){
            this.values.push(newValue);
        }else{
            return 'Already a member';
        }
        
    }

    delete(value){
        if(this.has(value)){
            let index = this.values.indexOf(value);
            if(index > -1){
                this.values.splice(index, 1);
            }
        }
    }

    has(value){
        for(let element of this.values){
            if(value === element){
                return true;
            }
            return false;
        }
    }

    static from (object){
        let group = new Group();
        for(let item of object){
            group.add(item);
        }
        
        return group;
    }



    
}

class GroupIterator{
    constructor(group){
        this.group = group;
        this.index = 0;
    }

    next(){
        if(this.index == this.group.values.length - 1) return {done: true};

        let value = {
            index: this.index,
            value: this.group.values[this.index]
        }

        this.index++;

        return {value, done: false}
    }
}

Group.prototype[Symbol.iterator] = function(){
    return new GroupIterator(this);
  };


let map = {one: true, two: true};
const sym = Symbol();
map[sym] = true;
