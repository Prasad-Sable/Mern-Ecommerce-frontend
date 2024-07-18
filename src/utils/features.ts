
import { MessageResponse } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};

// export const transformImage = (url:string,width = 200) => {
//   // const newUrl = url.replace("upload/", `upload/w_200,dpr_auto/`);
//   const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
//   console.log(newUrl)
//   return newUrl;
// };
// https://res.cloudinary.com/dev-prasad/image/upload/w_200,dpr_auto/v1721067936/qfkq0xvqybjqeyttyx1c.jpg

// https://res.cloudinary.com/dev-prasad/image/upload/dpr_auto/w_200/v1721067936/qfkq0xvqybjqeyttyx1c.jpg