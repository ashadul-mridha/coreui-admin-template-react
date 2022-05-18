import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HomePageDetails = () => {

    const {id} = useParams();
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/homepage/${id}`)
        .then( res => {
            setData(res.data.data)
            setLoading(false)
        })
    } ,[])


    return (
        <>
            <div className="container my-3">
                <div style={ {minHeight : '100vh'} } className="row align-items-center justify-content-center">
                    {
                        loading ? (
                            <div class="spinner-border text-warning" role="status">
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="col-12">
                                {/* tilte and subtitle feild  */}
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title" className="form-label"> Title *</label>
                                            <input type="text" disabled value={data.title} className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label">Enter Subtitle *</label>
                                            <input type="text" disabled value={data.subTitle} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                </div>
                                {/* description feild  */}
                                <div className="row justify-content-center my-3">
                                    <div className="col-mb-6">
                                        <div><img src={`http://localhost:5000/uploads/homepageimg/${data.bgImg}`} alt="" width="400px" height="auto"  /></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="description" className="form-label"> Enter Description </label>
                                            <textarea disabled value={data.desc} aria-describedby="descriptionHelp" className="form-control" id="description" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default HomePageDetails;