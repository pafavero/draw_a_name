'use client'
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StaticObj} from "@/utils/utils";
import NameListCntr from "@/components/name_list_ctnr";
import Modal from './modal';

const ElementStyle = styled.div`
    

    button{
        margin: 2px;
    }

    .sel_name{
        font-weight: bold;
        background-color: lightgray;
    }

`;


type Props = {
    initialList: string[];
    currResult: any
};

function MainContainer(props: Props) {
    const [selName, setSelName] = useState<string | null>(null);
    const [tempSelName, setTempSelName] = useState<string | null>(null);
    const [nameList, setNameList] = useState<StaticObj[] | null>(null);
    const [isShownModal, setShowModal] = useState<boolean>(false);

    const selOnClickEvent = (name: string) =>{
        //   console.log("selOnClickEvent(), index:", index);
        setTempSelName(name)
        setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    } 
    
    
    const handleSaveModal = ()=>{
        setShowModal(false)

        setSelName(tempSelName);
        // console.log("nameList && selName", nameList, selName);
        if(nameList){
            // setNameList(Utils.changeWeight(nameList, name))
        }
    } 


    const shuffleList = (evt: React.MouseEvent<HTMLElement>) =>{
        setNameList(Utils.shuffle(props.initialList)); 
    }

    return (
        <ElementStyle>
            <h3>Drawn names</h3>
            <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.</p>
            
            {nameList ? <>
                <p>Today the following name has been selected: <span className='sel_name'>{selName?selName:'NO SELECTION'}</span></p>
                <p>Select a name between the name drawn</p>
                <NameListCntr nameList={nameList} selName={selName} setSelName={selOnClickEvent} />
            </>:
            <>
                <Button type="button" title="Start the draw of names" onClick={(ev) => shuffleList(ev)} >Start the draw of names</Button>
            </>}
            
            <div className='div_result'>
                <label htmlFor="mytextarea">Initial list:</label>
                <textarea id="mytextarea" defaultValue={props.initialList}></textarea>
            </div>
            {isShownModal && <Modal handleClose={handleCloseModal} handleSave={handleSaveModal} name={tempSelName} />}
        </ElementStyle>
    );
}

export default MainContainer;