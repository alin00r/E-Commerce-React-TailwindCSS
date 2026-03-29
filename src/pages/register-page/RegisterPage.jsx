import { Formik, Form, Field } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/authContext';
import * as Yup from 'yup';

export default function RegisterPage() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { setUser } = useContext(AuthContext);

  const handleSubmit = (values) => {
    setUser({ ...values });
    navigate('/products');
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    username: Yup.string()
      .trim()
      .required('Username is required')
      .matches(/^\S+$/, 'Username must not contain spaces'),
    email: Yup.string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const errorClass = 'mt-2 text-sm text-red-600';

  return (
    <div className="bg-sky-100 flex justify-center items-center min-h-screen">
      {/* Left: Text */}
      <div className="w-1/2 h-screen hidden lg:flex flex-col justify-center items-center pl-12">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
          ecommerce
        </h1>
        <h2 className="text-4xl font-semibold text-gray-800">Register Now</h2>
      </div>

      {/* Right: Register Form */}
      <div className="lg:p-8 md:p-8 sm:p-6 p-4 w-full lg:w-1/2 h-screen flex flex-col justify-center overflow-y-auto lg:overflow-hidden">
        <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent lg:hidden">
          ecommerce
        </h1>
        <h2 className="text-lg font-semibold mb-2 text-center text-gray-800 lg:hidden">
          Register
        </h2>
        <h2 className="text-lg font-semibold mb-3 text-center text-gray-800 hidden lg:block">
          Join Us
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, submitCount }) => (
            <Form className="space-y-2">
              {/* Name Input */}
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-0.5 text-xs"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-base focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  autoComplete="off"
                />
                {(touched.name || submitCount > 0) && errors.name ? (
                  <p className={errorClass}>{errors.name}</p>
                ) : null}
              </div>

              {/* Username Input */}
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-0.5 text-xs"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-base focus:outline-none focus:border-blue-500"
                  placeholder="Choose a username"
                  autoComplete="off"
                />
                {(touched.username || submitCount > 0) && errors.username ? (
                  <p className={errorClass}>{errors.username}</p>
                ) : null}
              </div>

              {/* Email Input */}
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-0.5 text-xs"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-base focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {(touched.email || submitCount > 0) && errors.email ? (
                  <p className={errorClass}>{errors.email}</p>
                ) : null}
              </div>

              {/* Password Input */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-0.5 text-xs"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-base focus:outline-none focus:border-blue-500"
                  placeholder="Enter password"
                  autoComplete="off"
                />
                {(touched.password || submitCount > 0) && errors.password ? (
                  <p className={errorClass}>{errors.password}</p>
                ) : null}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-0.5 text-xs"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-base focus:outline-none focus:border-blue-500"
                  placeholder="Confirm password"
                  autoComplete="off"
                />
                {(touched.confirmPassword || submitCount > 0) &&
                errors.confirmPassword ? (
                  <p className={errorClass}>{errors.confirmPassword}</p>
                ) : null}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2.5 px-3 w-full transition-colors text-base mt-2"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <div className="mt-2 text-blue-500 text-center text-xs">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="hover:underline font-semibold">
            Login Here
          </a>
        </div>
      </div>
    </div>
  );
}
