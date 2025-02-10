import { fetchFormsData } from "@/db/db";
import { groupByField, groupBySenator } from "./utils";

export async function fetchAllByCourse() {
  const { data } = await fetchFormsData();
  const entries = groupByField(data, "course");
  const sortedCourses = Array.from(entries).sort((a, b) => b[1] - a[1]);
  return sortedCourses;
}

export async function fetchAllByDepartment() {
  const { data } = await fetchFormsData();
  const entries = groupByField(data, "department");
  const sortedDepartments = Array.from(entries).sort((a, b) => b[1] - a[1]);
  return sortedDepartments;
}

export async function fetchAllBySenator() {
  const { data } = await fetchFormsData();
  const result = groupBySenator(data);
  return result;
}
