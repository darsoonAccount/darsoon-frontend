import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";

export type nextComponentWithLayout<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  Layout?: ComponentType;
};
