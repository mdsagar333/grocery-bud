import React, {useState, useEffect} from 'react';
import InputData from './InputData';
import Grocery from './Grocery/Grocery';



const GroceryContainer = () => {
    const [item, setItem] = useState('');
    const [lists, setList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [message, setMessage] = useState(false);
    const [dependecy, setDependency] = useState(false);


    const changeHandler = (e) => {
        const item = e.target.value;
        setItem(item);        
    }

    const addItem = () => {
        const newList = JSON.parse(window.localStorage.getItem('lists'));        
        newList.push({text: item, id: newList.length});
        window.localStorage.setItem('lists',JSON.stringify(newList));
        setList(newList);
        setItem('');
        setMessage(!message);
        setDependency(true);       
        
    }

    const updateItem = (id) => {       
        const totalList = JSON.parse(window.localStorage.getItem('lists'));
        const updatedList = totalList.map(element => {
            if (element.id === id){
                element.text = item;                
            }
            return element;
        });
        
        window.localStorage.setItem('lists',JSON.stringify(updatedList));
        setList(updatedList);
        setEdit(false);
        setItem('');

    }

    const deleteItem = (id) => {
        const totalList = JSON.parse(window.localStorage.getItem('lists'));
        const freshList = totalList.filter(item => item.id !== id);
        window.localStorage.setItem('lists',JSON.stringify(freshList));
        setList(freshList);
    }

    const editItem = (id) => {
        const totalList = JSON.parse(window.localStorage.getItem('lists'));
        const editeItem = totalList.filter(item => item.id === id);
        setItem(editeItem[0]['text']);
        setUpdateId(editeItem[0]['id']);
        setEdit(true)
    }
    
    useEffect(() => {
        if (!JSON.parse(window.localStorage.getItem('lists'))){
            window.localStorage.setItem('lists', JSON.stringify(lists));
        }else {
           setList(JSON.parse(window.localStorage.getItem('lists')));
        }
    },[]);

    // useEffect(() => {
    //     const added = setTimeout(() => {
    //         setMessage(!message);
    //     }, 2000);

    //     return () => clearTimeout(added);
    // }, [dependecy])

    return ( 
        <main className='grocery-container'>
            <InputData handlers={{stateHandeler: changeHandler, itemHandler: addItem, stateValue: item , editValue: edit, updateItem: updateItem, updateId: updateId}}/>
            {lists.length > 0 
            && 
            lists.map((list,index) => <Grocery key={index} data={list}  controller={{deleteItem: deleteItem, editItem:editItem}}/>)
            }
            {message && <span className='message-box'>Item added</span>}
        </main>
     );
}
 
export default GroceryContainer;