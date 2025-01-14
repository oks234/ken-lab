import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

export default function Join() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      return setName(value);
    } else if (name === "email") {
      return setEmail(value);
    } else if (name === "password") {
      return setPassword(value);
    }
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Join</h1>
      <form onSubmit={onSubmit}>
        <div className="my-8 grid grid-cols-1 gap-6">
          <label htmlFor="name" className="block">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              required
              className="mt-1 block w-full"
              onChange={onChange}
              value={name}
            />
          </label>
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
              className="mt-1 block w-full"
              onChange={onChange}
              value={email}
            />
          </label>
          <label htmlFor="password" className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
              className="mt-1 block w-full"
              onChange={onChange}
              value={password}
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
          >
            {isLoading && (
              <ClipLoader className="mr-1" size={12} color="white" />
            )}
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </>
  );
}
