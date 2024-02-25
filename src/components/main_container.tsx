'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StatisticalObj} from '@/utils/utils';
import NameListCntr from '@/components/name_list_ctnr';
import InitialList from '@/components/initial_list';
import Modal from './modal';

const ElementStyle = styled.div`

    .sel_name{
        font-weight: bold;
        background-color: lightgray;
    }

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

    // select list~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [selName, setSelName] = useState<string | null>(null);
    const [tempSelName, setTempSelName] = useState<string | null>(null);
    const [nameList, setNameList] = useState<StatisticalObj[] | null>(null);
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
        if(nameList && tempSelName){
            const xxx = Utils.changeWeight(nameList, tempSelName);
            setNameList(xxx);
            const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, xxx);
            promiseApi.then(
                function(value) {
                    console.log('successful:', value.message);
                },
                function(value) {
                    console.log('fail:', value.message);
                }
            );
        }
    }; 

    const shuffleList = (evt: React.MouseEvent<HTMLElement>) =>{
        const initialL: string[] = initialList.split(',');
        if (initialL.length > 2){
            const xxx = Utils.shuffle(initialL);
            setNameList(xxx);
            // console.log(xxx, nameList);
            if(xxx){
                const promiseApi: Promise<APIResults> = saveResultAPI(TEST_URL, xxx);
                console.log('promiseApi', promiseApi);
                promiseApi.then(
                    function(value) {
                        console.log('successful:', value.message);
                    },
                    function(value) {
                        console.log('fail:', value.message);
                    }
                );
            }
        } else
            alert('no enough values');
    };

    return (
        <ElementStyle>
            <h3>Drawn names</h3>
            <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.</p>
            
            {!isListChangable && nameList ?
                <NameListCntr nameList={nameList} selName={selName} setSelName={selOnClickEvent} />  
            :
                <>
                    <Button type="button" title="Start the draw of names" onClick={(ev) => shuffleList(ev)} disabled={isListChangable}>
                        Start the draw of names
                    </Button>
                </>
            }
            
            <InitialList initialList={initialList} setInitialList={setInitialList} 
                isListChangable={isListChangable} setInitialListChangable={setInitialListChangable}/>
            {isShownModal && <Modal handleClose={handleCloseModal} handleSave={handleSaveModal} name={tempSelName} />}
        </ElementStyle>
    );
}

export default MainContainer;