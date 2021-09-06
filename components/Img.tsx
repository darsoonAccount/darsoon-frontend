import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface Iprops {
  alt: string;
  src: string;
  className?: string;
}

export default function Img({ alt, src, className }: Iprops) {
  return (
    <StyledDiv className={className}>
      <Image src={src} alt={alt} layout="fill" />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: relative;
  overflow: hidden;
  width: 20px; 
  aspect-ratio: 1/1;
`;
