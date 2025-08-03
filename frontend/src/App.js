import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { BlogList } from './pages/BlogList';
import { CreateBlog } from './pages/CreateBlog';
import { BlogEdit } from './pages/BlogEdit';
import { Register } from './pages/Register';
import { ViewBlog } from './pages/ViewBlog';

const router=createBrowserRouter([

{
  path:'/',
  element:(
   <Login/>
  )
},
{
  path:'/register',
  element:(
   <Register/>
  )
},
{
  path:'/bloglist',
  element:(
   <BlogList/>
  )
},
{
  path:'/createblog',
  element:(
   <CreateBlog/>
  )
},
{
  path:'/editblog/:_id',
  element:(
   <BlogEdit/>
  )
},
{
  path:'/viewblog/:_id',
  element:(
   <ViewBlog/>
  )
},

])
function App() {
  
  return (
    <RouterProvider router={router}/>
  );
}


export default App;
