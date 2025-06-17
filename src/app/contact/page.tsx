import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden dark:from-gray-900 dark:to-gray-800"
    >
      <div className="listingSection__wrap">
        <div className="flex flex-wrap items-center">
          {/* Contact Form */}
          <div className="z-10 w-full lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-lg bg-white dark:bg-gray-800 py-8 px-4"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-3xl font-bold text-silverGray sm:text-4xl">
                Want To Visit? <br /> Open a Ticket
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Our support team will get back to you ASAP via email.
              </p>

              <form>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-12 mt-3 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Enter your name ..."
            />
            
          </div>
      
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Email
                    </label>
                    <Input
                      fontClass=""
                      sizeClass="h-12 mt-3 px-4 py-3"
                      rounded="rounded-3xl"
                      placeholder="Enter email ..."
                     />
                  </div>
                </div>

                {/* Message Input */}
                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Enter your Message"
                    className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-primary"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button aria-label="submit-button" className="w-full flex justify-center rounded-full shadow-sm bg-gold px-6 py-3 text-lg font-bold text-white hover:text-gold shadow-lg transition duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                      <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
