import { useReducer, useState } from 'react'
import './App.css'
import { useRef } from 'react'

const initialInputState = [
  {
    value: 'Type here ',
    visible: true
  }
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { value: action.data, visible: true }];
    case 'CHANGE':
      return state.map((item, index) => {
        if (action.index === index) {
          return { ...item, visible: !item.visible };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialInputState);
  const [value, setValue] = useState('');
  const inputRef = useRef();

  function handleChangeInput(e) {
    setValue(e.target.value);
  }

  function handleAdd() {
    dispatch({ type: 'ADD', data: value });
    setValue('');
  }

  function handleHide(index) {
    dispatch({ type: 'CHANGE', index });
  }

  function putFocus() {
    inputRef.current.focus();
  }

  return (
    <div className="app-container">
      <input
        type="text"
        onChange={(e) => handleChangeInput(e)}
        value={value}
        ref={inputRef}
        className="input-field"
      />
      <button onClick={handleAdd} className="add-button">
        ADD
      </button>
      {state.map((item, index) => (
        <div key={index} className="content-container">
          <h1 className={item.visible ? 'visible' : 'hidden'}>
            {item.visible ? item.value : 'The Content is hidden'}
          </h1>
          <button onClick={() => handleHide(index)} className="toggle-button">
            Toggle
          </button>
        </div>
      ))}
      <br />
      <button onClick={putFocus} className="focus-button">
        BACK
      </button>
    </div>
  );
}

export default App;
