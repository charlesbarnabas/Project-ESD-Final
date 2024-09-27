import { Link } from "react-router-dom";
import { useAuthSignin } from "./hooks";

export default function SignIn() {
  const { state, method } = useAuthSignin();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 w-[450px]">
        <div className="flex flex-col justify-start gap-4">
          <h1 className="font-semibold text-4xl">Hello!</h1>
          <h2 className="font-medium text-2xl">Welcome back</h2>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="font-medium text-sm" htmlFor="email">
              Email
            </label>
            <input
              className={`border rounded-md p-4 outline-none ${
                state.isError
                  ? "border-orange-soda"
                  : "border-philippine-silver"
              }`}
              type="email'"
              name="email"
              id="email"
              placeholder="Email"
              value={state.email}
              onChange={(input) => method.onChangeEmail(input.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium text-sm" htmlFor="password">
              Password
            </label>
            <input
              className={`border rounded-md p-4 outline-none ${
                state.isError
                  ? "border-orange-soda"
                  : "border-philippine-silver"
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={(input) => method.onChangePassword(input.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => method.onClickBtnLogin()}
          className={`w-full border bg-spiro-disco-ball text-white font-semibold text-lg py-4 rounded-md  ${
            state.disableBtn
              ? "opacity-50"
              : "hover:text-spiro-disco-ball hover:bg-white hover:border-spiro-disco-ball ease-in-out duration-500"
          }`}
          disabled={state.disableBtn}
        >
          Next
        </button>
        <div className="flex justify-start items-center gap-2">
          <span className="text-chinese-black opacity-50">
            Don&apos;t have an account?
          </span>
          <Link className="text-sm font-bold" to="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
