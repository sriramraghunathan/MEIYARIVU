const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= EXISTING ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/videos", require("./routes/videos"));
app.use("/api/tests", require("./routes/tests"));
app.use("/api/scores", require("./routes/scores"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/liveclasses", require("./routes/liveclasses"));

// ================= STATIC UPLOADS =================
app.use("/uploads", express.static("uploads"));

// ================= ROOT =================
app.get("/", (req, res) => res.send("TNPSC Coach API running"));

app.get("/ping", (req, res) => res.json({ status: "ok" }));

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Request error:", err);

  if (res.headersSent) return next(err);

  return res.status(400).json({
    msg: err?.message || "Invalid request payload",
  });
});


const { Document, Packer, Paragraph, TextRun } = require("docx");

// ================= ENROLL MODEL =================
const EnrollSchema = new mongoose.Schema({
  appNo: String,
  name: String,
  dob: String,
  gender: String,
  contact: String,
  presentAddress: String,
  permanentAddress: String,
  fatherName: String,
  fatherOccupation: String,
  motherName: String,
  motherOccupation: String,
  parentContact: String,
  exam: String,
  examName: String,
  selectedCourse: String,
  photo: String,
});

const Enroll = mongoose.model("Enroll", EnrollSchema);

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= POST ENROLL =================
app.post("/api/enroll", upload.single("photo"), async (req, res) => {
  try {
    const newEnroll = new Enroll({
      ...req.body,
      photo: req.file?.filename,
    });

    await newEnroll.save();

    res.json({
      success: true,
      message: "Enrollment submitted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ================= GET ENROLLMENTS =================
app.get("/api/enroll", async (req, res) => {
  try {
    const data = await Enroll.find().sort({ _id: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/api/enroll/word/:id", async (req, res) => {
  try {
    const student = await Enroll.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "MEIYARIVU COMPETITIVE EXAMS",
                  bold: true,
                  size: 36,
                }),
              ],
            }),

            new Paragraph(" "),

            new Paragraph(`Application Number: ${student.appNo || ""}`),
            new Paragraph(`Name: ${student.name || ""}`),
            new Paragraph(`Date of Birth: ${student.dob || ""}`),
            new Paragraph(`Gender: ${student.gender || ""}`),
            new Paragraph(`Contact: ${student.contact || ""}`),
            new Paragraph(`Present Address: ${student.presentAddress || ""}`),
            new Paragraph(`Permanent Address: ${student.permanentAddress || ""}`),
            new Paragraph(`Father Name: ${student.fatherName || ""}`),
            new Paragraph(`Father Occupation: ${student.fatherOccupation || ""}`),
            new Paragraph(`Mother Name: ${student.motherName || ""}`),
            new Paragraph(`Mother Occupation: ${student.motherOccupation || ""}`),
            new Paragraph(`Parent Contact: ${student.parentContact || ""}`),
            new Paragraph(`Exam: ${student.exam || ""}`),
            new Paragraph(`Exam Name: ${student.examName || ""}`),
            new Paragraph(`Selected Course: ${student.selectedCourse || ""}`),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${student.name}.docx`
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE ENROLLMENT =================
app.delete("/api/enroll/:id", async (req, res) => {
  try {
    await Enroll.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `🚀 Server running on port ${process.env.PORT || 5000}`
      )
    );
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });