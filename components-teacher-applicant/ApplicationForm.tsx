import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";
import { useApi, useNotif } from "../contexts/AppProvider";

export default function ApplicationForm({ handleDataAfterSuccess, isTwoColumns }) {
  const { loggedInUser } = useAuth();
  const [topics, setTopics] = useState(null);
  const { api } = useApi();
  const { notify } = useNotif();

  useEffect(() => {
    api
      .get("/api/topic")
      .then((res) => {

        setTopics(res.data.data);
      })
      .catch((err) => {
        notify("Something went wrong. please reload the page", "error");
      });
  }, []);

  return (
    <Form url="/api/teacherApplication/add" method="POST" handleDataAfterSuccess={handleDataAfterSuccess} isTwoColumns={isTwoColumns}>
      <p>اطلاعات کاربری</p>
      <TextInput name="firstnameFa" label="firstnameFa" placeholder="نام" />
      <TextInput name="lastnameFa" label="lastnameFa" placeholder="نام خانوادگی" />
      <TextInput name="firstname" label="firstname" placeholder="نام به انگلیسی" />
      <TextInput label="lastname" placeholder=" نام خانوادگی به انگلیسی" />
      <TextInput label="email" placeholder=" ایمیل" />
      <TextInput label="country" placeholder="کشور محل سکونت" />
      <TextInput label="city" placeholder="شهر محل سکونت" />

      <TextInput label="instagram" placeholder="صفحه کاری اینستاکرام" />
      <TextInput label="linkedin" placeholder="صفحه لینکدین" />
      <TextInput label="website" placeholder="وبسایت شخصی" />
      <TextInput name="nameOfRefrencePerson" label="refrence" placeholder="نام معرف" />
      <p>کلاسی که می‌خواهید درس بدهید</p>

      <Select name="topics" label="شاخه تخصصی">
        {topics && topics.length > 0 ? (
          <>
            {topics.map((topic) => {
              return <option value={topic.topicId}>{topic.nameFa}</option>;
            })}
          </>
        ) : (
          <option disabled>در حال بارگزاری... </option>
        )}
      </Select>
      <TextInput name="expertiseName" label="expertiseName" placeholder="موضوع کلاس" />
      <TextInput name="productName" label="productName" placeholder="نام کلاس" />

      <TextInput name="pricePerSession" type="number" step="0.01" label="price" placeholder="هزینه هر جلسه (به دلار کانادا)" />
      <TextInput name="sessionDuration" type="number" step="1" label="sessionDuration" placeholder="طول زمانی هر جلسه (به دقیقه)" />
      <TextInput name="ageGroup" label="ageGroup" placeholder="گروه سنی مناسب" />

      <p>سابقه کاری و تحصیلی شما</p>
      <TextInput name="levelOfEducation" label="levelOfEducation" placeholder="مدرک تحصیلی" />
      <TextInput label="university" placeholder=" دانشگاه محل تحصیل" />
      <TextArea name="inPersonTeachingExperience" label="inPersonTeachingExperience" placeholder="تجربه تدریس حضوری (مثلا پنج سال تدرس در آموزشگاه خوارزمی)" />
      <TextArea name="onlineTeachingExperience" label="onlineTeachingExperience" placeholder="تجربه تدریس آنلاین (دو سال تدریس آنلاین به حدود 20 شاگرد)" />
      <TextArea name="abroadTeachingExperience" label="onlineTeachingExperience" placeholder="تجربه تدریس به ایرانیان خارج از کش ور (مثلا شش ماه تدریس گیتار به سه بچه دوزبانه در کانادا)" />
      <TextArea name="applicantNotes" label="applicantNotes" placeholder="هر مطلب دیگری که دانستن آن برای ما مفید است" />
      <TextInput name="applicantUserId" label="applicantUserId" placeholder="applicantUserId" defaultValue={loggedInUser.userId} isHidden={true} />
    </Form>
  );
}

const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  border: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template: 1fr / 1fr;
`;
