import styles from './page.module.css';
import MainContainer from '@/components/main_container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { promises as fs } from 'fs';
import StatisticalObj from '@/components/statistical_obj';
import {APIBody, APIResults} from '@/components/api_body';

export default async function Home() {
  // read the file server-side but async!
  const fileContent = await fs.readFile(process.cwd() + '/public/initial_list.txt', 'utf8');
  // const initialList: string = fileContent.split(',');
  // console.log('fileContent', fileContent, initialList);

  const results = await fs.readFile(process.cwd() + '/public/results.json', 'utf8');
  // const jsonResult = JSON.parse(results);
  const currResult: APIBody = JSON.parse(results);
  let selStatisticalObj: StatisticalObj | null = null;
  let item: StatisticalObj;
  if(!currResult.nameList){
    currResult.nameList = [];
  }
  if(!currResult.selName){
    currResult.selName = null;
  }


  for (item of currResult.nameList) {
    if(item.time){
      item.time = new Date(item.time);
      /*if (!maxTime || maxTime < item.time){
        maxTime = item.time;
      }*/
    } 
  }
  console.log(currResult);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>

      <div className={styles.center}>
        <MainContainer initialList={fileContent} currResult={currResult.nameList} selName={currResult.selName}/>
      </div>
     
    </main>
  );
}
