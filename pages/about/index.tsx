import React from 'react';
import styled from 'styled-components';
export default function aboutPage () {
    
    return (
    <Page>
        <h1>About Darsoon</h1>
        <p>Darsoon is an startup who helps iranian people to connect to great teachers and tutors</p>
    </Page>
)};
const Page = styled.div`
padding: 1.5rem;
border-radius: 1.5rem;
background: ghostwhite;
display:grid;
place-items: center;
gap: 1rem;
`