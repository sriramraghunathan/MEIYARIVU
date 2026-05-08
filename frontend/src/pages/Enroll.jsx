import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function Enroll() {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => data.append(key, form[key]));

    data.append("photo", photo);

    try {
      await axios.post(`${API_BASE_URL}/api/enroll`, data);

      alert("Submitted!");
    } catch (err) {
      console.log(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 border">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          MEIYARIVU COMPETITIVE EXAMS
        </h1>
        <p>meiyarivuacademy1@gmail.com</p>
      </div>

      {/* TITLE */}
      <div className="text-center my-4">
        <span className="bg-blue-700 text-white px-6 py-1 font-semibold">
          Application Form
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* TOP SECTION */}
        <div className="flex gap-4">
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center">
              <label className="w-48 font-semibold">Application Number</label>
              <input
                className="border w-full p-1"
                name="appNo"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-48 font-semibold">Name</label>
              <input
                className="border w-full p-1"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="w-48 font-semibold">Date of Birth</label>
              <input
                type="date"
                className="border p-1"
                name="dob"
                onChange={handleChange}
              />
              <label className="font-semibold">Gender</label>
              <input
                className="border p-1 w-32"
                name="gender"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-semibold">Present Address :</label>
              <textarea
                className="border w-full h-20 p-1"
                name="presentAddress"
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label className="font-semibold">Permanent Address :</label>
              <textarea
                className="border w-full h-20 p-1"
                name="permanentAddress"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex items-center">
              <label className="w-48 font-semibold">Contact Number</label>
              <input
                className="border w-full p-1"
                name="contact"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* PHOTO BOX (RIGHT SIDE EXACT LIKE PDF) */}
          <div className="w-40 text-center">
            <div className="border-2 h-48 flex items-center justify-center">
              {preview ? (
                <img src={preview} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs">Recent Passport Size Photo</span>
              )}
            </div>

            <input
              type="file"
              onChange={handlePhoto}
              className="mt-2 text-xs"
            />
          </div>
        </div>

        {/* PARENT INFO BOX */}
        <div className="border rounded-lg mt-4 p-4">
          <div className="bg-blue-700 text-white px-4 py-1 inline-block mb-3">
            Parent Information's
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="fatherName"
              placeholder="Father's Name"
              className="border p-1"
              onChange={handleChange}
            />
            <input
              name="fatherOccupation"
              placeholder="Father's Occupation"
              className="border p-1"
              onChange={handleChange}
            />
            <input
              name="motherName"
              placeholder="Mother's Name"
              className="border p-1"
              onChange={handleChange}
            />
            <input
              name="motherOccupation"
              placeholder="Mother's Occupation"
              className="border p-1"
              onChange={handleChange}
            />
          </div>

          <input
            name="parentContact"
            placeholder="Contact Details"
            className="border w-full mt-3 p-1"
            onChange={handleChange}
          />
        </div>

        {/* EXAMS */}
        <div className="mt-4">
          <div className="bg-blue-700 text-white px-4 py-1 inline-block">
            Exams Attended
          </div>

          <p className="mt-2">
            Have you appeared in any Govt. Examination earlier ?
          </p>

          <div className="flex gap-6 mt-1">
            <label>
              <input
                type="radio"
                name="exam"
                value="No"
                onChange={handleChange}
              />{" "}
              No
            </label>
            <label>
              <input
                type="radio"
                name="exam"
                value="Yes"
                onChange={handleChange}
              />{" "}
              Yes
            </label>
          </div>

          <textarea
            name="examName"
            placeholder="Name of the Examination"
            className="border w-full mt-2 p-1 h-16"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* EDUCATION TABLE */}
        <div className="mt-4">
          <div className="bg-blue-700 text-white px-4 py-1 inline-block">
            Education Details
          </div>

          <table className="w-full border mt-2 text-sm">
            <thead>
              <tr>
                <th className="border p-1">Class</th>
                <th className="border p-1">Institution</th>
                <th className="border p-1">Year</th>
                <th className="border p-1">Marks %</th>
                <th className="border p-1">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {["10th", "12th", "UG", "PG"].map((c) => (
                <tr key={c}>
                  <td className="border p-1">{c}</td>
                  <td className="border p-1">
                    <input className="w-full" />
                  </td>
                  <td className="border p-1">
                    <input className="w-full" />
                  </td>
                  <td className="border p-1">
                    <input className="w-full" />
                  </td>
                  <td className="border p-1">
                    <input className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mt-4 text-sm">
          <p className="font-semibold">Instructions to be noted</p>
          <p>1. Fees once paid shall not be refunded.</p>
          <p>2. Admission shall not be transferable.</p>
          <p>3. Institution may publish student details.</p>
          <p>4. Fees & class timings may change.</p>
          <p>5. Students must maintain discipline.</p>
        </div>

        {/* FOOTER */}
        <div className="mt-4">
          <input
            name="selectedCourse"
            placeholder="Selected Course"
            className="border w-full p-1"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between mt-6 text-sm">
          <div>
            <p>Place :</p>
            <p>Date :</p>
          </div>

          <div className="flex gap-16">
            <p>Authorised Signature</p>
            <p>Candidate Signature</p>
          </div>
        </div>

        <button className="mt-4 bg-blue-700 text-white px-6 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
