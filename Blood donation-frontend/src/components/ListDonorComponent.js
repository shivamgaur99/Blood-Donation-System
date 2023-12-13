import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/DonorService';

const ListDonorComponent = () => {
   let [donors,setDonors] = useState([]);
   const navigate = useNavigate();

   function editDonor(id) {
       console.log(`${id} will be updated...`)
       navigate(`/update-donor/${id}`);
   }

   function deleteDonor(id)
   {
       console.log(`${id} will be deleted !!`);
       DonorService.deleteDonor(id).then((res) => {
           setDonors(donors.filter((donor) => donor.id !== id));
       });
   }
   
    useEffect(() => {
        DonorService.getDonors().then((res) => {
            console.log(`First response : ${JSON.stringify(res.data)}`)
            setDonors(res.data)    //setting response to donors array
        })
    }, [])

    function addDonor()
    {
        navigate('/add-donor');
    }

    function sortDonor()
    {
       console.log(donors.filter((donor) => donor.age).sort((a,b) => a.age - b.age))
       setDonors(donors.filter((donor) => donor.age).sort((a,b) => a.age - b.age));
    }

    const search = (searchText) => {
        setDonors(donors.filter((donor) =>donor.name).filter(({name}) => name.toLowerCase().includes(searchText.toLowerCase())));
    }

    return (
      <div>
          <h2 className='text-center'>Donors List</h2>
          <div className='row'style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <button style={{width: 200}} className='btn btn-primary' onClick={addDonor}>Add Donor</button>
                <input type="text" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{width: 200, marginLeft: 20}}
                    onChange={(e) => search(e.target.value)}/>
                <button style={{width: 200, marginLeft: 10}} className='btn btn-primary' onClick={sortDonor}>Sort By Age</button>
          </div>
            <div className='row' style={{marginTop: '25px'}}>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Blood Group</th>
                            <th>Last Donation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {console.log(`Donors : ${JSON.stringify(donors)}`)}
                    <tbody>
                        {
                            donors.map((donor) => (
                                <tr key={donor.id}>
                                    {console.log("Donor mapped...",donor)}
                                    <td>{donor.name}</td>
                                    <td>{donor.sex}</td>
                                    <td>{donor.age}</td>
                                    <td>{donor.bloodGroup}</td>
                                    <td>{donor.lastDonation}</td>
                                    <td>
                                        <button onClick={() => editDonor(donor.id)} className='btn btn-info'>Update</button>
                                        <button style={{marginLeft: 20}} onClick={() => deleteDonor(donor.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
      </div>
    );
}

export default ListDonorComponent;