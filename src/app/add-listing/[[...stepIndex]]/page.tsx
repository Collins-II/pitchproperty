"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/redux-slice/hooks";
import { resetListingData } from "../../../lib/redux-slice/property-slice";
import stepComponents, { stepToKey } from "../stepComponents";

const Page = ({
  params: paramsPromise, // ✅ params is a Promise n
}: {
  params: Promise<{ stepIndex?: string }>; // ✅ Corrected type
}) => {
  const [params, setParams] = React.useState<{ stepIndex?: string }>({});

  React.useEffect(() => {
    paramsPromise.then(setParams); // ✅ Unwrap params using useEffect
  }, [paramsPromise]);

  const stepIndex = Number(params?.stepIndex ?? "1")
  const ContentComponent = stepComponents[stepIndex] || stepComponents[1];

  return <ContentComponent />;
};

export default Page;
