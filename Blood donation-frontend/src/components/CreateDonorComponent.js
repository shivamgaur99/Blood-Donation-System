import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DonorService from "../services/DonorService";

const CreateDonorComponent = () => {
  const [donorName, setDonorName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonation, setLastDonation] = useState("");
  const navigate = useNavigate();

  function saveDonor(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(
      "#name, #sex, #age, #bloodGroup, #lastDonation"
    );

    inputs.forEach((input) => {
      input.value = "";
    });

    console.log("Name of donor : " + donorName);
    console.log("sex : " + sex);
    console.log("Age : " + age);
    console.log("Blood Group : " + bloodGroup);
    console.log("Last Donation : " + lastDonation);

    let donor = {
      name: donorName,
      sex: sex,
      age: age,
      bloodGroup: bloodGroup,
      lastDonation: lastDonation,
    };
    console.log("Donor : " + JSON.stringify(donor));

    if (donorName === "") {
      alert("Enter your name");
    } else if (sex === "") {
      alert("Enter your name");
    } else if (age < 18) {
      alert("Min. age for donation is 18yrs");
    } else if (bloodGroup === "") {
      alert("Select a blood group");
    } else if (lastDonation === "") {
      alert("Enter the date of last donation");
    } else {
      DonorService.createDonor(donor).then((res) => {
        console.log(res.data);
        navigate("/donors");
      });
    }
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
            <h3 className="text-center">Add Donor</h3>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Sex: </label>
                  <input
                    placeholder="sex"
                    name="sex"
                    id="sex"
                    className="form-control"
                    value={sex}
                    onChange={(e) => changeSex(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age: </label>
                  <input
                    type="number"
                    placeholder="age"
                    name="age"
                    id="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => changeAge(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Blood Group: </label>
                  {/* <input placeholder='Blood Group' name='bloodGroup' id='bloodGroup' className='form-control'
                                            value={bloodGroup} onChange={(e) => changeBloodgroup(e)} required/> */}
                  <select
                    required
                    style={{ width: 170, marginLeft: 20 }}
                    placeholder="Enter blood group"
                    onChange={changeBloodgroup}
                  >
                    {/* <option defaultValue=""></option> */}
                    <option defaultValue=""></option>
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
                    placeholder="Last Donation date"
                    name="lastDonation"
                    id="lastDonation"
                    className="form-control"
                    value={lastDonation}
                    onChange={changeLastDonation}
                    required
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveDonor}
                  id="btn"
                >
                  Save
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

export default CreateDonorComponent;
