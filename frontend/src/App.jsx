import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Frontend validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 18 || formData.age > 60) {
      newErrors.age = "Age must be between 18 and 60";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });

    setMessage("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Something went wrong");
        return;
      }

      setMessage("Student added successfully!");

      setFormData({
        name: "",
        email: "",
        age: "",
        course: ""
      });

      setErrors({});
    } catch (error) {
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial"
      }}
    >
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

          <p style={{ color: "red" }}>{errors.name}</p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

          <p style={{ color: "red" }}>{errors.email}</p>
        </div>

        {/* Age */}
        <div style={{ marginBottom: "15px" }}>
          <label>Age:</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

          <p style={{ color: "red" }}>{errors.age}</p>
        </div>

        {/* Course */}
        <div style={{ marginBottom: "15px" }}>
          <label>Course:</label>

          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px"
            }}
          />

          <p style={{ color: "red" }}>{errors.course}</p>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Add Student
        </button>

      </form>

      {message && (
        <h3 style={{ marginTop: "20px" }}>
          {message}
        </h3>
      )}
    </div>
  );
}

export default App;