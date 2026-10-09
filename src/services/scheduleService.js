import axios from "axios";

const API_URL = "https://campus-companion-back.vercel.app/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/*
 * Schedule is derived from Courses.
 *
 * Only courses that have a valid schedule object
 * are returned.
 */

export async function getSchedule() {
  const response = await axios.get(`${API_URL}/courses`, {
    headers: getAuthHeaders(),
  });

  const courses = response.data.data || [];

  return courses.filter(
    (course) =>
      course.schedule &&
      typeof course.schedule === "object" &&
      course.schedule.day &&
      course.schedule.startTime &&
      course.schedule.endTime,
  );
}

/*
 * Add / update course schedule
 */

export async function updateCourseSchedule(courseId, schedule) {
  const response = await axios.put(
    `${API_URL}/courses/${courseId}`,
    {
      schedule,
    },
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data;
}

/*
 * Remove course from schedule
 */

export async function removeCourseSchedule(courseId) {
  const response = await axios.put(
    `${API_URL}/courses/${courseId}`,
    {
      schedule: null,
    },
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data;
}
