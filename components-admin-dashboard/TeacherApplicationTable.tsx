import React, { useContext } from "react";
import styled from "styled-components";
import { FiEdit, FiCheck, FiInfo } from "react-icons/fi";
import { useState } from "react";
import { themeVars } from "../components/GlobalStyles";
import { AdminDashContext, ADMIN_DASH_ACTIONS } from "../contexts/AdminDashContext";
import Tr from "./Tr";
import { AuthContext, useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { useApi, useNotif } from "../contexts/AppProvider";

export default function TeacherApplicationTable({ teacherApplication }: any) {
  const { appliccantUser } = teacherApplication;
  const { loggedInUserAdminProfile } = useContext(AuthContext);
  const { api } = useApi();
  const router = useRouter();
  const { notify } = useNotif();

  const [editedTeacherApplication, seteditedTeacherApplication] = useState(teacherApplication);
  const { adminDashState, adminDashDispatch } = useContext(AdminDashContext);

  const handleChange = (event) => {
    const key = event.target.name;
    let value = event.target.value;
    if (event.target.type === "number") {
      value = Number(event.target.value);
    }
    seteditedTeacherApplication(() => {
      return { ...editedTeacherApplication, [key]: value };
    });
  };

  const handleReject = () => {
    //prepare updates for rejected applications. (only fields that are supposed to be changed in body)
    const body = {
      reviewerAdminId: loggedInUserAdminProfile.adminId,
      reviewerComment: editedTeacherApplication?.reviewerComment,
      status: "rejected",
    };

    const id = teacherApplication.teacherApplicationId;
    api
      .patch(`/api/teacherApplication/${id}/update`, body)
      .then(() => {
        //if successfull => update state
        adminDashDispatch({
          type: ADMIN_DASH_ACTIONS.REJECT_TEACHER_APPLICATION,
          payload: { ...teacherApplication, reviewerAdminId: loggedInUserAdminProfile.adminId, status: "rejected" },
        });
        // router.reload();
      })
      .catch((err) => {
        alert(err.response.status);
        console.log(err.response);
      });
  };

  const handleAccept = async () => {
    const id = teacherApplication.teacherApplicationId;

    //prepare accepted teacher application.
    try {
      const teacherApplicationBody = {
        ...editedTeacherApplication,
        pricePerSession: Number(editedTeacherApplication.pricePerSession),
        sessionDuration: Number(editedTeacherApplication.sessionDuration),
        reviewerAdminId: loggedInUserAdminProfile.adminId,
        reviewerComment: editedTeacherApplication?.reviewerComment,
        status: "accepted",
      };
      delete teacherApplicationBody.applicantUser;

      const res = await api.patch(`/api/teacherApplication/${id}/update`, teacherApplicationBody);

      notify("Application status in database changed to accepted", "success");
      //if successfull => update state
      adminDashDispatch({
        type: ADMIN_DASH_ACTIONS.ACCEPT_TEACHER_APPLICATION,
        payload: teacherApplicationBody,
      });
      notify("Teacher Application is updated in the frontend.", "success");

      //preparing accepted teacher to add to database
      const teacherBody = {
        userId: editedTeacherApplication.applicantUserId,
        instagram: editedTeacherApplication.instagram,
        linkedin: editedTeacherApplication.linkedin,
        website: editedTeacherApplication.website,
        englishFluency: editedTeacherApplication.englishFluency,
        levelOfEducation: editedTeacherApplication.levelOfEducation,
        university: editedTeacherApplication.university,
        fieldOfStudy: editedTeacherApplication.fieldOfStudy,
        status: "published",
      };

      //create a teacher profile for applicant user
      const res2 = await api.post("/api/teacher/add", teacherBody);
      const newlyAddedTeacher = res2.data.data;
      notify("Teacher created in db.", "success");
      // get the teacher by username:

      //prepare expertise for the teacher to add to database.
      let expertiseBody = {
        teacherId: newlyAddedTeacher.teacherId,
        topicId: editedTeacherApplication.topicId,
        name: editedTeacherApplication.expertiseName,
        nameFa: editedTeacherApplication.expertiseNameFa,
        description: editedTeacherApplication.expertiseDescription,
        descriptionFa: editedTeacherApplication.expertiseDescriptionFa,
      };

      //add the expertise for the teacher
      const json2 = await api.post("/api/expertise/add", expertiseBody);
      const newlyAddedExpertise = json2.data.data;
      notify("Expertise is created in db.", "success");
      console.log("nn", newlyAddedExpertise);

      //prepare product object

      const productBody = {
        expertiseId: newlyAddedExpertise.expertiseId,
        pricePerParticipant: Number(editedTeacherApplication.pricePerSession),
        startDate: "1900-10-10", //to be dynamiclly get todays date.
        name: editedTeacherApplication.productName,
        nameFa: editedTeacherApplication.productNameFa,
        description: editedTeacherApplication.productDescription,
        descriptionFa: editedTeacherApplication.productDescriptionFa,
        extraFamilyMemberCharge: Number(editedTeacherApplication.productExtraFamilyMemberCharge),
        isGroupClass: 0,
        maxNumberOfStudents: Number(editedTeacherApplication.productMaxNumberOfStudents),
        introductionFee: Number(editedTeacherApplication.productIntroductionFee),
        sessionDuration: Number(editedTeacherApplication.sessionDuration),
        numberOfSessions: Number(editedTeacherApplication.productNumebrOfSessions),
      };
      //create products  (1 ,5 ,12 ,20 products) for the teacher
      const json3 = await api.post("/api/product/add", productBody);
      const newlyAddedProduct = json3.data;
      notify("Product is created in db.", "success");
    } catch (error) {
      // console.log("Error request:", error.request);
      console.log("Error response:", error.response);
      notify(`Error ${error.message}`, "error");
    }
  };

  return (
    <Div>
      <form>
        <Tr name="firstname" defaultValue={editedTeacherApplication.firstname} onChange={handleChange} />
        <Tr name="lastname" defaultValue={editedTeacherApplication.lastname} onChange={handleChange} />
        <Tr name="firstnameFa" defaultValue={editedTeacherApplication.firstnameFa} onChange={handleChange} />
        <Tr name="lastnameFa" defaultValue={editedTeacherApplication.lastnameFa} onChange={handleChange} />
        <Tr name="whatsappNumber" defaultValue={editedTeacherApplication.whatsappNumber} onChange={handleChange} />
        <Tr name="email" defaultValue={editedTeacherApplication.email} onChange={handleChange} />
        <Tr name="topicId" defaultValue={editedTeacherApplication.topicId} onChange={handleChange} />
        <Tr name="expertiseName" defaultValue={editedTeacherApplication.expertiseName} onChange={handleChange} />
        <Tr name="productName" defaultValue={editedTeacherApplication.productName} onChange={handleChange} />
        <Tr name="city" defaultValue={editedTeacherApplication.city} onChange={handleChange} />
        <Tr name="country" defaultValue={editedTeacherApplication.country} onChange={handleChange} />
        <Tr name="englishFluency" defaultValue={editedTeacherApplication.englishFluency} onChange={handleChange} />
        <Tr name="classesToTeach" defaultValue={editedTeacherApplication.classesToTeach} onChange={handleChange} />
        <Tr name="sessionDuration" type="number" step="1" min="0" defaultValue={editedTeacherApplication.sessionDuration} onChange={handleChange} />
        <Tr name="pricePerSession" type="number" step="0.01" min="0" defaultValue={editedTeacherApplication.pricePerSession} onChange={handleChange} />
        <Tr name="ageGroup" defaultValue={editedTeacherApplication.ageGroup} onChange={handleChange} />
        <Tr name="levelOfEducation" defaultValue={editedTeacherApplication.levelOfEducation} onChange={handleChange} />
        <Tr name="university" defaultValue={editedTeacherApplication.university} onChange={handleChange} />
        <Tr name="inPersonTeachingExperience" isTextArea={true} defaultValue={editedTeacherApplication.inPersonTeachingExperience} onChange={handleChange} />
        <Tr name="onlineTeachingExperience" defaultValue={editedTeacherApplication.onlineTeachingExperience} onChange={handleChange} />
        <Tr name="abroadTeachingExperience" defaultValue={editedTeacherApplication.abroadTeachingExperience} onChange={handleChange} />
        <Tr name="applicantNotes" defaultValue={editedTeacherApplication.applicantNotes} onChange={handleChange} />
        <Tr name="instagram" defaultValue={editedTeacherApplication.instagram} onChange={handleChange} />
        <Tr name="linkedin" defaultValue={editedTeacherApplication.linkedin} onChange={handleChange} />
        <Tr name="website" defaultValue={editedTeacherApplication.linkedin} onChange={handleChange} />
      </form>
      <div className="panel">
        <p className="info">
          <FiInfo /> You can edit some fields before accepting teacher application. Uss Edit button at the top. Edit will be undone if you close the window.
        </p>
        <div className="buttons">
          <button className="reject small-button" onClick={handleReject}>
            Reject
          </button>
          <button className="accept small-button" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </Div>
  );
}

// STYLES **************************************

const Div = styled.div`
  overflow: hidden;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template: 1fr/ 1fr;

  .panel {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .info {
    padding: 1rem;
    border-radius: ${themeVars.borderRadius};
    background: lightgray;
    font-size: 0.7em;
    color: dimgray;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .edit-button {
    padding-inline: 1rem;
    min-width: 6rem;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }

  .edit-button-edit-mode {
    color: white;
    background: teal;
  }

  table {
    /* border: none; */
    /* border-collapse: collapse; */
    margin: -2px;
    display: table;
  }

  .td-edit-mode {
    padding-block: 0.4rem;
    padding-inline: 0.3rem;
  }

  .accept {
    background: mediumaquamarine;
    & :disabled {
      background: grey;
    }
  }

  .reject {
    background: lightcoral;
  }
  & :disabled {
    background: grey;
  }
`;
