let level=1;
let sec=0;
let min=0;
let timeInterval=null;
let operators=['+','-','/','*','%'];
let fNumber=0;
let lNumber=0;
let selectedOperator='';
let answerData=[];
let correctAnswer;
let insertedAnswer;
let qNumber=0;

//-------
//-------
const selectElement=document.getElementById('level-select');

const secElement=document.getElementById('sec');

const minElement=document.getElementById('min');
const fNumElement=document.getElementById('f-number');
const lNumElement=document.getElementById('l-number');
const opElement=document.getElementById('op');
const answerElement=document.getElementById('answer');
const qNumberElement=document.getElementById('qnumber');
const correctElement=document.getElementById('c');
const wrongElement=document.getElementById('w');
const skippElement=document.getElementById('s');
const btnStartElement=document.getElementById('btn-start');
const tBodyElement=document.getElementById('answer-body');

//------
selectElement.addEventListener("change",function(){
   level=parseInt(selectElement.value);
}
);

//--------
const start=()=>{

    btnStartElement.disabled=true;

    manageTime();
}

const manageTime=()=>{
    qNumber++;
    if(qNumber>10){
        finalize();
        return;

    }else{

        qNumberElement.textContent=qNumber;
    
        min=0;
        sec=0;
        secElement.textContent='00';

        minElement.textContent='00';

        generateQuestion(level);

        clearInterval(timeInterval);

        timeInterval=setInterval(()=>{
        sec++;

        if(sec<10){
            secElement.textContent='0'+sec; 
        }else{
            secElement.textContent=sec+'';
        }

        if(sec==60){
            sec=0;
            min++;
            minElement.textContent='0'+min; 
        }
        if(min==3){
            min=0;
            skipQuiz();
        }

     },1000)
    }
}

const generateQuestion=(selectedLevel)=>{
    let maxNumber=10;

    if(selectedLevel==2){
        maxNumber=50;
    }else if(selectedLevel==3){
        maxNumber=100;
    }

    fNumber=Math.floor(Math.random()*maxNumber) +1;
    lNumber=Math.floor(Math.random()*maxNumber) +1;

    fNumElement.textContent=fNumber;
    lNumElement.textContent=lNumber;

    selectedOperator=operators[
        Math.floor(Math.random()*5)
    ];

    opElement.textContent=selectedOperator;

}

const submitData=()=>{

 insertedAnswer=parseInt(answerElement.value);
   

    if(fNumber && lNumber && selectedOperator && insertedAnswer){

        switch(selectedOperator){
            case'+':correctAnswer=fNumber+lNumber;break;
            case'-':correctAnswer=fNumber-lNumber;break;
            case'*':correctAnswer=fNumber*lNumber;break;
            case'/':correctAnswer=fNumber/lNumber;break;
            case'%':correctAnswer=fNumber%lNumber;break;
            default:alert('something went wrong!');return;
        }

        if(insertedAnswer==correctAnswer){
            let obj={
                'qNumber':1,
                'time':min+':'+sec,
                'correctAnswer':correctAnswer,
                'userAnswer':insertedAnswer,
                'operator':selectedOperator,
                'firstNumber':fNumber,
                'lastNumber':lNumber,
                'isCorrect':true,
                'isSkipped':false
            }
            answerData.push(obj);

        }else{
            let obj={
                'qnumber':1,
                'time':min+':'+sec,
                'correctAnswer':correctAnswer,
                'userAnswer':insertedAnswer,
                'operator':selectedOperator,
                'firstNumber':fNumber,
                'lastNumber':lNumber,
                'isCorrect':false,
                'isSkipped':false
            }
            answerData.push(obj);

        }
        answerElement.value='';
        manageTime();
        console.log(answerData);
        staticForLabales();

    }else{
        alert('try again');
    }
}

const skipQuiz=()=>{
    if(qNumber>10){
        finalize();
        return;
    }else{

        let obj={
            'qnumber':1,
            'time':min+':'+sec,
            'correctAnswer':'**',
            'userAnswer':'**',
            'operator':selectedOperator,
            'firstNumber':fNumber,
            'lastNumber':lNumber,
            'isCorrect':false,
            'isSkipped':true
        }
        answerData.push(obj);

        manageTime();
        staticForLabales();
   }
}

const staticForLabales=()=>{
    let c=0;
    let w=0;
    let s=0;

    

    for(let x=0;answerData.length>x;x++){
        let temp=answerData[x];
        if(temp.isCorrect){
            c++;
        }else{
            w++;
        }
        if(temp.isSkipped){
            s++;
        }
    }
    correctElement.textContent=c;
    wrongElement.textContent=w;
    skippElement.textContent=s;
}

const reset=()=>{
    btnStartElement.disabled=false;
    qNumber=0;
    qNumberElement.textContent=qNumber;
    selectedOperator=undefined;
    answerData=[];
    staticForLabales();
    clearInterval(timeInterval);
    opElement.textContent='?';
    minElement.textContent='00';
    secElement.textContent='00';
    fNumElement.textContent='?';
    lNumElement.textContent='?';


    while(tBodyElement.firstChild){
        tBodyElement.removeChild(tBodyElement.firstChild)
    }
    
}
const finalize=()=>{
    answerData.forEach(data=>{
        const row=document.createElement("tr");
        const cell1=document.createElement("td");
        cell1.textContent=data.firstNumber;
        row.appendChild(cell1);

        const cell2=document.createElement("td");
        cell2.textContent=data.lastNumber;
        row.appendChild(cell2);

        const cell3=document.createElement("td");
        cell3.textContent=data.operator;
        row.appendChild(cell3);

        const cell4=document.createElement("td");
        cell4.textContent=data.correctAnswer;
        row.appendChild(cell4);

        const cell5=document.createElement("td");
        cell5.textContent=data.userAnswer;
        row.appendChild(cell5);

        const cell6=document.createElement("td");
        cell6.textContent=data.isCorrect;
        row.appendChild(cell6);

        const cell7=document.createElement("td");
        cell7.textContent=data.isSkipped;
        row.appendChild(cell7);

        const cell8=document.createElement("td");
        cell8.textContent=data.time;
        row.appendChild(cell8);

        tBodyElement.appendChild(row);


    });
}