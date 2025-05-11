import { Comp } from "./Comp.js";

export class CompSet{

    /**
     * 
     * @param {Array} values 
     */
    constructor(values){
        if(typeof values === 'number'){
            values=[values];
        }
        for(let i=0;i<values.length;i++){
            if( typeof values[i] === 'number'){
                values[i] = new Comp(values[i]);
            }else if(values[i] instanceof Comp){
                continue;
            }else{
                throw new Error("잘못된 CompSet 구성입니다.");
            }

        }
        this.values = values;
    }

    /**
     * 
     * @param {Number} idx 
     * @returns {Comp} comp
     */
    get(idx){
        return this.values[idx];
    }

    /**
     * 
     * @param {Number} idx 
     * @param {Comp} comp 
     */
    set(idx, comp){
        this.values[idx] = comp;
    }

    length(){
        return this.values.length;
    }

    /**
     * 
     * @param {Comp} comp 
     */
    multiply(comp){
        let isNotScalar=false;
        if(comp instanceof CompSet){

            if(comp.length()==this.length()){


                isNotScalar=true;
            }else  if(comp.length()==1){

                comp = comp.get(0);
            }else{
                throw new Error("잘못된 연산 대상입니다.");
            }
        }

        let newArray = [];
        for(let i =0;i<this.values.length;i++){

            let compData = comp;
            if(isNotScalar){
                compData = comp.get(i);
            }

            let calcResult = this.values[i].multiply(compData);

            newArray.push( calcResult );
        }
        return new CompSet(newArray);
    }

    /**
     * 
     * @param {Comp} comp 
     */
    add(comp){
        let isNotScalar=false;
        if(comp instanceof CompSet){

            if(comp.length()==this.length()){


                isNotScalar=true;
            }else  if(comp.length()==1){

                comp = comp.get(0);
            }else{
                throw new Error("잘못된 연산 대상입니다.");
            }
        }

        let newArray = [];
        for(let i =0;i<this.values.length;i++){

            let compData = comp;
            if(isNotScalar){
                compData = comp.get(i);
            }

            let calcResult = this.values[i].add(compData);

            newArray.push( calcResult );
        }
        return new CompSet(newArray);
    }
    
    /**
     * 
     * @param {Comp} comp 
     */
    subtract(comp){
        let isNotScalar=false;
        if(comp instanceof CompSet){

            if(comp.length()==this.length()){


                isNotScalar=true;
            }else  if(comp.length()==1){

                comp = comp.get(0);
            }else{
                throw new Error("잘못된 연산 대상입니다.");
            }
        }

        let newArray = [];
        for(let i =0;i<this.values.length;i++){

            let compData = comp;
            if(isNotScalar){
                compData = comp.get(i);
            }

            let calcResult = this.values[i].subtract(compData);

            newArray.push( calcResult );
        }
        return new CompSet(newArray);
    }

    /**
     * 
     * @param {Comp} comp 
     */
    divide(comp){
        let isNotScalar=false;
        if(comp instanceof CompSet){

            if(comp.length()==this.length()){


                isNotScalar=true;
            }else  if(comp.length()==1){

                comp = comp.get(0);
            }else{
                throw new Error("잘못된 연산 대상입니다.");
            }
        }

        let newArray = [];
        for(let i =0;i<this.values.length;i++){

            let compData = comp;
            if(isNotScalar){
                compData = comp.get(i);
            }

            let calcResult = this.values[i].divide(compData);

            newArray.push( calcResult );
        }
        return new CompSet(newArray);
    }

    sum(){
        if(this.values.length==0)
            return null;
        
        let item = this.values[0];
        for(let i=1;i<this.values.length;i++){
            item = item.add(this.values[i]);
        }

        return item;
    }


    mean(){
        
        let result = this.sum();
        result = result.divide(new Comp(this.values.length));

        return result;

    }

    getValue(){
        let newArray =[];
        for(let i =0;i<this.values.length;i++){
            newArray.push( this.values[i].getValue());
        }
        return newArray;
    }

    getGrid(){
        let newArray =[];
        for(let i =0;i<this.values.length;i++){
            newArray.push( this.values[i].getGrid());
        }
        return newArray;
    }

    clearGrid(){
        for(let i =0;i<this.values.length;i++){
            this.values[i].clearGrid();
        
        }
    }
    backward(){

        if(this.values.length!=1){
            throw new Error("값이 스칼라가 아닙니다.");
        }

        this.values[0].backward();

    }
}