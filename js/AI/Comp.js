export class Comp{

    constructor(value){
        if(value==undefined)
            value=0;
        this.value = value;
        this.grid=0;
        this._backwards=()=>{};
        this._parentNodes=[];
    }

    _setBackwardFunction(func){
        this._backwards=func;
    }
    _addParentNode(node){
        this._parentNodes.push(node);
    }
    _executeBackward(){
        this._backwards();
    }
    getParentNodes(){
        return this._parentNodes;
    }

    add(comp){
        const result = new Comp(this.getValue() + comp.getValue());
        let fnc = ()=>{
            this.requestGrid(1 * result.getGrid());
            comp.requestGrid(1 * result.getGrid());
        };
        result._setBackwardFunction(fnc);
        result._addParentNode(this);
        result._addParentNode(comp);
        return result;
    }

    subtract(comp){
        const result = new Comp(this.getValue() - comp.getValue());
        let fnc = ()=>{
            this.requestGrid(1 * result.getGrid());
            comp.requestGrid(-1 * result.getGrid());
        };
        result._setBackwardFunction(fnc);
        result._addParentNode(this);
        result._addParentNode(comp);
        return result;
    }

    multiply(comp){
        const result = new Comp(this.getValue() * comp.getValue());
        let fnc = ()=>{
            this.requestGrid(comp.getValue() * result.getGrid());
            comp.requestGrid(this.getValue() * result.getGrid());
        };
        result._setBackwardFunction(fnc);
        result._addParentNode(this);
        result._addParentNode(comp);
        return result;
    }

    divide(comp){
        const result = new Comp(this.getValue() / comp.getValue());
        let fnc = ()=>{
            this.requestGrid((1/comp.getValue()) * result.getGrid());
            comp.requestGrid(-(this.getValue()/(comp.getValue()*comp.getValue())) * result.getGrid());
        };
        result._setBackwardFunction(fnc);
        result._addParentNode(this);
        result._addParentNode(comp);
        return result;
    }
    
    exp(){
        const result = new Comp(Math.exp(this.getValue()));
        let fnc = ()=>{
            this.requestGrid(Math.exp(this.getValue()) * result.getGrid());
        };
        result._setBackwardFunction(fnc);
        result._addParentNode(this);
        return result;  
    }

    requestGrid(grid){
        this.grid += grid
    }

    clearGrid(){
        this.grid = 0;
    }

    setValue(value){
        this.value = value;
    }

    getValue(){
        return this.value;
    }

    getGrid(){
        return this.grid;
    }

    valueOf(){
        return this.value;
    }

    setTag(tag){
        this.tag = tag;
    }

    getTag(){
        return this.tag;
    }


    backward(grid=1){

        if(grid!=null)
            this.grid=grid;
        
        let stackArray = [];
        let itemList = [];
        stackArray.push(this);

        while(true){
            if(stackArray.length==0)
                break;

            let popNode = stackArray.pop();

            // x가 이미 중복됐다고 하더라도 해당
            // x 텐서의 grid 총합 계산은 해야하므로, itemList에 추가한다.
            // 안의 노드에만 더 이상 파고 들지 않는다.
            itemList.push(popNode);
            
            let parentNodes = popNode.getParentNodes();
            
            for(let x =parentNodes.length-1;x>=0;x--){
                stackArray.push(parentNodes[x]);
            }


        }

        
        let visited=new Set();
        let newArray=[];

        while(true){
        
            if(itemList.length==0)
                break;
            
            
            
            let node = itemList.pop();

            if(visited.has(node))
                continue;
            visited.add(node);
            newArray.push(node);

        
        }
        newArray.reverse();

        for(let i=0;i<newArray.length;i++){
            let node = newArray[i];
            node._executeBackward();
        }
        
    }
}