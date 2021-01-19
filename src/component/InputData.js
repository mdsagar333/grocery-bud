import React from 'react';

const InputData = (props) => {
    const {stateHandeler, itemHandler, stateValue ,editValue, updateItem, updateId} = props.handlers;
    const btnValue = editValue ? 'Edit' : 'Submit';
    return ( 
        <section className="input-container">
            <form className='grocery-form' onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    className="input-field" 
                    name="addGrocery" 
                    placeholder='e.g. eggs'
                    value={stateValue}
                    onChange={(e) => stateHandeler(e)}
                />
                <button className='btn-grocery' onClick={editValue? () => updateItem(updateId):itemHandler}>{btnValue}</button>
            </form>
        </section>
     );
}
 
export default InputData;