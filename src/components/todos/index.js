import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAll, updateItem} from '../../store/actions/todos';;

const Todos = () => {

    const dispatch = useDispatch();

    const {todos, loading, error} = useSelector(state => state.todos);

    const toggleTodo = (selected) => {
        selected.done = !selected.done
        dispatch(updateItem(selected))
    }

    useEffect(() => {
       dispatch(getAll())
    }, []);

    return ( 
        <div style={{ maxWidth: "300px", margin: "0 auto"}}>
            <h5>Todos List</h5>
            <div className="list-group">
                {
                    loading && "Loading..."
                }

                {
                    error && 'Error found: ' + error
                }

                {
                  todos && todos.map(item => (
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