import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import { X, Loader2, Send, CheckCircle } from 'lucide-react';

export default function ContactModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    monthlySpend: '',
    provider: 'aws'
  });

  const [state, handleSubmit] = useForm("xnnnndzg"); // Your Formspree form ID

  // Handle modal visibility
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    // Add event listener for modal opening
    const handleModalOpen = () => {
      setIsVisible(true);
    };

    window.addEventListener('keydown', handleEscape);
    
    // Add event listener to the modal element
    const modalElement = document.getElementById('contactModal');
    if (modalElement) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (!modalElement.classList.contains('hidden')) {
              handleModalOpen();
            }
          }
        });
      });

      observer.observe(modalElement, { attributes: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    document.getElementById('contactModal').classList.add('hidden');
    if (state.succeeded) {
      state.reset();
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        monthlySpend: '',
        provider: 'aws'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Wrapper function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <div
      id="contactModal"
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center hidden`}
      onClick={(e) => e.target.id === 'contactModal' && closeModal()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full mx-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Let's Talk</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {state.succeeded ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've received your message and will get back to you soon.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Monthly Cloud Spend (Optional)
              </label>
              <input
                type="text"
                name="monthlySpend"
                value={formData.monthlySpend}
                onChange={handleChange}
                placeholder="e.g. $5,000"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Cloud Provider
              </label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="aws">Amazon Web Services</option>
                <option value="azure">Microsoft Azure</option>
                <option value="gcp">Google Cloud Platform</option>
                <option value="multiple">Multiple Providers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {state.errors?.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 p-4 rounded-lg">
                {state.errors.map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {state.submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
