import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DonorService from "../services/DonorService";

const UpdateDonorComponent = () => {
  const id = useParams();
  const [donorName, setDonorName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonation, setLastDonation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Hello ..." + id.id);

    DonorService.getDonorById(id.id).then((res) => {
      console.log(res.data.id);
      console.log(res.data);
      // let donor = res.data;
      setDonorName(res.data.name);
      setSex(res.data.sex);
      setAge(res.data.age);
      setBloodGroup(res.data.bloodGroup);
      setLastDonation(res.data.lastDonation);
    });
  }, [id.id]);

  function updateDonor(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(
      "#name, #sex, #age, #bloodGroup, #lastDonation"
    );

    inputs.forEach((input) => {
      input.value = "";
    });

    let donor = {
      name: donorName,
      sex: sex,
      age: age,
      bloodGroup: bloodGroup,
      lastDonation: lastDonation,
    };
    console.log("Updated Donor : " + JSON.stringify(donor));

    if (age < 18) {
      alert("Age should n't be less than 18");
      setDonorName(donor.name);
      setSex(donor.sex);
      setAge("");
      setBloodGroup(donor.bloodGroup);
      setLastDonation(donor.lastDonation);
    } else if (donorName === "") {
      alert("Enter your name");
    } else if (sex === "") {
      setDonorName(donor.name);
      setAge(donor.age);
      setBloodGroup(donor.bloodGroup);
      setLastDonation(donor.lastDonation);
      setSex("");
      alert("Enter your sex");
    } else if (bloodGroup === "") {
      setDonorName(donor.name);
      setSex(donor.sex);
      setAge(donor.age);
      setBloodGroup(donor.bloodGroup);
      setLastDonation(donor.lastDonation);
      alert("Select your blood group");
    } else if (lastDonation === "") {
      setDonorName(donor.name);
      setSex(donor.sex);
      setAge(donor.age);
      setBloodGroup(donor.bloodGroup);
      setLastDonation(donor.lastDonation);
      alert("Enter the date of last donation");
    } else {
      DonorService.updateDonor(donor, id.id).then((res) => {
        console.log(res.data.name);
        console.log(res.data.sex);
        console.log(res.data.age);
        console.log(res.data.bloodGroup);
        console.log(res.data.lastDonation);
        navigate("/donors");
      });
    }

    // DonorService.updateDonor(donor, id.id).then((res) => {
    //   console.log(res.data.name)
    //   console.log(res.data.sex)
    //   console.log(res.data.age)
    //   console.log(res.data.bloodGroup)
    //   console.log(res.data.lastDonation)
    //   navigate('/donors');
    // })
  }

  function changeDonorName(e) {
    setDonorName(e.target.value);
  }

  function changeSex(e) {
    setSex(e.target.value);
  }

  function changeAge(e) {
    setAge(e.target.value);
  }

  function changeBloodgroup(e) {
    console.log(e.target.value);
    setBloodGroup(e.target.value);
  }

  function changeLastDonation(e) {
    setLastDonation(e.target.value);
  }

  function cancel() {
    navigate("/donors");
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Donor</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name: </label>
                  <input
                    placeholder="name"
                    name="name"
                    id="name"
                    className="form-control"
                    value={donorName}
                    onChange={changeDonorName}
                  />
                </div>
                <div className="form-group">
                  <label>Gender: </label>
                  <input
                    placeholder="Gender"
                    name="sex"
                    id="sex"
                    className="form-control"
                    value={sex}
                    onChange={(e) => changeSex(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Age: </label>
                  <input
                    placeholder="age"
                    name="age"
                    id="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => changeAge(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Blood Group: </label>
                  <select
                    required
                    style={{ width: 170, marginLeft: 20 }}
                    placeholder="Enter blood group"
                    onChange={changeBloodgroup}
                  >
                    {/* <option defaultValue=""></option> */}
                    <option defaultValue={bloodGroup}>{bloodGroup}</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Last Donation: </label>
                  <input
                    type="date"
                    placeholder="Last Donation"
                    name="lastDonation"
                    id="lastDonation"
                    className="form-control"
                    value={lastDonation.substring(0, 10)}
                    onChange={changeLastDonation}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={updateDonor}
                  id="btn"
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateDonorComponent;
