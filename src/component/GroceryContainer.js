import React, {useState, useEffect} from 'react';
import InputData from './InputData';
import Grocery from './Grocery/Grocery';

const BringItems = () => {
    return JSON.parse(window.localStorage.getItem('lists'))
}

const GroceryContainer = () => {
    const [name, setName] = useState('');
    const [lists, setList] = useState(BringItems());
    const [editable, setEditable] = useState(false);
    const [alert, setAlert] = useState({show: false, type:'', msg:''})
    const [itemID, setItemID] = useState(null)

    const changeHandler = (e) => {
        setName(e.target.value)
    }

    const addItem = () => {
        if (name.length < 1){
            showAlert(true, 'danger', 'Please insert something!')
        }else if(editable){
            updateItem(itemID);
        }else{
        setList([...lists, {id: new Date().getTime(), title: name}]);
        showAlert(true, 'success', 'item added')
        setName('');
        }
    }

    const deleteItem = (id) => {
        setList(lists.filter(item => item.id !== id));
        setName('')
        setEditable(false);
        setItemID(null)
        showAlert(true, 'danger', 'Item deleted')
    }

    const editItem = (id) => {
        const item = lists.filter(ele => ele.id === id);        
        setName(item[0].title);
        setEditable(true);
        setItemID(item[0].id);
        showAlert();
    }

    const updateItem = (id) => {
        const items = lists.map(ele => {
            if (ele.id === id){
                ele = {...ele, title: name}
            }
            return ele;
        })

        setList(items);
        setName('');
        setEditable(false);
        setItemID(null)
        showAlert(true, 'success', 'Item updated');
    }

    const showAlert = (show=false, type="", msg="") => {        
        setAlert({show, type, msg});
    }


    useEffect(() =>{
        window.localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists])

    useEffect(() => {
        const timeOut = setTimeout(() =>{
            showAlert(false, '', '');
        }, 3000)
        return () => clearTimeout(timeOut)
    })
    return ( 
        <main className='grocery-container'>
            {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}
            <InputData data={{name: name, changeHandler: changeHandler, edit: editable, addItem: addItem, updateItem: updateItem, itemID: itemID}}/>
            {lists.length > 0 &&
                lists.map(item => <Grocery key={item.id} data={{...item, deleteItem: deleteItem, editItem: editItem}}/>)
            }
            {lists.length > 0 && <button className='clear-btn' onClick={() => setList([])}>clear list</button>}
        </main>
     );
}
 
export default GroceryContainer;