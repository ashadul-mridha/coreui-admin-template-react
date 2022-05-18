import React , {useState,useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const HomePageAdded = () => {

    const initialValues = { title: "", subTitle: "", desc: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const imgRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('subTitle', formValues.subTitle);
            formData.append('desc', formValues.desc);
            formData.append('bgImg', image);

            const url = 'http://localhost:5000/api/homepage/add';

            setLoading(true)
            axios({
                method: "post",
                url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then( res => {
                if(res.data.status){

                    setLoading(false)
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Added SuccessFully!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    setFormValues({ title: "", subTitle: "", desc: "" })
                    setImage(null)
                    imgRef.current.value = null;
                }
            })
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = "Title is required!";
        }
        if (!values.subTitle) {
            errors.subTitle = "Sub Title is required!";
        } 
        
        return errors;
    };

    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit}  method="post" encType='multipart/form-data'>
                            {/* tilte and subtitle feild  */}
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Enter Title *</label>
                                        <input type="text" value={formValues.title} name="title" onChange={handleChange} className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                        {
                                            formErrors.title && (
                                                <small id="titleHelp" className="form-text text-danger">Title feild is required.</small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="subtitle" className="form-label">Enter Subtitle *</label>
                                        <input type="text" value={formValues.subTitle} name="subTitle" onChange={handleChange} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        {
                                            formErrors.subTitle && (
                                                <small id="subtitleHelp" className="form-text text-danger">Sub Title feild is required.</small>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* description feild  */}
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="description" className="form-label"> Enter Description </label>
                                        <textarea value={formValues.desc} name="desc" onChange={handleChange} aria-describedby="descriptionHelp" className="form-control" id="description" rows="4"></textarea>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* file upload  */}                            
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="custom-file">
                                        <label className="form-label" htmlFor="customFile">Upload Background Image*</label>
                                        <input name="bgImg" onChange={handleFormChange}  accept="image/*" ref={imgRef} aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary">{loading ? 'Loading...' : 'Add Data'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePageAdded;