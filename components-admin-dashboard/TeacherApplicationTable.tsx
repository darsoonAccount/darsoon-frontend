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
  const ta = teacherApplication;
  const { applicantUser } = teacherApplication;
  const au = applicantUser;
  const { loggedInUserAdminProfile } = useContext(AuthContext);
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
      reviewerComment: eta?.reviewerComment,
      status: "rejected",
    };

    console.log("reject changes ready");

    const id = teacherApplication.teacherApplicationId;
    api
      .patch(`/api/teacherApplication/${id}/update`, body)
      .then(() => {
        //if successfull => update state
        adminDashDispatch({
          type: ADMIN_DASH_ACTIONS.REJECT_TEACHER_APPLICATION,
          payload: { ...teacherApplication, reviewerAdminId: loggedInUserAdminProfile.adminId, status: "rejected" },
        });
        notify({ en: "Application has been rejected.", fa: "درخوسات رد شد." });
        router.push("/admin-dashboard/teacher-applications/");
      })
      .catch((err) => {
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
      notify({ en: "Application status in database changed to accepted", fa: "وضعیت  درخواست در دریتابیس به پذیرفته شده تغییر کرد.", type: "success" });

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
      notify({ en: "Teacher profile created in db.", fa: "پروفایل معلم در دیتابیس ساخته شد.", type: "success" });
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
      notify({ en: "Expertise is created in db.", fa: "تخصص معلم در دیتابیس ثبت شد.", type: "success" });

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
      notify({ en: "Product is created in db.", fa: "کلاس (محصول) این معلم در دیتابیس ایجاد شد.", type: "success" });
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
        <Fa>درخواست معلم شدن</Fa>
      </h2>
      <div className="table-panel">
        <Table>
          <h2>
            <En>Applicantion Info</En>
            <Fa>مشخصات درخواست‌</Fa>
          </h2>
          <Tr name="teacherApplicationId" labelFa="شناسه درخواست" labelEn="Teacher Application Id" defaultValue={ta.teacherApplicationId} />
          <Tr name="applicantFirstname" labelFa="نام (به انگلیسی)" labelEn="Applicant Firstname (In English)" defaultValue={applicantUser.firstname} />
          <Tr name="applicantLastname" labelFa="نام خانوادگی (به انگلیسی)" labelEn="Applicant lastname (in English)" defaultValue={applicantUser.lastname} />
          <Tr name="appliacntFirstnameFa" labelFa="نام (به فارسی)" labelEn="Applicant Firstname (in Persian)" defaultValue={applicantUser.firstnameFa} />
          <Tr name="applicantLastnameFa" labelFa="نام خانوادگی (به فارسی)" labelEn="Applicant lastname (in Persian)" defaultValue={applicantUser.lastnameFa} />
          <Tr name="Applicant Status" labelFa="وضعیت درخواست" labelEn="Application Status" defaultValue={ta.status} />
          <Tr name="adminReviewd" labelFa="ادمین بررسی‌کننده" labelEn="Admin Reviewed" defaultValue={ta.adminReviewrId} />
          <Tr name="adminComment" labelFa="نظر بررسی کننده" labelEn="Admin Comment" defaultValue={ta.adminComment} />
          <h2>
            <En>Applicant Info</En>
            <Fa>مشخصات درخواست‌کننده</Fa>
          </h2>
          <Tr name="firstname" labelFa="نام" labelEn="firstname" defaultValue={eta.firstname} onChange={handleChange} />
          <Tr name="lastname" labelFa="نام خانوادگی" labelEn="lastname" defaultValue={eta.lastname} onChange={handleChange} />
          <Tr name="firstnameFa" labelFa="نام (به فارسی)" labelEn="firstnameFa" defaultValue={eta.firstnameFa} onChange={handleChange} />
          <Tr name="lastnameFa" labelFa="نام خانوادگی (به فارسی)" labelEn="lastnameFa" defaultValue={eta.lastnameFa} onChange={handleChange} />
          <Tr name="whatsappNumber" labelFa="شماره واتس‌اپ" labelEn="whatsappNumber" defaultValue={eta.whatsappNumber} onChange={handleChange} />
          <Tr name="email" labelFa="ایمیل" labelEn="email" defaultValue={eta.email} onChange={handleChange} />
          <Tr name="city" labelFa="شهر" labelEn="city" defaultValue={eta.city} onChange={handleChange} />
          <Tr name="country" labelFa="کشور" labelEn="country" defaultValue={eta.country} onChange={handleChange} />
          <h2>
            {" "}
            <En>Expertise</En>
            <Fa>تخصص</Fa>
          </h2>
          <Tr name="topicId" labelFa="شناسه شاخه تخصصی" labelEn="topicId" defaultValue={eta.topicId} onChange={handleChange} />
          <Tr name="expertiseName" labelFa="نام تخصص" labelEn="expertiseName" defaultValue={eta.expertiseName} onChange={handleChange} />
          <h2>
            {" "}
            <En>Class to Teach</En>
            <Fa>کلاس مورد نظر برای تدریس</Fa>
          </h2>
          <Tr name="productName" labelFa="نام کلاس (محصول)" labelEn="productName" defaultValue={eta.productName} onChange={handleChange} />
          <Tr name="classesToTeach" labelFa="کلاس مورد نظر برای تدریس" labelEn="classesToTeach" defaultValue={eta.classesToTeach} onChange={handleChange} />
          <Tr name="sessionDuration" labelFa="مدت کلاس" labelEn="sessionDuration" type="number" step="5" min="0" defaultValue={eta.sessionDuration} onChange={handleChange} />
          <Tr name="pricePerSession" labelFa="هزینه هر جلسه" labelEn="pricePerSession" type="number" step="1" min="0" defaultValue={eta.pricePerSession} onChange={handleChange} />
          <Tr name="ageGroup" labelFa="گروه سنی" labelEn="ageGroup" defaultValue={eta.ageGroup} onChange={handleChange} />
          <h2>
            {" "}
            <En>Applicant Experiences</En>
            <Fa>تجربه‌ها</Fa>
          </h2>
          <Tr name="englishFluency" labelFa="تسلط به زبان انگلیسی" labelEn="englishFluency" defaultValue={eta.englishFluency} onChange={handleChange} />
          <Tr name="levelOfEducation" labelFa="تحصیلات" labelEn="levelOfEducation" defaultValue={eta.levelOfEducation} onChange={handleChange} />
          <Tr name="university" labelFa="دانشگاه" labelEn="university" defaultValue={eta.university} onChange={handleChange} />
          <Tr name="inPersonTeachingExperience" labelFa="تجربه تدریس به فارسی" labelEn="inPersonTeachingExperience" isTextArea={true} defaultValue={eta.inPersonTeachingExperience} onChange={handleChange} />
          <Tr name="onlineTeachingExperience" labelFa="تجربه تدریس به انگلیسی" labelEn="onlineTeachingExperience" defaultValue={eta.onlineTeachingExperience} onChange={handleChange} />
          <Tr name="abroadTeachingExperience" labelFa="تجربه تدریس خارج از ایران" labelEn="abroadTeachingExperience" defaultValue={eta.abroadTeachingExperience} onChange={handleChange} />
          <Tr name="applicantNotes" labelFa="یادداشت درخواست کننده" labelEn="Applicant Notes" defaultValue={eta.applicantNotes} onChange={handleChange} />
          <h2>
            {" "}
            <En>Applicant Social Media</En>
            <Fa>شبکه‌های اجتماعی</Fa>
          </h2>
          <Tr name="instagram" labelFa="اینستاگرام" labelEn="instagram" defaultValue={eta.instagram} onChange={handleChange} />
          <Tr name="linkedin" labelFa="لینکدین" labelEn="linkedin" defaultValue={eta.linkedin} onChange={handleChange} />
          <Tr name="website" labelFa="وبسایت شخصی" labelEn="website" defaultValue={eta.linkedin} onChange={handleChange} />
        </Table>
        <div className="panel">
          <p className="info">
            <FiInfo />
            <En>You can edit some fields before accepting teacher application. Uss Edit button at the top. Edit will be undone if you close the window.</En>
            <Fa>پیش از پذیرفتن به عنوان معلم می‌توانید برخی فیلدها را ویرایش نمایید. اگر پس از ویرایش ثبت نکنید ویرایش‌ها ذخیره نخواهند شد.</Fa>
          </p>
          <div className="buttons">
            <button className="reject small-button" onClick={handleReject}>
              <En>Reject</En>
              <Fa>رد کردن</Fa>
            </button>
            <button className="accept small-button" onClick={handleAccept}>
              <En>Edit and Accept</En>
              <Fa>ویرایش و سپس پذیرفتن به عنوان معلم</Fa>
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
