"use client";
import { useAppContext } from "@/context/AppContext";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function LoginPage() {
  const [state, setState] = useState("login");
  const [password, setPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { axios, setToken, router } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state == "login" ? "/api/user/login" : "/api/user/register";
    try {
      const { data } = await axios.post(url, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        setToken(data.token);
        router.replace("/");
      } else console.error(data.message);
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User className="size-4 text-black" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className="size-4 text-black" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 text-black"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className="size-4 text-black" />
          <div className="flex justify-between items-center">
            <input
              type={`${password ? "password" : "text"}`}
              name="password"
              placeholder="Password"
              className="border-none outline-none ring-0 text-black"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div onClick={() => setPassword(!password)}>
              {password ? (
                <Eye className="size-4 text-black" />
              ) : (
                <EyeOff className="size-4 text-black" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 text-left text-indigo-500">
          <button className="text-sm" type="reset">
            Forget password?
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <a href="#" className="text-indigo-500 hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
