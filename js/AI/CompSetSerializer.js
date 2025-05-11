import { Comp } from "./Comp.js";
import { CompSet } from "./CompSet.js";

export class CompSetSerializer{
    constructor(){
        this.comps=[];
    }
    
    serialize(array){
        if (array instanceof Comp){
            this.comps.push(array);
            return;
        }

        if(array instanceof CompSet){
            for(let i=0;i<array.length();i++){
                this.comps.push(array.get(i));
            }
        }

        if(array instanceof Array){
            let searchList = [];
            searchList.push(array);

            while(true){
                if(searchList.length == 0)
                    break;

                let visit = searchList.pop();

                if(visit instanceof Array){
                    for(let i=0;i<visit.length;i++){
                        searchList.push(visit[i]);
                    }
                }else if(visit instanceof CompSet){
                    for(let i=0;i<visit.length();i++){
                        this.comps.push(visit.get(i));
                    }
                }else if(visit instanceof Comp){
                    this.comps.push(visit);
                }
            }

            
        }
    }

    getSerialized(){
        return this.comps.slice();
    }
}