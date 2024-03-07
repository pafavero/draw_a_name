'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Utils} from '@/utils/utils';
import StatisticalObj from '@/components/statistical_obj';
import NameListCntr from '@/components/name_list_ctnr';
import InitialList from '@/components/initial_list';
import Modal from './modal';
import {APIBody, APIResults} from '@/components/api_body';

type Props = {
  initialList: string | null;
  currResult: StatisticalObj[]
  selName: string | null;
};

function MainContainer(props: Props) {
  /*
    * Main container of the app.
  */
  const SERVER_URL =  process.env.NEXT_PUBLIC_SERVER_URL;
  const TEST_URL =  SERVER_URL + 'api/save_result';
  // console.log('TEST_URL:', TEST_URL);

  // init list ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [initialList, setInitialList] = useState<string | null>(props.initialList);
  const [isListChangable, setInitialListChangable] = useState<boolean>(false);

  const setInitialListAndReset = (newInitialList: string) =>{
    setInitialList(newInitialList);
    setNameList([]);
    setSelName(null);
    handleAPI(nameList, null);
  };

  const [selName, setSelName] = useState<string | null>(props.selName);
  const [tempSelName, setTempSelName] = useState<string | null>(null);
  const [nameList, setNameList] = useState<StatisticalObj[]>(props.currResult);
  const [isShownModal, setShowModal] = useState<boolean>(false);

  const selOnClickEvent = (name: string | null) =>{
      //   console.log("selOnClickEvent(), index:", index);
      if (name){
          setTempSelName(name);
          setShowModal(true);
      } else {
          setSelName(null);
      }
  };

  const handleCloseModal = ()=>{
      setShowModal(false);
  };
      
  const handleSaveModal = ()=>{
    setShowModal(false);

    setSelName(tempSelName);
    // console.log("nameList && selName", nameList, selName);
    if(nameList.length > 0 && tempSelName){
        const nameListWithWeight = Utils.changeWeight(nameList, tempSelName);
        setNameList(nameListWithWeight);
        handleAPI(nameList, tempSelName);
    }
  }; 

  const shuffleList = (evt: React.MouseEvent<HTMLElement>) =>{
    if(initialList){
      const initialArray: string[] = initialList.split(',');
      if (initialArray.length > 2){
          const shuffledList: StatisticalObj[] = Utils.shuffle(initialArray);
          setNameList(shuffledList);
          if(shuffledList){
              handleAPI(shuffledList, selName);
          }
      } else
          alert('no enough values');
      
    }    
  };

  const handleAPI = (nameList: StatisticalObj[], selName: string | null)=>{
    const body: APIBody = {
        nameList,
        selName,
    };
    const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, body);
    promiseApi.then(
        function(value) {
            // console.log('successful:', value.message);
        },
        function(value) {
            console.error('fail:', value.message);
        }
    );
  };

  async function saveResultAPI<T>(url: string, body: APIBody): Promise<T> {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
};

  return (
    <div>
      <h3>Drawn names</h3>
      <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.</p>
      
      {!isListChangable && nameList.length > 0 ?
        <NameListCntr nameList={nameList} selName={selName} setSelName={selOnClickEvent} />  
      :
        <>
          <Button type="button" title="Start the draw of names" onClick={(ev) => shuffleList(ev)} disabled={isListChangable}>
              Start the draw of names
          </Button>
        </>
      }
      
      <InitialList initialList={initialList} setInitialList2={setInitialListAndReset} 
          isListChangable={isListChangable} setInitialListChangable={setInitialListChangable}/>
      {isShownModal && <Modal handleClose={handleCloseModal} handleSave={handleSaveModal} name={tempSelName} />}
    </div>
  );
}

export default MainContainer;