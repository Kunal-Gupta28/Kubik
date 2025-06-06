import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import DarkModeToggle from "../components/DarkModeToggle";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUserData = {
      fullname: { firstname: firstName, lastname },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUserData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
        setFirstName("");
        setLastname("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      if (error.response?.data?.message === "User already exists") {
        setErrors({ email: "An account with this email already exists." });
      } else {
        setErrors({ general: "Registration failed. Please try again later." });
      }
    }
  };

  return (
    <section className="h-[100dvh] flex flex-col justify-center items-center px-[clamp(1rem,3vw,2rem)] py-[clamp(2rem,4vw,4rem)] bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 relative">

      {/* back button */}
      <button
        onClick={() => navigate("/users/login")}
        className="absolute top-[clamp(1rem,2vw,1.5rem)] left-[clamp(1rem,2vw,1.5rem)] p-[clamp(0.5rem,1vw,0.75rem)] rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200/20 dark:border-gray-700/20"
        aria-label="Go back"
      >
        <i className="ri-arrow-left-line text-[clamp(1.25rem,1.5vw,1.5rem)]"></i>
      </button>

      <div className="absolute top-[clamp(1rem,2vw,1.5rem)] right-[clamp(1rem,2vw,1.5rem)] z-50">
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-[clamp(20rem,90vw,28rem)] bg-gray-50 dark:bg-gray-900 rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_15px_15px_rgba(0,0,0,0.4)] dark:shadow-[0_15px_15px_rgba(255,255,255,0.4)]">
        <header className="text-center mb-[clamp(1.5rem,3vw,2.5rem)]">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-wide">Kubik</h1>
          <p className="mt-[clamp(0.5rem,1vw,1rem)] text-[clamp(0.875rem,1.25vw,1.125rem)] text-gray-500 dark:text-gray-400">
            Create your account
          </p>
        </header>

        <form onSubmit={formHandler} className="space-y-[clamp(1rem,2vw,1.5rem)]">
          <div className="flex gap-[clamp(0.75rem,1.5vw,1rem)]">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-1/2 px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)] text-[clamp(0.875rem,1.25vw,1.125rem)]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-1/2 px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)] text-[clamp(0.875rem,1.25vw,1.125rem)]"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)] text-[clamp(0.875rem,1.25vw,1.125rem)]`}
              required
            />
            {errors.email && (
              <p className="mt-[clamp(0.25rem,0.5vw,0.5rem)] text-[clamp(0.75rem,1vw,0.875rem)] text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)] text-[clamp(0.875rem,1.25vw,1.125rem)]`}
              required
            />
            {errors.password && (
              <p className="mt-[clamp(0.25rem,0.5vw,0.5rem)] text-[clamp(0.75rem,1vw,0.875rem)] text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-[clamp(0.75rem,1.5vw,1rem)] font-bold rounded-lg transition duration-300 bg-blue-600 hover:bg-blue-700 text-white text-[clamp(0.875rem,1.25vw,1.125rem)] shadow-[0_5px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_20px_rgba(255,255,255,0.3)]"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-[clamp(1.5rem,2vw,2rem)] text-center text-[clamp(0.75rem,1vw,0.875rem)]">
          Already have an account?{" "}
          <Link
            to="/users/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <Link
        to="/captains/register"
        className="mt-[clamp(2rem,4vw,3rem)] w-full max-w-[clamp(20rem,90vw,28rem)] py-[clamp(0.75rem,1.5vw,1rem)] bg-green-600 text-white text-center font-bold text-[clamp(0.875rem,1.25vw,1.125rem)] rounded-lg hover:bg-green-700 transition duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)]"
      >
        Register as Captain
      </Link>

      <p className="text-[clamp(0.75rem,1vw,0.875rem)] text-center mt-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(16rem,80vw,24rem)] text-gray-500 dark:text-gray-400">
        By proceeding, you consent to receive calls, WhatsApp, or SMS messages,
        including via automated means, from Kubik and its affiliates to the
        number provided.
      </p>
    </section>
  );
};

export default UserSignUp;
