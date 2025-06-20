"use client";

import Input from "@/shared/Input";
import NewsLatterBox from "./NewsLatterBox";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start ">
          {/* Contact Form */}
          <div className="w-full lg:w-7/12 xl:w-8/12">
            <div className="rounded-2xl bg-transparent dark:bg-gray-800 px-2">
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white leading-tight">
                Want To Visit?
                <br />
                <span className="text-primary-600 dark:text-primary-400">Open a Ticket</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 mb-10 text-lg">
                Our support team will get back to you ASAP via email.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input
                      sizeClass="h-12 px-4 py-3"
                      rounded="rounded-lg"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <Input
                      sizeClass="h-12 px-4 py-3"
                      rounded="rounded-lg"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full gap-2 rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 transition font-semibold text-lg"
                >
                  Submit
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar / Newsletter */}
          <div className="w-full lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
