import React, { useEffect, useState } from 'react';
import todosService from '../../services/todos.service';

const Todos = () => {

    const [todos, setTodos] = useState([]);

    const toggleTodo = (selected) => {
        selected.done = !selected.done
        todosService.set(selected, selected.id).then(res =>{
            todos[todos.indexOf(selected)] = res;
            setTodos([...todos]);
        })
    }

    const getTodos = () => {
        todosService.getAll().then(res => {
            setTodos(res);
        })
    }

    useEffect(() => {
       getTodos();
    }, []);

    return ( 
        <div style={{ maxWidth: "300px", margin: "0 auto"}}>
            <h5>Todos List</h5>
            <div className="list-group">
                {
                    todos.map(item => (
                        <div  key={item.id} onClick={() => toggleTodo(item)} className="list-group-item list-group-item-action">
                            
                            <p className="m-0" style={item.done ? { textDecoration: "line-through"} : null}>{item.title} <br/> <small>{item.created_at}</small></p>
                        </div>
                    ))
                }
                
            </div>

        </div>
     );
}
 
export default Todos;