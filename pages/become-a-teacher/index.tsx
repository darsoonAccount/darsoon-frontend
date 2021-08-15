import React from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../contexts/AuthProvider";
export default function BecomeATeacherPage() {
  const { loggedInUser } = useAuth();

  return (
    <Div>
      {!loggedInUser ? (
        <>
          <p>
            لطفا ابتدا از <a href="/login">این لینک</a>وارد حساب خوب شوید.
          </p>
        </>
      ) : (
        <>
          <p>لطفا فرم زیر را پر نمایید</p>
          <Form url="/api/changeRequests/add" method="POST">
            <labe>شاخه تخصصی</labe>
            <select>
              <option>هنر</option>
              <option>موسیقی</option>
              <option>فارسی</option>
              <option>زبان‌</option>
              <option>ورزش</option>
              <option>علوم و ریاضی</option>
              <option>کامپیوتر</option>
              <option>سایر</option>
            </select>
            <TextInput label="education" placeholder="مدرک تحصیلی" />
            <TextInput label="university" placeholder=" دانشگاه محل تحصیل" />
            <TextInput label="instagram" placeholder="صفحه کاری اینستاکرام" />
            <TextInput label="linkedin" placeholder="صفحه لینکدین" />
            <TextInput label="website" placeholder="وبسایت شخصی" />
            <TextInput label="refrence" placeholder="نام معرف" />
            <TextInput label="price" placeholder="هزینه هر جلسه (به دلار کانادا)" />
            <TextInput label="sessionDuration" placeholder="طول زمانی هر جلسه (به دقیقه)" />
            <TextInput label="ageGroup" placeholder="گروه سنی مناسب" />
            <TextInput label="country" placeholder="کشور محل سکونت" />
            <TextInput label="city" placeholder="شهر محل سکونت" />
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
`;
