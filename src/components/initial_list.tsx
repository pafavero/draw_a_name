'use client';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ModalInit from './modal_init';
import {APIResults} from '@/components/api_body';

const ElementStyle = styled.div`
  &.div_init_list{

    margin-top: 5rem;

    label{
        display: block;
    }

    textarea{
      width: 100%;
      height: 50px;
      &.editable {
          height: 100px;
          font-weight: bold;
      }
    }

    .btn_cancel{
      margin-right: 3px;
    }

    .btn_set_init_list{
      align-self: start;
      margin-bottom: 50px;
    }
  }
`;

type Props = {
  initialList: string | null;
  setInitialList2: Function;
  isListChangable: boolean;
  setInitialListChangable: Function;
};

function InitialList(props: Props) {
  const SERVER_URL =  process.env.NEXT_PUBLIC_SERVER_URL;
  const TEST_URL =  SERVER_URL + 'api/save_initial_list';

  const [isInitialListChanged, setInitialListChange] = useState<boolean>(false);
  const [initialList, setInitialList] = useState<string>(props.initialList?props.initialList:'');
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
  
  const onClickCancel = (evt: React.MouseEvent<HTMLElement>) =>{
    props.setInitialListChangable(false);
    setInitialList(props.initialList?props.initialList:'');
    setInitialListChange(false);
  };

  const handleCloseModalInit = ()=>{
    setShowModal4Init(false);
    setInitialList(props.initialList?props.initialList:'');
    props.setInitialListChangable(false);
    setInitialListChange(false);
  };
      
  const handleSaveModalInit = ()=>{
    props.setInitialList2(initialList);
    setShowModal4Init(false);
    props.setInitialListChangable(false);
    setInitialListChange(false);
    handleAPI(initialList);
  };

  const classNameDisabled = props.isListChangable?'editable':'';

  const handleAPI = (body: string)=>{
      const promiseApi: Promise<APIResults> = saveInitListAPI(TEST_URL, body);
      promiseApi.then(
        function(value) {
            // console.log('successful:', value.message);
        },
        function(value) {
            console.error('fail:', value.message);
        }
      );
  };

  async function saveInitListAPI<T>(url: string, body: string): Promise<T> {
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
    <ElementStyle className='div_init_list'>
      <label htmlFor="mytextarea" >Initial list:</label>
      <textarea id="mytextarea" value={initialList} onChange={onChangeInitialList} 
              disabled={!props.isListChangable} className={classNameDisabled}></textarea>
      {!props.isListChangable ?
          <Button className='btn_set_init_list btn-sm' onClick={onClickReset}>
              Modify initial list
          </Button>
      :
        <>
          <Button className='btn_cancel btn-sm' onClick={onClickCancel}>
              Cancel
          </Button>
          <Button className='btn_save btn-sm' disabled={!isInitialListChanged} onClick={onClickSave}>
              Modify initial list
          </Button>
        </>
      }
      {isShownModal4Init && <ModalInit handleClose={handleCloseModalInit} handleSave={handleSaveModalInit} />}
    
    </ElementStyle>
  );
}

export default InitialList;
