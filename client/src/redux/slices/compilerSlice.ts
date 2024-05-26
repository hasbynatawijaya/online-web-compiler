import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FullCode {
  html: string;
  css: string;
  javascript: string;
}

export interface CompilerInitialState {
  fullCode: FullCode;
  currentLanguage: keyof FullCode;
}

const initialState: CompilerInitialState = {
  fullCode: {
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do List</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>To-Do List</h1>
        <input type="text" id="todo-text" placeholder="Enter your task">
        <button id="add-button">Add Task</button>
        <br>
        <ul id="todo-list"></ul>
        <script src="script.js"></script>
    </body>
    </html>`,
    css: `body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
    }
    
    #todo-text {
      padding: 10px;
      width: 70%;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    
    #add-button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    #todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    #todo-list li {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    #todo-list li.completed {
      text-decoration: line-through;
      color: #aaa;
    }`,
    javascript: `
    const todoText = document.getElementById('todo-text');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    addButton.addEventListener('click', addTask);
    
    function addTask() {
      const taskText = todoText.value;
      if (taskText) {
        const listItem = document.createElement('li');
        listItem.innerText = taskText;
        listItem.addEventListener('click', toggleTask);
        todoList.appendChild(listItem);
        todoText.value = '';
      }
    }
    
    function toggleTask(event) {
      const listItem = event.target;
      listItem.classList.toggle('completed');
    }`,
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    setCurrentLanguage: (
      state,
      action: PayloadAction<CompilerInitialState["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    setFullCodeByLanguage: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    setFullCode: (
      state,
      action: PayloadAction<CompilerInitialState["fullCode"]>
    ) => {
      console.log(action.payload)
      state.fullCode = action.payload;
    },
  },
});

export const { setCurrentLanguage, setFullCode, setFullCodeByLanguage } =
  compilerSlice.actions;
export default compilerSlice.reducer;
