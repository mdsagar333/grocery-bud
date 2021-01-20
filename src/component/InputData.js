import React from 'react';

const InputData = (props) => {
    const {name, changeHandler, edit, addItem} = props.data;
    const btnText = edit ? 'edit' : 'submit';
    return ( 
        <section className="input-container">
            <form className='grocery-form' onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    className="input-field" 
                    name="addGrocery" 
                    placeholder='e.g. eggs'
                    value={name}
                    onChange={changeHandler}
                />
                <button className='btn-grocery' onClick={addItem}>{btnText}</button>
            </form>
        </section>
     );
}
 
export default InputData;