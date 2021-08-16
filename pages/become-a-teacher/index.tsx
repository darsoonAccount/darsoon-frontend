import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import { useAuth } from "../../contexts/AuthProvider";

export default function BecomeATeacherPage() {
  const { loggedInUser } = useAuth();

  return (
    <Div>
      {!loggedInUser && (
        <p>
          لطفا ابتدا از <a href="/login">این لینک </a>وارد حساب خود شوید.
        </p>
      )}
      {loggedInUser && (
        <>
          <p>لطفا فرم زیر را پر نمایید</p>
          <Form url="/api/teacherApplications/add" method="POST">
            <p>اطلاعات کاربری</p>
            <TextInput label="firtname" placeholder="نام" />
            <TextInput label="firtname" placeholder="نام به انگلیسی" />
            <TextInput label="lastname" placeholder="نام خانوادگی" />
            <TextInput
              label="lastname"
              placeholder=" نام خانوادگی به انگلیسی"
            />
            <TextInput label="email" placeholder=" ایمیل" />
            <TextInput label="country" placeholder="کشور محل سکونت" />
            <TextInput label="city" placeholder="شهر محل سکونت" />

            <TextInput label="instagram" placeholder="صفحه کاری اینستاکرام" />
            <TextInput label="linkedin" placeholder="صفحه لینکدین" />
            <TextInput label="website" placeholder="وبسایت شخصی" />
            <TextInput label="refrence" placeholder="نام معرف" />
            <p>کلاسی که می‌خواهید درس بدهید</p>

            <Select label="شاخه تخصصی">
              <option>هنر</option>
              <option>موسیقی</option>
              <option>فارسی</option>
              <option>زبان‌</option>
              <option>ورزش</option>
              <option>علوم و ریاضی</option>
              <option>کامپیوتر</option>
              <option>سایر</option>
            </Select>

            <TextInput
              label="price"
              placeholder="هزینه هر جلسه (به دلار کانادا)"
            />
            <TextInput
              label="sessionDuration"
              placeholder="طول زمانی هر جلسه (به دقیقه)"
            />
            <TextInput label="ageGroup" placeholder="گروه سنی مناسب" />

            <p>سابقه کاری و تحصیلی شما</p>
            <TextInput label="education" placeholder="مدرک تحصیلی" />
            <TextInput label="university" placeholder=" دانشگاه محل تحصیل" />
            <TextArea
              label="notes"
              placeholder="تجربه تدریس حضوری (مثلا پنج سال تدرس در آموزشگاه خوارزمی)"
            />
            <TextArea
              label="notes"
              placeholder="تجربه تدریس آنلاین (دو سال تدریس آنلاین به حدود 20 شاگرد)"
            />
            <TextArea
              label="notes"
              placeholder="تجربه تدریس به ایرانیان خارج از کش ور (مثلا شش ماه تدریس گیتار به سه بچه دوزبانه در کانادا)"
            />

            <TextArea
              label="notes"
              placeholder="هر مطلب دیگری که دانستن آن برای ما مفید است"
            />
          </Form>
        </>
      )}
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
