import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {showModal, hideModal} from '../actions/posts';

function Modal() {
    const modal = useSelector(state => state.showModal);
    const dispatch = useDispatch();

    return (
        <div className={modal.showModal ? 'modal-win' : 'modal-win showmodal'}>
            <div className='modal-container'>
                <div className='modal-img-container'>
                    <img className='modal-img' src={modal.img}></img>
                </div>
                <button onClick={() => dispatch(hideModal(modal))} className='modal-close-btn'>X</button>
            </div>
        </div>
    )
}

export default Modal;