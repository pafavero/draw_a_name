
interface StaticObj {
    name: string
    weight: number
  }
  
  
  function shuffle(array: StaticObj[]) {
    /*
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * Fisher–Yates shuffle
     */
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        // console.log(currentIndex, randomIndex);
        currentIndex--;
        
        // And swap it with the current element.
        // console.log('inversion random <-> current', array[currentIndex], array[randomIndex]);
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  
  function changeWeight(weightList: StaticObj[], selIndex: number): StaticObj[] {
    const REDUCE_WEIGHT = 0.8;
    const ADD_WEIGHT = REDUCE_WEIGHT / (weightList.length - 1);
    
    let currentIndex = weightList.length;
    for (let currentIndex = 0; currentIndex < weightList.length; currentIndex++) {
      if(selIndex == currentIndex)
        weightList[currentIndex].weight -=  REDUCE_WEIGHT
      else
        weightList[currentIndex].weight += ADD_WEIGHT
    }
    return weightList;
  }
  
  function checkSum(nameList: StaticObj[]){
    // use reduce() method to find the sum
    var sum = nameList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.weight
    },0);
  
    console.log('sum', sum);
  
  }
  
export class NameStore {
    // https://stackoverflow.com/questions/35210406/class-definition-confuse-in-typescript-and-es6
    names: StaticObj[] = [
        {name: "XXX", weight: 1},
        {name: "Susanna", weight: 1}, 
        {name: "Noah", weight: 1}, 
        {name: "Emma", weight: 1}, 
        {name: "Oliver", weight: 1}, 
        {name: "Charlotte", weight: 1}, 
        {name: "James", weight: 1}, 
        {name: "Amelia", weight: 1}
    ]
    
    constructor(){
        
    }
}
      
//     //shuffle the init list
//     console.log("  ");
//     const shuffleNameList: StaticObj[]  = shuffle(initNameList);
//     console.log(shuffleNameList);
//     checkSum(shuffleNameList);
  
  
//     // suppose to peak one pos 0
//     console.log("  ");
//     let weightNameList: StaticObj[] = changeWeight(shuffleNameList, 0);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // suppose to peak one pos 4
//     console.log("  ");
//     weightNameList = changeWeight(shuffleNameList, 4);
//     console.log(weightNameList);
//     checkSum(weightNameList);
  
  
//     // list to print
//     console.log("  ");
//     const orderListBasedOnWeght: StaticObj[] = [...weightNameList]
//     orderListBasedOnWeght.sort((a: StaticObj,b: StaticObj) => b.weight - a.weight)
//     console.log('list to print====> ', orderListBasedOnWeght);
  
  
//     const parentElem = document.getElementById("demo") as HTMLElement;
//     console.log('parentElem', parentElem);
//     for (let currentIndex = 0; currentIndex < orderListBasedOnWeght.length; currentIndex++) {
//       const elem = document.createElement('input'); 
//       elem.type = 'radio'; 
//       elem.name = orderListBasedOnWeght[currentIndex].name; 
//       // elem.checked = checked; 
//       parentElem.appendChild(elem); 
  
//       const elem2 = document.createElement('label') as HTMLLabelElement;
//       elem2.innerText = orderListBasedOnWeght[currentIndex].name;
//       parentElem.appendChild(elem2); 
  
//     }
  
//   }
  
  // proseguire da qui   https://github.com/Kornil/simple-ts-react-app/blob/master/src/index.tsx