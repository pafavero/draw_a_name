'use client';
import styles from './page.module.css';
import MainContainer from '@/components/main_container';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatisticalObj from '@/components/statistical_obj';
import {APIBody} from '@/components/api_body';
import {Utils} from '@/utils/utils';
import { useState, useEffect} from 'react';

type DataByInit = {
  initialNames: string[];
  result: APIBody;
} | null;

export default function Home() {
  const SERVER_URL =  process.env.NEXT_PUBLIC_SERVER_URL;
  const TEST_URL =  SERVER_URL + 'api/get_init';

  // const [initialNames, setInitialNames] = useState<string[] | null>(null);
  const [dataByInit, setDataByInit] = useState<DataByInit>(null);

  async function getInitDataAPI<T>(url: string): Promise<T> {
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  };

  useEffect(() => {
    // only in dev mode is called 2 times 
    console.log('==============> user effect');
    const promiseApi: Promise<DataByInit> = getInitDataAPI<DataByInit>(TEST_URL);
    promiseApi.then((rslt: DataByInit)=>{
      // console.log('rslt', r.initialNames);
      if(rslt?.result){
        let item: StatisticalObj; 
        for (item of rslt.result.nameList) {
          // console.log('item.time', item.time);
          if(item.time){
            item.time = new Date(item.time);
          } 
        }
        rslt.result.nameList = Utils.changeOrderBasedOnWeightTimeAtInit(rslt.result.nameList);
      }
      setDataByInit(rslt);
    });
  }, [TEST_URL]);

  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.center}>
        {dataByInit &&<MainContainer initialList={dataByInit.initialNames} 
            currResult={dataByInit.result.nameList} selName={dataByInit.result.selName}/>}
      </div>
    </main>
  );
}
