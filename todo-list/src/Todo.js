import { useEffect, useState } from 'react';
import './Todo.css'; 

const Todo = () => {
    const [task, setTask] = useState(() => {
        const storedTasks = localStorage.getItem('task');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [value, setValue] = useState('');

    const change = (e) => {
        setValue(e.target.value);
    };

    const click = () => {
        if (value.trim() !== '') {
            setTask([...task, value]);
            setValue('');
        }
    };

    const deleteTask = (id) => {
        const updatedTask = [...task];
        updatedTask.splice(id, 1);
        setTask(updatedTask);
    };

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(task));
    }, [task]);

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo List</h1>
            <div className="input-container">
                <input className="todo-input" onChange={change} value={value} placeholder="Enter task"></input>
                <button className="add-button" onClick={click}>Add Task</button>
            </div>
            <div className="task-list">
                {task.map((item, id) => (
                    <div key={id} className="task-item">
                        <span>{item}</span>
                        <button className="delete-button" onClick={() => deleteTask(id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
