import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth';

import Loading from '../../Shared/Loading/Loading';


const UserData = () => {
    const [profile, setProfile] = useState();
    const [auth] = useAuth();
    const [user, loading] = useAuthState(auth);



    useEffect(() => {
        const url = `http://localhost:5000/profile/${user?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProfile(data))
    }, [user])
    if (loading || !profile) {
        return <Loading></Loading>
    }
    console.log(profile)
    return (
        <section className='my-20 mx-20'  
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="300"
        data-aos-delay="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false">
            <div className="card w-full mx-auto  bg-primary shadow-xl ">
                <figure className="px-10 pt-10">
                    <div className="avatar online">
                        <div className="w-44 rounded-full">
                            <img src={profile.img} />
                        </div>
                    </div>
                </figure>
                <div className="card-body  text-left">
                    <h2 className="card-title text-white font-bold">Name: <span className='text-xl font-bold text-white'>{profile.name}</span></h2>
                    <p className='font-bold text-white text-xl'>Number: <span className='font-bold text-white text-xl'>{profile.number}</span></p>
                    <p className='font-bold text-white text-xl'>Email: <span className='font-bold text-white text-xl'>{profile.email}</span></p>
                    <p className='font-bold text-white text-xl'>Eduction: <span className='font-bold text-white text-xl'>{profile.eduction}</span></p>
                    <p className='font-bold text-white text-xl'>Adress: <span className='font-bold text-white text-xl'>{profile.adress}</span></p>
                    <div className="card-actions mt-10">
                       <a className='bg-white p-3 text-primary font-bold rounded-lg mr-5 hover:text-black' href={profile.facebook}>Facebook</a>
                       <a className='bg-white p-3 text-primary font-bold rounded-lg hover:text-black' href={profile.linkdin}>Linkedin</a>
                    </div>
                </div>
            </div>

           
        </section>
    )
}

export default UserData