import dayjs from "dayjs";
import "dayjs/locale/ko";

export const API_BASE_URL = "https://ken-lab-api.fly.dev/";
export const days = ["일", "월", "화", "수", "목", "금", "토"];
export const $dayjs = dayjs().locale("ko");
export const dateString = $dayjs.format("YYYY-MM-DD");
