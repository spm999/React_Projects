import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './TodoList.css';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

const TodoList = () => {
  const auth = useRef(firebase.auth());
  const database = getDatabase();
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState('');
  const [loggedOut, setLoggedOut] = useState(false); // Change this to false when the user is logged in
  const [list, setList] = useState([]);
  const [user, setUser] = useState();


  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.current.currentUser;
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(`users/${user.uid}/todos`)
      const fetchTodos = async () => {
        const todosRef = ref(database, `users/${user.uid}/todos`);
        onValue(todosRef, (snapshot) => {
          const todosData = snapshot.val();
          if (todosData) {
            const todosList = Object.keys(todosData).map((firebaseKey) => ({
              firebaseKey,
              ...todosData[firebaseKey],
            }));
            setList(todosList);
          } else {
            setList([]);
          }
        });
        // function debounce(func, timeout=1){
        //   let timer;
        //   return (...args) => {
        //     clearTimeout(timer);
        //     timer = setTimeout(() => { func.apply(this, args); }, timeout);
        //   };
        // }


        // onValue(todosRef, debounce(({ val }) => {
        //   const todosData = val;
        //   if (todosData) {
        //     const todosList = Object.keys(todosData).map((firebaseKey) => ({
        //       firebaseKey,
        //       ...todosData[firebaseKey],
        //     }));
        //     setList(todosList);
        //   } else {
        //     setList([]);
        //   }
        // }, 500));
      };

      fetchTodos();
    }

  }, [user, database]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }

    const todoItem = {
      value: newTodo,
      timestamp: new Date().getTime(),
    };

    const todoRef = push(ref(database, `users/${user.uid}/todos`), todoItem);
    setNewTodo('');
    // if (user) {
    //   navigate("/TodoList/:userId");
    // }
  };

  const handleDeleteTodo = (firebaseKey) => {
    const todoRef = ref(database, `users/${user.uid}/todos/${firebaseKey}`);
    remove(todoRef);
  };

  const handleLogout = async () => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user == null) {
    navigate('/');
    }
  });
    try {
      await auth.current.signOut();
      console.log("You are logged Out");
      setLoggedOut(true);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    navigate("/");
  }
  else{
    navigate(`/TodoList/${currentUser.uid}`);
  }

  return (
    <div className="todo-container">
      {!loggedOut && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
          placeholder="Write a Todo..."
          value={newTodo}
          name="text"
        />
        <button type="submit" className="add-todo-button">
          Add Todo
        </button>
      </form>
      <ul className="todo-list">
        {list.map((item) => (
          <li className="todo-item" key={item.firebaseKey}>
            <span className="todo-content">{item.value}</span>
            <span className="todo-timestamp">
              Added on: {new Date(item.timestamp).toLocaleString()}
            </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(item.firebaseKey)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

