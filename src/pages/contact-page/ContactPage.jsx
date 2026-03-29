import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import * as Yup from 'yup';

const inputBaseClass =
  'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500';

const labelClass = 'block mb-2 text-sm font-medium text-gray-800';

const errorClass = 'mt-1 text-xs text-red-600';

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  phone: Yup.string()
    .optional()
    .test(
      'valid-phone',
      'Invalid phone number for the selected country',
      (value) => !value || isValidPhoneNumber(value),
    ),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be at most 500 characters'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (_values, { resetForm }) => {
    setSubmitted(true);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-sm text-gray-600 mb-8">
          We&apos;d love to hear from you. Fill in the form and we&apos;ll get
          back to you as soon as possible.
        </p>

        {submitted && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Message received!</strong> We will get to you soon.
            </span>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            submitCount,
            values,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
              {/* First Name + Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={inputBaseClass}
                    placeholder="Ali"
                  />
                  {(touched.firstName || submitCount > 0) &&
                  errors.firstName ? (
                    <p className={errorClass}>{errors.firstName}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={inputBaseClass}
                    placeholder="Nour"
                  />
                  {(touched.lastName || submitCount > 0) && errors.lastName ? (
                    <p className={errorClass}>{errors.lastName}</p>
                  ) : null}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={inputBaseClass}
                  placeholder="ali@example.com"
                />
                {(touched.email || submitCount > 0) && errors.email ? (
                  <p className={errorClass}>{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <PhoneInput
                  id="phone"
                  international
                  defaultCountry="US"
                  value={values.phone}
                  onChange={(val) => setFieldValue('phone', val ?? '')}
                  onBlur={() => setFieldTouched('phone', true)}
                  className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-md py-1.5 px-3 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:text-gray-900 [&_.PhoneInputInput]:placeholder:text-gray-400"
                />
                {(touched.phone || submitCount > 0) && errors.phone ? (
                  <p className={errorClass}>{errors.phone}</p>
                ) : null}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={5}
                  className={`${inputBaseClass} resize-none`}
                  placeholder="Write your message here…"
                />
                <div className="flex justify-between items-start mt-1">
                  <span>
                    {(touched.message || submitCount > 0) && errors.message ? (
                      <p className={errorClass}>{errors.message}</p>
                    ) : null}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {values.message.length}/500
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
