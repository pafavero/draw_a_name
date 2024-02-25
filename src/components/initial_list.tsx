'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ModalInit from './modal_init';

const ElementStyle = styled.div`
    &.div_init_list{

        margin-top: 5rem;

        label{
            display: block;
        }

        textarea{
            width: 100%;
            height: 100px;
            &.editable {
                height: 100px;
                font-weight: bold;
            }
        }

        button{
            align-self: start;
            margin-bottom: 50px;
        }

        .btn_set_init_list{

        }
    }
`;

type Props = {
    initialList: string;
    setInitialList: Function;
    isListChangable: boolean;
    setInitialListChangable: Function;
};

function InitialList(props: Props) {

    const [isInitialListChanged, setInitialListChange] = useState<boolean>(false);
    const [initialList, setInitialList] = useState<string>(props.initialList);
    const [isShownModal4Init, setShowModal4Init] = useState<boolean>(false);

    const onClickReset = (evt: React.MouseEvent<HTMLElement>) =>{
        props.setInitialListChangable(true);
    };
    
    const onChangeInitialList = (evt: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setInitialListChange(true);
        setInitialList(evt.target.value);
    };

    const onClickSave = (evt: React.MouseEvent<HTMLElement>) =>{
        setShowModal4Init(true);
    };

    const handleCloseModalInit = ()=>{
        setShowModal4Init(false);
        setInitialList(props.initialList);
        props.setInitialListChangable(false);
        setInitialListChange(false);
    };
        
    const handleSaveModalInit = ()=>{
        props.setInitialList(initialList);
        setShowModal4Init(false);
        props.setInitialListChangable(false);
        setInitialListChange(false);
    };

    const classNameDisabled = props.isListChangable?'editable':'';

    return (
        <ElementStyle className='div_init_list'>
            
            <label htmlFor="mytextarea" >Initial list:</label>
            <textarea id="mytextarea" value={initialList} onChange={onChangeInitialList} 
                    disabled={!props.isListChangable} className={classNameDisabled}></textarea>
            {!props.isListChangable ?
                <Button className='btn_set_init_list btn-sm' onClick={onClickReset}>
                    Reset all. Modify initial list
                </Button>
            :
                <Button className='btn_set_init_list btn-sm' disabled={!isInitialListChanged} onClick={onClickSave}>
                    Modify initial list
                </Button>
            }
            {isShownModal4Init && <ModalInit handleClose={handleCloseModalInit} handleSave={handleSaveModalInit} />}
        
        </ElementStyle>
    );
}

export default InitialList;
