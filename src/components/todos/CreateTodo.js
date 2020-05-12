import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem} from '../../store/actions/todos';;

const CreateTodo = () => {

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.todos);

    const [title,seTtitle] = useState("");
    const [description, setDescription] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createItem({title, description}))
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input disabled={loading} onChange={e => seTtitle(e.target.value)} value={title} name="title" type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <textarea disabled={loading} onChange={e => setDescription(e.target.value)} name="description" value={description} className="form-control"></textarea>
            </div>
            {
                error && <div className="alert alert-danger">{ error }</div>
            }
            <div className="form-group text-right">
                <button disabled={loading} type="submit" className="btn btn-success">Add Todo</button>
            </div>
        </form>
     );
}
 
export default CreateTodo;