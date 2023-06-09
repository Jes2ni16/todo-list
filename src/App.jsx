import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';



function App() {
  const [todos, setTodos] = useState([]);
const [input,setInput]=useState({}
);

 

useEffect(()=>{
  const fetchApi =()=>{
    fetch('https://dummyjson.com/todos')
    .then(res=>res.json())
    .then(data=>setTodos(data.todos))
    .catch(err=>console.log(err))
      };
      fetchApi();
},[])

async function postForm (){
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: input,
      completed: false,
      userId: 5,
    })
  })
  .then(res => res.json())
  .then(datas=>{
    const newTodo = [datas, ...todos]
    setTodos(newTodo)
  })
}

async function update(index){
  fetch('https://dummyjson.com/todos/1', {
    method: 'PUT', /* or PATCH */
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      completed: false,
    })
  })
  .then(res => res.json())
alert(index)

}

async function deleting(index){
  fetch('https://dummyjson.com/todos/1', {
  method: 'DELETE',
})
.then(res => res.json())
.then(datas=>{
  const newList=todos;
newList.splice(index,1)
  setTodos([...newList]);

})
}

function handleInputChange(e){
  setInput(e.target.value);
console.log(input)
}

return (
    <>

    <div className='allContainer'>
      <h1 className='text-center'>TodoList</h1>
<div className=' container  p-3' >
  <div className='d-flex'>
<input type="text" 
className='form-control'
value={input.todo}
placeholder='Add Another Todo-List'
 onChange={handleInputChange}
          />

  <button onClick={postForm} className='btn mx-4 sub '>Add-List</button>
  </div>
{todos.map((item,index) => (
<li className='text-start'>* {item.todo} . <button className='btn ' onClick={()=>deleting(index)}>Delete</button></li>
))}

</div>
</div>
    </>
  )
}

export default App
