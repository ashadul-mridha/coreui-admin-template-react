import React , { useState , useEffect } from 'react';
import styles from './homepage.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function HomePageAll() {

  const [data , setData] = useState([]);
  const [effectDependancy , setEffectDependancy] = useState(false);
  let navigate = useNavigate();
  
  useEffect( () => {
      axios.get('http://localhost:5000/api/homepage/all')
      .then( res => {
        setData(res.data.data)
      })
  } ,[effectDependancy])

  const isDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        
        if (result.isConfirmed) {

          axios.delete(`http://localhost:5000/api/homepage/${id}`)
          .then( res => {
            if(res.data.status){
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              setEffectDependancy(!effectDependancy)
            } else {
              Swal.fire(
                `${res.data.message}`,
                'Your file has been not deleted.',
                'error'
              )
            }
          })
          
        }
      })
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Title</th>
                  <th>SubTitle</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map( (homepage , index) => (
                    <tr key={homepage._id}>
                      <td>{index+1}</td>
                      <td>{homepage.title}</td>
                      <td>{homepage.subTitle}</td>
                      <td>
                        <img src={`http://localhost:5000/uploads/homepageimg/${homepage.bgImg}`} alt="" width="50px" height="auto" />
                      </td>
                      <td>{homepage.isActive}</td>
                      <td>

                          <i title='Details View' onClick={ () => navigate(`/homepage/details/${homepage._id}`)} className="fa-solid fa-eye text-success fa-lg"></i>
                        
                          <i title='updated' onClick={ () => navigate(`/homepage/edit/${homepage._id}`)} className="fa-solid fa-file-pen text-warning fa-lg mx-3"></i>
                        
                          <i title='delete' onClick={ () => isDelete(homepage._id)} className="fa-solid fa-trash-can text-danger fa-lg"></i>

                      </td>
                  </tr>
                  ) )
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageAll