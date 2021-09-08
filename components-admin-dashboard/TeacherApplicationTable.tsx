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

export default function TeacherApplicationTable({ teacherApplication }: any) {
  const { applicantUser } = teacherApplication;
  const { loggedInUserAdminProfile } = useContext(AuthContext);
  const { api } = useApi();
  // const router = useRouter();
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

      notify({ en: "Application status in database changed to accepted", fa: "وضعیت  درخوسواست در دریتابیس به ذیرفته شده تغییر کرد.", type: "success" });
      //if successfull => update state
      adminDashDispatch({
        type: ADMIN_DASH_ACTIONS.ACCEPT_TEACHER_APPLICATION,
        payload: teacherApplicationBody,
      });
      notify({ en: "Teacher Application is updated in the frontend.", fa: "درخواست معلم در فرانتاند بروزرسانی شد.", type: "success" });

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
      notify({ en: "Teacher profile created in db.", fa: "پروفایل معلم در دیتابیس ساخته شد.", type: "success" });
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
      notify({ en: "Expertise is created in db.", fa: "تخصص در دیتابیس ثبت شد.", type: "success" });

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
      notify({ en: "Product is created in db.", fa: "محصول در دیتابیس ایجاد شد.", type: "success" });
    } catch (error) {
      // console.log("Error request:", error.request);
      console.log("Error response:", error.response);
      notify({ en: `Error ${error.message}`, fa: `Error ${error.message}`, type: "error" });
    }
  };

  return (
    <Div>
      <h2>Teacher Application</h2>
      <div className="table-panel">
        <Table>
          <Tr name="Teacher Application Id" defaultValue={teacherApplication.teacherApplicationId} />
          <Tr name="Applicant firstname" defaultValue={applicantUser.firstname} />
          <Tr name="Applicant lastame" defaultValue={applicantUser.lastname} />
          <Tr name="Application Status" defaultValue={teacherApplication.status} />
          <Tr name="Admin Reviewed" defaultValue={teacherApplication.adminReviewrId} />
          <Tr name="Admin Comments" defaultValue={teacherApplication.teacherApplicationId} />
          <Tr name="Teacher Application" defaultValue={teacherApplication.teacherApplicationId} />
        </Table>
      </div>
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
        <Tr name="sessionDuration" type="number" step="5" min="0" defaultValue={editedTeacherApplication.sessionDuration} onChange={handleChange} />
        <Tr name="pricePerSession" type="number" step="1" min="0" defaultValue={editedTeacherApplication.pricePerSession} onChange={handleChange} />
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

  .table-panel {
    overflow: hidden;
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
