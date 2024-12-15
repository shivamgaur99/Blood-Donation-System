import React, { useState } from 'react';
import './get-involved.css';
import VolunteerForm from '../Volunteer/VolunteerForm';

const GetInvolved = (props) => {

  let dark = props.theme;


  return (
    <div>
      <VolunteerForm theme={dark} />
    </div>
  );
};

export default GetInvolved;
