'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StatisticalObj} from '@/utils/utils';
import NameListCntr from '@/components/name_list_ctnr';
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

function MainContainer(props: Props) {
    const [initialList, setInitialList] = useState<string>(props.initialList);
    const [selName, setSelName] = useState<string | null>(null);
    const [tempSelName, setTempSelName] = useState<string | null>(null);
    const [nameList, setNameList] = useState<StatisticalObj[] | null>(null);
    const [isShownModal, setShowModal] = useState<boolean>(false);

    const onChangeInitialList = (evt: React.ChangeEvent<HTMLTextAreaElement>) =>{
        // console.log(evt);
        setInitialList(evt.target.value);
    };
    
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
        setShowModal(false)

        setSelName(tempSelName);
        // console.log("nameList && selName", nameList, selName);
        if(nameList && tempSelName){
            setNameList(Utils.changeWeight(nameList, tempSelName));
        }
    }; 

    const shuffleList = (evt: React.MouseEvent<HTMLElement>) =>{
        const initialL: string[] = initialList.split(',');
        if (initialL.length > 2)
            setNameList(Utils.shuffle(initialL));
        else
            alert('no enough values');
    };

    return (
        <ElementStyle>
            <h3>Drawn names</h3>
            <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.</p>
            
            {!nameList ?
                <>
                    <Button type="button" title="Start the draw of names" onClick={(ev) => shuffleList(ev)} >Start the draw of names</Button>
                </>
            :
                <NameListCntr nameList={nameList} selName={selName} setSelName={selOnClickEvent} />  
            }
            
            <div className='div_result'>
                <label htmlFor="mytextarea">Initial list:</label>
                <textarea id="mytextarea" value={initialList} onChange={onChangeInitialList}></textarea>
            </div>
            {isShownModal && <Modal handleClose={handleCloseModal} handleSave={handleSaveModal} name={tempSelName} />}
        </ElementStyle>
    );
}

export default MainContainer;