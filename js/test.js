
import {Comp} from "./AI/Comp.js";
import {CompSet} from "./AI/CompSet.js";
import { Linear } from "./AI/Linear.js";
import { SELoss } from "./AI/Loss/SELoss.js";
import {CompSetSerializer} from "./AI/CompSetSerializer.js"
import {SGD} from "./AI/Optimizer/SGD.js";
import { CompMapper } from "./AI/Function/CompMapper.js";
import { RELU } from "./AI/Function/RELU.js";
import { Sigmoid } from "./AI/Function/Sigmoid.js";

let linear = null;
let linear2 = null;


let train = ()=>{
    if(linear==null){
        alert('If you try for the first time, You should do start trainning by \"FIRST TRAIN\" MODE');
        return;
    }
    let consoles = document.getElementById("console");
    let log = (log)=>{consoles.innerHTML += log +"<br>";}

    
    let rate = Number(document.getElementById("learning_rate").value);
    log("Learning Rate : " + rate);
    let x1 = Number(document.getElementById("x1").value);
    let x2 = Number(document.getElementById("x2").value);
    let y1 = Number(document.getElementById("y1").value);
    let y2 = Number(document.getElementById("y2").value);
    let epoch = Number(document.getElementById("epoch").value);

    
    let inputs =[];
    let labels= [];

    inputs.push(new CompSet([x1]));
    inputs.push(new CompSet([x2]));

    labels.push(new CompSet([y1]));
    labels.push(new CompSet([y2]));
    log("Initalized Input, Label Data");


    let latestLoss=0;

    for(let i=0;i<epoch;i++){

        linear.clearGrids();
        linear2.clearGrids();
        let y = linear.forward(inputs);
        y = new RELU(y).build();

        y = linear2.forward(y);
        y = new RELU(y).build();
        let seLoss = new SELoss();
        let loss = seLoss.forward(y,labels);
        loss.backward();

        latestLoss=loss;
        if(loss.getValue()<=0.001)
        {
            log("CLOSE EPOCH BECAUSE OF LOSS VALUE");
            break;
        }
        

        let compSetSerializer = new CompSetSerializer();
        compSetSerializer.serialize(linear.getWeights());
        compSetSerializer.serialize(linear2.getWeights());
        let serialized =compSetSerializer.getSerialized();
        
        
        let sgd = new SGD(serialized, rate);
        sgd.forward();


    }
    log("FINISH ALL EPOCHS");
    log("LATEST LOSS : " + latestLoss);
    consoles.scrollTop = consoles.scrollHeight;

};

let start= ()=>{

    let consoles = document.getElementById("console");
    consoles.innerHTML="";
    let log = (log)=>{consoles.innerHTML += log +"<br>";}


    let hidden = Number(document.getElementById("hidden").value);
    log("HIDDEN NUMBER : " + hidden);
    linear = new Linear(1,hidden);
    linear2 = new Linear(hidden,1);
    log("Initalized Linear Information");


    train();

    consoles.scrollTop = consoles.scrollHeight;
}

let predict=()=>{
    if(linear==null){
        alert('If you try for the first time, You should do start trainning by \"FIRST TRAIN\" MODE');
        return;
    }
    let consoles = document.getElementById("console");
    let log = (log)=>{consoles.innerHTML += log +"<br>";}
    let data =Number(document.getElementById("predictx").value);
    let inputTest = [
        new CompSet([data])
    ]
    
    let y = linear.forward(inputTest);
    console.log(y);
    y = new RELU([y]).build();
    console.log(y);
    
    y = linear2.forward(y);
    console.log(y);
    y = new RELU([y]).build();
    console.log(y);
    log("<span style='font-size:20px;'>" + data + " INPUT : " + y[0].getValue() +"</span>");
    consoles.scrollTop = consoles.scrollHeight;
    
};

export {start, train, predict};