
export interface StatisticalObj {
  name: string
  weight: number
  time: Date | null
}
  

export class Utils{

  static shuffle(initialList: string[]) {
    /*
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * Fisher–Yates shuffle
     */

    let initialMap: StatisticalObj[] = initialList.map((item) => {return {name: item, weight: 1, time: null}});

    let currentIndex = initialMap.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        // console.log(currentIndex, randomIndex);
        currentIndex--;
        
        // And swap it with the current element.
        // console.log('inversion random <-> current', array[currentIndex], array[randomIndex]);
        [initialMap[currentIndex], initialMap[randomIndex]] = [initialMap[randomIndex], initialMap[currentIndex]];
    }
  
    return initialMap;
  }
  
  
  static changeWeight(nameList: StatisticalObj[], selName: string): StatisticalObj[] {
    const REDUCE_WEIGHT = 0.8;
    const ADD_WEIGHT = REDUCE_WEIGHT / (nameList.length - 1);
    const weightList = [...nameList];
    
    let selIndex = weightList.length;
    let selObj: StatisticalObj | null = null;
    for (let currentIndex = 0; currentIndex < weightList.length; currentIndex++) {
      if(weightList[currentIndex].name == selName){
        weightList[currentIndex].time = new Date();
        weightList[currentIndex].weight -=  REDUCE_WEIGHT;
        selObj = weightList[currentIndex];
        selIndex = currentIndex;
      }else{
        // weightList[currentIndex].weight += ADD_WEIGHT;
      }
      weightList[currentIndex].weight = Math.round(weightList[currentIndex].weight * 100000) / 100000
    }

    // fix objs with same weight: find all others with the same weight
    // NONE OF FOLLOWINGS WORK, it is not possible to touch the weight
    /*const foundObjs: StatisticalObj[] = weightList.filter((item) => item != selObj && item.weight == selObj?.weight);
    foundObjs.sort((a: StatisticalObj,b: StatisticalObj) => {
      let aTime = a.time?a.time.getTime():99999999999999999;
      let bTime = b.time?b.time.getTime():99999999999999999;
      return bTime - aTime;
    })*/
    // increment them
    /*for (var i = 0; i < foundObjs.length; i++){
      console.log(selObj?.weight, "compare with", foundObjs[i].name, foundObjs[i].time)
      foundObjs[i].weight += (0.002 * i);
    }*/
    /*if (selObj && foundObjs.length > 0){
      console.log("yes found!!!")
      selObj.weight -= (0.001);
    }*/
    const  weightTimeList = Utils.changeOrderBasedOnWeightTime(weightList, selObj);
    return weightTimeList;
  }

  static changeOrderBasedOnWeightTime(weightList: StatisticalObj[], selObj: StatisticalObj | null){
    const orderListBasedOnWeght: StatisticalObj[] = [...weightList]
    orderListBasedOnWeght.sort((a: StatisticalObj,b: StatisticalObj) => b.weight - a.weight)
    
    const indexes: number[] = [];
    const foundObjs: StatisticalObj[] = orderListBasedOnWeght.filter((item, index) => {
      if (item.weight == selObj?.weight) {
        indexes.push(index);
        return true;
      }
      return false;
    });
    foundObjs.sort((a: StatisticalObj,b: StatisticalObj) => {
      let aTime = a.time?a.time.getTime(): 99999999999999999;
      let bTime = b.time?b.time.getTime(): 99999999999999999;
      return aTime - bTime;
    });
    // console.log(foundObjs.length, ...foundObjs);

    orderListBasedOnWeght.splice(indexes[0], foundObjs.length, ...foundObjs);
    return orderListBasedOnWeght;
  }
  
  static checkSum(nameList: StatisticalObj[]){
    // use reduce() method to find the sum
    var sum = nameList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.weight
    },0);
  
    console.log('sum', sum);
  
  }

  static padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
  }

  static dateInHhMmYyMmDd(date: Date, dateDiveder: string = "-") {
  
    return (
      [
        Utils.padTwoDigits(date.getHours()),
        Utils.padTwoDigits(date.getMinutes()),
        Utils.padTwoDigits(date.getSeconds()),
      ].join(":") +
      " " +
      [
        Utils.padTwoDigits(date.getDate()),
        Utils.padTwoDigits(date.getMonth() + 1),
        date.getFullYear(),
      ].join(dateDiveder)
    );
  }

  static getColor(value: number): string {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
}
