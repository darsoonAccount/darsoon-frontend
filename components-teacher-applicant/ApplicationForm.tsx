import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form/Form";
import TextArea from "../components/Form/TextArea";
import TextInput from "../components/Form/TextInput";
import Select from "../components/Form/Select";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";
import { useApi, useNotif } from "../contexts/AppProvider";
import T from "../components/translation/T";
import En from "../components/translation/En";
import Fa from "../components/translation/Fa";

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
        notify({ en: "Something went wrong. please reload the page", fa: "خطایی  پیش آمد. لطفا صفحه را بروز کنید.", type: "error" });
      });
  }, []);

  return (
    <Form url="/api/teacherApplication/add" handleDataAfterSuccess={handleDataAfterSuccess} isTwoColumns={isTwoColumns}>
      <p>
        <En>User Information</En>
        <Fa>اطلاعات کاربر</Fa>
      </p>
      <TextInput name="country" labelEn="Country" labelFa="کشور محل سکونت" />
      <TextInput name="city" labelEn="city" labelFa="شهر محل سکونت" />

      <TextInput name="instagram" labelEn="Instagram" labelFa=" صفحه کاری ایسنتاگرام کاری" />
      <TextInput name="linkedin" labelEn="linkedin" labelFa="صفحه لینکدین" />
      <TextInput name="website" labelEn="website" labelFa="وبسایت شخصی" />
      <TextInput name="nameOfRefrencePerson" labelEn="refrence" labelFa="نام معرف" />
      <p>
        <En>Classes you want to teach:</En>
        <Fa>کلاسی که می‌خواهید درس بدهید</Fa>
      </p>

      <Select name="topics" labelEn="topics" labelFa="شاخه تخصصی">
        {topics && topics.length > 0 ? (
          <>
            <En>
              {topics.map((topic) => {
                return <option value={topic.topicId}>{topic.name}</option>;
              })}
            </En>
            <Fa>
              {topics.map((topic) => {
                return <option value={topic.topicId}>{topic.nameFa}</option>;
              })}
            </Fa>
          </>
        ) : (
          <>
            <En>
              <option disabled>Loading...</option>
            </En>
            <Fa>
              <option disabled>در حال بارگزاری...</option>
            </Fa>
          </>
        )}
      </Select>
      <TextInput name="expertiseName" labelEn="Expertise" labelFa="موضوع کلاس" />
      <TextInput name="productName" labelEn="Product (Class) name" labelFa="نام کلاس" />

      <TextInput name="pricePerSession" type="number" step="1" labelEn="Price" labelFa="هزینه هر جلسه (به دلار کانادا)" />
      <TextInput name="sessionDuration" type="number" step="5" labelEn="Session Duration" labelFa="طول زمانی هر جلسه (به دقیقه)" />
      <Select name="ageGroup" labelEn="Age Group" labelFa="گروه سنی مناسب">
        <Fa>
          <option>خردسال (۴ تا ۶ سال)</option>
          <option>کودک (۷ تا ۱۲ سال)</option>
          <option>نوجوان (۱۳ تا ۱۸ سال)</option>
          <option>بزرگسال (۱۹ تا ۶۴ سال)</option>
          <option>ارشد (۶۵ سال به بالا)</option>
        </Fa>
        <En>
          <option>Child (4 to 6 years)</option>
          <option>Child (6 to 12 years)</option>
          <option>Teenager (13 to 18 years)</option>
          <option>Adult (19 to 64 years)</option>
          <option>Senior (over 65 years)</option>
        </En>
      </Select>
      <p>
        {/* <En>Education and Experiences</En> */}
        <Fa>سابقه کاری و تحصیلی شما</Fa>
      </p>
      <TextInput name="levelOfEducation" labelEn="Level of Education" labelFa="مدرک تحصیلی" />
      <TextInput name="university" labelEn="University" labelFa="دانشگاه محل تحصیل" />
      <TextArea name="inPersonTeachingExperience" labelEn="In Person Teaching Experience" labelFa="تجربه تدریس حضوری (مثلا پنج سال تدرس در آموزشگاه خوارزمی)" />
      <TextArea name="onlineTeachingExperience" labelEn="Online Teaching Experience" labelFa="تجربه تدریس آنلاین (دو سال تدریس آنلاین به حدود 20 شاگرد)" />
      <TextArea name="abroadTeachingExperience" labelEn="Teaching Experience outsie of Iran" labelFa="تجربه تدریس به ایرانیان خارج از کش ور (مثلا شش ماه تدریس گیتار به سه بچه دوزبانه در کانادا)" />
      <TextArea name="applicantNotes" labelEn="Any other piece of information that would help us on reviewing your application" labelFa="هر مطلب دیگری که دانستن آن برای ما مفید است" />
      <TextInput name="applicantUserId" labelEn="Applicant User Id" labelFa="شناسه کاربر درخواست کننده" defaultValue={loggedInUser?.userId} isHidden={true} />
      <button className="button" type="submit">
        <En>Submit</En>
        <Fa>ارسال درخواست</Fa>
      </button>
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
