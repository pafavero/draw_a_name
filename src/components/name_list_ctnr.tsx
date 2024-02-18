'use client'
import styled from 'styled-components';
import {NameStore} from "@/utils/utils";
import SelAName from "@/components/sel_a_name";
import {Utils, StaticObj} from "@/utils/utils";

const ElementStyle = styled.div`
    height: 300px;
    overflow-y: auto;
    width: 330px;
}
`;

type Props = {
    nameList: StaticObj[];
    selName: string | null;
    setSelName: Function;
};

function NameListCntr(props: Props) {
    const nameStore = new NameStore()

    const setSelName = (name: string) =>{
        console.log("selOnClickEvent() in SelAName", name);
        props.setSelName(name);
    }

    const orderListBasedOnWeght: StaticObj[] = [...props.nameList]
    orderListBasedOnWeght.sort((a: StaticObj,b: StaticObj) => b.weight - a.weight)
    console.log('list to print====> ', orderListBasedOnWeght);


    return (
        <ElementStyle className='div_name_list'>
            {orderListBasedOnWeght.map(function(obj: StaticObj, i: number){
                const keyItem = 'div_name_' + i;
                let className = 'div_name';
                let isSelected = false;
                if (props.selName == obj.name){
                    className += ' sel';
                    isSelected = true;
                }
                
                return <SelAName key={keyItem} obj={obj} index={i} isSelected={isSelected} setSelName={setSelName} />
            })}
            
        </ElementStyle>
    );
}

export default NameListCntr;