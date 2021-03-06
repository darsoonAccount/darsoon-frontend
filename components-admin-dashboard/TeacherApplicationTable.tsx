import React, { useContext } from "react";
import styled from "styled-components";
import { FiEdit, FiCheck, FiInfo } from "react-icons/fi";
import { useState } from "react";
import { themeVars } from "../styles/GlobalStyles";
import { AdminDashContext, ADMIN_DASH_ACTIONS } from "../contexts/AdminDashContext";
import Tr from "./Tr";
import { AuthContext, useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { useApi, useNotif } from "../contexts/AppProvider";
import T from "../components/translation/T";
import Table from "../components/Table";
import Fa from "../components/translation/Fa";
import En from "../components/translation/En";

export default function TeacherApplicationTable({ teacherApplication }: any) {
  
  const { applicantUser, ...ta } = teacherApplication;
 
  
  const au = applicantUser;
  const { loggedInUserAdminProfile } = useAuth();
  const { api } = useApi();
  const router = useRouter();
  const { notify } = useNotif();

  //eta = editedTeacherApplication
  const [eta, setEta] = useState(teacherApplication);
  const { adminDashDispatch } = useContext(AdminDashContext);

  const handleChange = (event) => {
    const key = event.target.labelEn;
    let value = event.target.value;
    if (event.target.type === "number") {
      value = Number(event.target.value);
    }
    setEta(() => {
      return { ...eta, [key]: value };
    });
  };

  const handleReject = () => {
    //prepare updates for rejected applications. (only fields that are supposed to be changed in body)
    const body = {
      reviewerAdminId: loggedInUserAdminProfile.adminId,
      reviewerComments: eta?.reviewerComment,
      status: "rejected",
    };

    const id = teacherApplication.teacherApplicationId;
    api
      .patch(`/api/teacherApplication/${id}/update`, body)
      .then(() => {
        //if successfull => update state
        adminDashDispatch({
          type: ADMIN_DASH_ACTIONS.REJECT_TEACHER_APPLICATION,
          payload: { ...ta, ...body },
        });
        notify({ en: "Application has been rejected.", fa: "?????????????? ???? ????." });
        router.push("/admin-dashboard/teacher-applications/");
      })
      .catch((err) => {
        console.log(err.response);
        notify({ en: err.message, fa: err.message, type: "error" });
      });
  };

  const handleAccept = async () => {
    const id = teacherApplication.teacherApplicationId;

    //prepare accepted teacher application.
    try {
      const teacherApplicationBody = {
        ...eta,
        pricePerSession: Number(eta.pricePerSession),
        sessionDuration: Number(eta.sessionDuration),
        reviewerAdminId: loggedInUserAdminProfile.adminId,
        reviewerComment: eta?.reviewerComment,
        status: "accepted",
      };
      delete teacherApplicationBody.applicantUser;

      const res = await api.patch(`/api/teacherApplication/${id}/update`, teacherApplicationBody);

      //if successfull => update state
      adminDashDispatch({
        type: ADMIN_DASH_ACTIONS.ACCEPT_TEACHER_APPLICATION,
        payload: teacherApplicationBody,
      });
      notify({ en: "Application status in database changed to accepted", fa: "??????????  ?????????????? ???? ???????????????? ???? ?????????????? ?????? ?????????? ??????.", type: "success" });

      //preparing accepted teacher to add to database
      const teacherBody = {
        userId: eta.applicantUserId,
        instagram: eta.instagram,
        linkedin: eta.linkedin,
        website: eta.website,
        englishFluency: eta.englishFluency,
        levelOfEducation: eta.levelOfEducation,
        university: eta.university,
        fieldOfStudy: eta.fieldOfStudy,
        status: "published",
      };

      //create a teacher profile for applicant user
      const res2 = await api.post("/api/teacher/add", teacherBody);
      const newlyAddedTeacher = res2.data.data;
      notify({ en: "Teacher profile created in db.", fa: "?????????????? ???????? ???? ?????????????? ?????????? ????.", type: "success" });
      // get the teacher by username:

      //prepare expertise for the teacher to add to database.
      let expertiseBody = {
        teacherId: newlyAddedTeacher.teacherId,
        topicId: eta.topicId,
        name: eta.expertiseName,
        nameFa: eta.expertiseNameFa,
        description: eta.expertiseDescription,
        descriptionFa: eta.expertiseDescriptionFa,
      };

      //add the expertise for the teacher
      const json2 = await api.post("/api/expertise/add", expertiseBody);
      const newlyAddedExpertise = json2.data.data;
      notify({ en: "Expertise is created in db.", fa: "???????? ???????? ???? ?????????????? ?????? ????.", type: "success" });

      //prepare product object

      const productBody = {
        expertiseId: newlyAddedExpertise.expertiseId,
        pricePerParticipant: Number(eta.pricePerSession),
        startDate: "1900-10-10", //to be dynamiclly get todays date.
        name: eta.productName,
        nameFa: eta.productNameFa,
        description: eta.productDescription,
        descriptionFa: eta.productDescriptionFa,
        extraFamilyMemberCharge: Number(eta.productExtraFamilyMemberCharge),
        isGroupClass: 0,
        maxNumberOfStudents: Number(eta.productMaxNumberOfStudents),
        introductionFee: Number(eta.productIntroductionFee),
        sessionDuration: Number(eta.sessionDuration),
        numberOfSessions: Number(eta.productNumebrOfSessions),
      };
      //create products  (1 ,5 ,12 ,20 products) for the teacher
      const json3 = await api.post("/api/product/add", productBody);
      const newlyAddedProduct = json3.data;
      notify({ en: "Product is created in db.", fa: "???????? (??????????) ?????? ???????? ???? ?????????????? ?????????? ????.", type: "success" });
    } catch (error) {
      //try to revert all changes if one of them failed.

      // console.log("Error request:", error.request);
      console.log("Error response:", error.response);
      notify({ en: `Error ${error.message}`, fa: `Error ${error.message}`, type: "error" });
    }
  };


  return (
    <Div>
      <h2 className="page-title">
        <En>Teacher Application</En>
        <Fa>?????????????? ???????? ??????</Fa>
      </h2>
      <div className="table-panel">
        <Table>
          <h2>
            <En>Applicantion Info</En>
            <Fa>???????????? ?????????????????</Fa>
          </h2>
          <Tr name="teacherApplicationId" labelFa="?????????? ??????????????" labelEn="Teacher Application Id" defaultValue={ta.teacherApplicationId} />
          <Tr name="applicantFirstname" labelFa="?????? (???? ??????????????)" labelEn="Applicant Firstname (In English)" defaultValue={applicantUser.firstname} />
          <Tr name="applicantLastname" labelFa="?????? ???????????????? (???? ??????????????)" labelEn="Applicant lastname (in English)" defaultValue={applicantUser.lastname} />
          <Tr name="appliacntFirstnameFa" labelFa="?????? (???? ??????????)" labelEn="Applicant Firstname (in Persian)" defaultValue={applicantUser.firstnameFa} />
          <Tr name="applicantLastnameFa" labelFa="?????? ???????????????? (???? ??????????)" labelEn="Applicant lastname (in Persian)" defaultValue={applicantUser.lastnameFa} />
          <Tr name="Applicant Status" labelFa="?????????? ??????????????" labelEn="Application Status" defaultValue={ta.status} />
          <Tr name="adminReviewd" labelFa="?????????? ???????????????????????" labelEn="Admin Reviewed" defaultValue={ta.reviewerAdminId} />
          <Tr name="adminComment" labelFa="?????? ?????????? ??????????" labelEn="Admin Comment" defaultValue={ta.reviewerComments} />
          <h2>
            <En>Applicant Info</En>
            <Fa>???????????? ???????????????????????????</Fa>
          </h2>
          <Tr name="firstname" labelFa="??????" labelEn="firstname" defaultValue={applicantUser.firstname} onChange={handleChange} />
          <Tr name="lastname" labelFa="?????? ????????????????" labelEn="lastname" defaultValue={applicantUser.lastname} onChange={handleChange} />
          <Tr name="firstnameFa" labelFa="?????? (???? ??????????)" labelEn="firstnameFa" defaultValue={applicantUser.firstnameFa} onChange={handleChange} />
          <Tr name="lastnameFa" labelFa="?????? ???????????????? (???? ??????????)" labelEn="lastnameFa" defaultValue={applicantUser.lastnameFa} onChange={handleChange} />
          <Tr name="whatsappNumber" labelFa="?????????? ???????????????" labelEn="whatsappNumber" defaultValue={eta.whatsappNumber} onChange={handleChange} />
          <Tr name="email" labelFa="??????????" labelEn="email" defaultValue={applicantUser.email} onChange={handleChange} />
          <Tr name="city" labelFa="??????" labelEn="city" defaultValue={eta.city} onChange={handleChange} />
          <Tr name="country" labelFa="????????" labelEn="country" defaultValue={eta.country} onChange={handleChange} />
          <h2>
            {" "}
            <En>Expertise</En>
            <Fa>????????</Fa>
          </h2>
          <Tr name="topicId" labelFa="?????????? ???????? ??????????" labelEn="topicId" defaultValue={eta.topic} onChange={handleChange} />
          <Tr name="expertiseName" labelFa="?????? ????????" labelEn="expertiseName" defaultValue={eta.expertiseName} onChange={handleChange} />
          <h2>
            {" "}
            <En>Class to Teach</En>
            <Fa>???????? ???????? ?????? ???????? ??????????</Fa>
          </h2>
          <Tr name="productName" labelFa="?????? ???????? (??????????)" labelEn="productName" defaultValue={eta.productName} onChange={handleChange} />
          <Tr name="classesToTeach" labelFa="???????? ???????? ?????? ???????? ??????????" labelEn="classesToTeach" defaultValue={eta.classesToTeach} onChange={handleChange} />
          <Tr name="sessionDuration" labelFa="?????? ????????" labelEn="sessionDuration" type="number" step="5" min="0" defaultValue={eta.sessionDuration} onChange={handleChange} />
          <Tr name="pricePerSession" labelFa="?????????? ???? ????????" labelEn="pricePerSession" type="number" step="1" min="0" defaultValue={eta.pricePerSession} onChange={handleChange} />
          <Tr name="ageGroup" labelFa="???????? ??????" labelEn="ageGroup" defaultValue={eta.ageGroup} onChange={handleChange} />
          <h2>
            {" "}
            <En>Applicant Experiences</En>
            <Fa>?????????????????</Fa>
          </h2>
          <Tr name="englishFluency" labelFa="???????? ???? ???????? ??????????????" labelEn="englishFluency" defaultValue={eta.englishFluency} onChange={handleChange} />
          <Tr name="levelOfEducation" labelFa="??????????????" labelEn="levelOfEducation" defaultValue={eta.levelOfEducation} onChange={handleChange} />
          <Tr name="university" labelFa="??????????????" labelEn="university" defaultValue={eta.university} onChange={handleChange} />
          <Tr name="inPersonTeachingExperience" labelFa="?????????? ?????????? ???? ??????????" labelEn="inPersonTeachingExperience" isTextArea={true} defaultValue={eta.inPersonTeachingExperience} onChange={handleChange} />
          <Tr name="onlineTeachingExperience" labelFa="?????????? ?????????? ???? ??????????????" labelEn="onlineTeachingExperience" defaultValue={eta.onlineTeachingExperience} onChange={handleChange} />
          <Tr name="abroadTeachingExperience" labelFa="?????????? ?????????? ???????? ???? ??????????" labelEn="abroadTeachingExperience" defaultValue={eta.abroadTeachingExperience} onChange={handleChange} />
          <Tr name="applicantNotes" labelFa="?????????????? ?????????????? ??????????" labelEn="Applicant Notes" defaultValue={eta.applicantNotes} onChange={handleChange} />
          <h2>
            {" "}
            <En>Applicant Social Media</En>
            <Fa>????????????????? ??????????????</Fa>
          </h2>
          <Tr name="instagram" labelFa="????????????????????" labelEn="instagram" defaultValue={eta.instagram} onChange={handleChange} />
          <Tr name="linkedin" labelFa="??????????????" labelEn="linkedin" defaultValue={eta.linkedin} onChange={handleChange} />
          <Tr name="website" labelFa="???????????? ????????" labelEn="website" defaultValue={eta.linkedin} onChange={handleChange} />
        </Table>
        <div className="panel">
          <p className="info">
            <FiInfo />
            <En>You can edit some fields before accepting teacher application. Uss Edit button at the top. Edit will be undone if you close the window.</En>
            <Fa>?????? ???? ?????????????? ???? ?????????? ???????? ??????????????????? ???????? ???????????? ???? ???????????? ????????????. ?????? ???? ???? ???????????? ?????? ?????????? ??????????????????? ?????????? ?????????????? ????.</Fa>
          </p>
          <div className="buttons">
            <button className="reject small-button" onClick={handleReject}>
              <En>Reject</En>
              <Fa>???? ????????</Fa>
            </button>
            <button className="accept small-button" onClick={handleAccept}>
              <En>Edit and Accept</En>
              <Fa>???????????? ?? ?????? ?????????????? ???? ?????????? ????????</Fa>
            </button>
          </div>
        </div>
      </div>
    </Div>
  );
}

// STYLES **************************************

const Div = styled.div`
  background: ghostwhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    width: 100%;
  }

  .page-title {
    text-align: start;
  }

  gap: 2rem;

  .table-panel {
    overflow: hidden;
    padding: 1rem;
    border-radius: 1.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

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
