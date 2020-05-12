import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAll, updateItem, removeItem} from '../../store/actions/todos';
import CreateTodo from './CreateTodo';

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
            
            <CreateTodo/>
            
            <div className="list-group">
                {
                    loading && "Loading..."
                }

                {
                    error && 'Error found: ' + error
                }

                {
                  todos && todos.map(item => (
                        <div  key={item.id} className="list-group-item">
                            <p onClick={() => toggleTodo(item)} className="m-0" style={item.done ? { textDecoration: "line-through"} : null}>{item.title} 
                            <br/> <span className="text-muted small">{item.created_at}</span></p>
                            <button
                            onClick={() => dispatch(removeItem(item))}
                             type="button" className="btn btn-sm mt-2 btn-danger">Delete</button>
                        </div>
                    ))
                }
                
            </div>

        </div>
     );
}
 
export default Todos;