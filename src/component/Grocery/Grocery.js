import React from 'react';
import {AiFillDelete, AiFillPropertySafety} from 'react-icons/ai';
import {BiEdit} from 'react-icons/bi'

const Grocery = (props) => {
    const {title, id , deleteItem, editItem} = props.data;
    return ( 
        <article className="grocery-list">
            <p>{title}</p>
            <section className='btn-controller'>
                <button className='btn_controller btn-edit' onClick={() => editItem(id)}><BiEdit/></button>
                <button className='btn_controller btn-delete' onClick={() => deleteItem(id)}><AiFillDelete /></button>                
            </section>
        </article>
     );
}
 
export default Grocery;