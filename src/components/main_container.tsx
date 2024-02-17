'use client'
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Utils, StaticObj} from "@/utils/utils";
import SelAName from "@/components/sel_a_name";

const ElementStyle = styled.div`
    
    .div_result{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
    }

    button{
        margin: 2px;
    }

`;


type Props = {
    initialList: string[];
    currResult: any
};

function MainContainer(props: Props) {
    const [selName, setSelName] = useState<string | null>(null);
    const [nameList, setNameList] = useState<StaticObj[] | null>(null);

    const selOnClickEvent = (name: string) =>{
        //   console.log("selOnClickEvent(), index:", index);
        setSelName(name);
        // console.log("nameList && selName", nameList, selName);
        if(nameList){
            setNameList(Utils.changeWeight(nameList, name))
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
                <p>Today the following name has been selected: {selName?selName:'NO SELECTION'}</p>
                <p>Select a name between the name drawn</p>
                <SelAName nameList={nameList} setSelName={selOnClickEvent} />
            </>:
            <>
                <Button type="button" title="sdfdsfds" onClick={(ev) => shuffleList(ev)} >Start the draw of names</Button>
            </>}
            
            <div className='div_result'>
                <label htmlFor="mytextarea">Initial list:</label>
                <textarea id="mytextarea" defaultValue={props.initialList}></textarea>
            </div>
        </ElementStyle>
    );
}

export default MainContainer;