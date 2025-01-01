import { useForm } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("your_formspree_id"); // Replace with your Formspree ID

  return (
    <footer className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready to optimize your cloud costs? Get in touch with us today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label
                htmlFor="footer-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="footer-name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="footer-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="footer-email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="footer-message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="footer-message"
                name="message"
                rows="4"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>

            {state.succeeded && (
              <div className="text-green-600 dark:text-green-400 text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
            
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/company/optifinops/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <i className="fab fa-linkedin text-2xl"></i>
          </a>
        </div>

        <div className="mt-4 mb-4">
    
          href="/privacy-policy"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
      Privacy Policy
          </a>
  </div>

            
            <p className="mt-4">© 2024 OptiFinOps FZE. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
