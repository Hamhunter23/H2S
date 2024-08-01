"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 400) {
        setError('User already exists');
      } else if (res.status === 201) {
        setError('');
        router.push('/login');
      } else {
        const errorMessage = await res.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred. Please try again');
      console.log(error);
    }
  };

  
  return (
    <div>
    <div className="container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="leftPane">
        <div className="content">
          <h2 className="text-7xl">Welcome Back!</h2>
          <p>Log in to continue exploring the galaxy of learning.</p>
        </div>
      </div>

      <div className="rightPane">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
              <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                SkillForge
              </a>
            
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-red-500 dark:text-red-400">{error && error}</p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    
                      <a href='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Login here
                      </a>
                                      </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <style jsx>{`
      @keyframes move-twink-back {
        from {
          background-position: 0 0;
        }
        to {
          background-position: -10000px 5000px;
        }
      }
      @keyframes move-twink-front {
        from {
          background-position: 0 0;
        }
        to {
          background-position: 10000px 5000px;
        }
      }
      .container {
        position: relative;
        height: 100vh;
        overflow: hidden;
        display: flex;
        background: #000;
        color: white;
      }
      .stars,
      .twinkling {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
      }
      .stars {
        background: transparent url("/stars.png") repeat top center;
        z-index: 0;
      }
      .twinkling {
        background: transparent url("/twinkling.png") repeat top center;
        animation: move-twink-back 200s linear infinite;
        z-index: 1;
      }
      .leftPane,
      .rightPane {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
      }
      .leftPane {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        text-align: center;
        position: relative;
      }
      .rightPane {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        padding: 2rem;
      }
      .content {
        max-width: 80%;
      }
      .backgroundImage {
        width: 100%;
        height: auto;
        margin-top: 1rem;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      }
      .formContainer {
        width: 80%;
        max-width: 400px;
        text-align: center;
      }
      .title {
        margin-bottom: 2rem;
      }
      .message {
        margin-bottom: 1.5rem;
      }
      .switchPage {
        margin-top: 1rem;
      }
      .switchPage a {
        color: #667eea;
        text-decoration: none;
      }
      .switchPage a:hover {
        text-decoration: underline;
      }
    `}</style>
    </div>
  );
};
export default Signup;