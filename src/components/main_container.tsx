'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StatisticalObj} from '@/utils/utils';
import NameListCntr from '@/components/name_list_ctnr';
import InitialList from '@/components/initial_list';
import Modal from './modal';

const ElementStyle = styled.div`


`;

type Props = {
    initialList: string;
    currResult: any
};

type APIResults = {
    message: string;
}

async function saveResultAPI<T>(url: string, body: StatisticalObj[]): Promise<T> {
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


function MainContainer(props: Props) {

    const SERVER_URL =  'http://localhost:3000/';  // process.env.REACT_APP_SERVER_URL;
    const TEST_URL =  SERVER_URL + 'api/save_result';
    // https://stackoverflow.com/questions/65199051/how-to-get-page-url-or-hostname-in-nextjs-project
    // console.log('window.location.host', window.location.host);

    // init list ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [initialList, setInitialList] = useState<string>(props.initialList);
    const [isListChangable, setInitialListChangable] = useState<boolean>(false);

    const setInitialListAndReset = (newInitialList: string) =>{
        setInitialList(newInitialList);
        setNameList([]);
        setSelName(null);
        const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, []);
        promiseApi.then(
            function(value) {
                console.log('successful:', value.message);
            },
            function(value) {
                console.log('fail:', value.message);
            }
        );
    };

    // select list~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [selName, setSelName] = useState<string | null>(null);
    const [tempSelName, setTempSelName] = useState<string | null>(null);
    const [nameList, setNameList] = useState<StatisticalObj[]>([]);
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
            const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, nameListWithWeight);
            promiseApi.then(
                function(value) {
                    // console.log('successful:', value.message);
                },
                function(value) {
                    console.error('fail:', value.message);
                }
            );
        }
    }; 

    const shuffleList = (evt: React.MouseEvent<HTMLElement>) =>{
        const initialArray: string[] = initialList.split(',');
        if (initialArray.length > 2){
            const shuffledList: StatisticalObj[] = Utils.shuffle(initialArray);
            setNameList(shuffledList);
            if(shuffledList){
                const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, shuffledList);
                // console.log('promiseApi', promiseApi);
                promiseApi.then(
                    function(value) {
                        // console.log('successful:', value.message);
                    },
                    function(value) {
                        console.error('fail:', value.message);
                    }
                );
            }
        } else
            alert('no enough values');
    };

    return (
        <ElementStyle>
            <h3>Drawn names</h3>
            <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.
                {nameList.length}</p>
            
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
        </ElementStyle>
    );
}

export default MainContainer;