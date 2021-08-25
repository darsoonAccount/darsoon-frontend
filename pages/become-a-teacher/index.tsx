import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import { useAuth } from "../../contexts/AuthProvider";
import LoginBox from "../../components/LoginBox";
import InfoBox from "../../components/InfoBox";

export default function BecomeATeacherPage() {
  const { loggedInUser } = useAuth();

  return (
    <Page>
      {!loggedInUser && (
        <>
          <InfoBox>Please create an account first. If you allready have an account, Log in to your account.</InfoBox>
          <LoginBox redirectTo="/become-a-teacher" />
        </>
      )}
      {loggedInUser && (
        <>
          <p>لطفا فرم زیر را پر نمایید</p>
          <Form url="/api/teacherApplications/add" method="POST">
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
              <option>هنر</option>
              <option>موسیقی</option>
              <option>فارسی</option>
              <option>زبان‌</option>
              <option>ورزش</option>
              <option>علوم و ریاضی</option>
              <option>کامپیوتر</option>
              <option>سایر</option>
            </Select>

            <TextInput name="pricePerSession" type="number" step="0.01" label="price" placeholder="هزینه هر جلسه (به دلار کانادا)" />
            <TextInput name="sessionDuration" type="number" step="1" label="sessionDuration" placeholder="طول زمانی هر جلسه (به دقیقه)" />
            <TextInput name="ageGroup" label="ageGroup" placeholder="گروه سنی مناسب" />

            <p>سابقه کاری و تحصیلی شما</p>
            <TextInput name="levelOfEducation" label="levelOfEducation" placeholder="مدرک تحصیلی" />
            <TextInput label="university" placeholder=" دانشگاه محل تحصیل" />
            <TextArea name="inPersonTeachingExperience" label="inPersonTeachingExperience" placeholder="تجربه تدریس حضوری (مثلا پنج سال تدرس در آموزشگاه خوارزمی)" />
            <TextArea name="onlineTeachingExperience" label="onlineTeachingExperience" placeholder="تجربه تدریس آنلاین (دو سال تدریس آنلاین به حدود 20 شاگرد)" />
            <TextArea name="abroadTeachingExperience" label="onlineTeachingExperience" placeholder="تجربه تدریس به ایرانیان خارج از کش ور (مثلا شش ماه تدریس گیتار به سه بچه دوزبانه در کانادا)" />

            <TextArea label="notes" placeholder="هر مطلب دیگری که دانستن آن برای ما مفید است" />
          </Form>
        </>
      )}
    </Page>
  );
}
const Page = styled.div`
  padding: 1.5rem;
  display: grid;
  place-items: center;
  gap: 1rem;
  width: 100%;
`;
