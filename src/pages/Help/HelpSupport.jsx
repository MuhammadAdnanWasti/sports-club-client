import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  User,
  CreditCard,
  Calendar,
  Settings,
  Book,
  Heart
} from 'lucide-react';

const HelpSupport = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      id: 1,
      category: "Account Management",
      icon: <User className="w-5 h-5" />,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Login' in the navbar, then select 'Sign Up'. Fill in your name, email, and password. You'll receive a confirmation email to activate your account."
        },
        {
          question: "How do I reset my password?",
          answer: "On the login page, click 'Forgot Password'. Enter your email address and you'll receive a password reset link. Follow the instructions in the email to set a new password."
        },
        {
          question: "Can I update my profile information?",
          answer: "Yes! Go to your Dashboard > My Profile to update your name, email, and profile picture. Changes are saved automatically."
        }
      ]
    },
    {
      id: 2,
      category: "Court Booking",
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          question: "How do I book a court?",
          answer: "Visit the Courts page, select your preferred court, choose time slots and date, then click 'Book Now'. You can book multiple slots at once. Your booking will be pending until admin approval."
        },
        {
          question: "Can I cancel my booking?",
          answer: "Yes, you can cancel pending bookings from your Dashboard > Pending Bookings. Approved bookings can also be cancelled before payment. Once paid, contact support for cancellation."
        },
        {
          question: "What happens after I book a court?",
          answer: "Your booking goes to 'Pending' status. Once the admin approves it, you'll become a member and can make payment to confirm your booking."
        },
        {
          question: "Can I book multiple time slots?",
          answer: "Yes! When booking, you can select multiple time slots for the same court. The total price will be calculated automatically."
        }
      ]
    },
    {
      id: 3,
      category: "Payments & Coupons",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: "How do I make a payment?",
          answer: "Go to Dashboard > Approved Bookings and click 'Pay' on your booking. Fill in the payment form with your details and submit. Your booking will be confirmed after successful payment."
        },
        {
          question: "How do coupon codes work?",
          answer: "On the payment page, enter your coupon code and click 'Apply'. Valid coupons will automatically reduce your total amount. Check the home page for current promotions!"
        },
        {
          question: "Where can I see my payment history?",
          answer: "Visit Dashboard > Payment History to view all your past payments with details like amount, date, court type, and transaction ID."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards, debit cards, and online banking. All transactions are secure and encrypted."
        }
      ]
    },
    {
      id: 4,
      category: "Membership",
      icon: <Heart className="w-5 h-5" />,
      questions: [
        {
          question: "How do I become a member?",
          answer: "Book a court session and wait for admin approval. Once approved, you automatically become a member and gain access to the Member Dashboard with additional features."
        },
        {
          question: "What's the difference between User and Member?",
          answer: "Users can browse courts and make booking requests. Members have approved bookings and can access payment features, confirmed bookings, and exclusive announcements."
        },
        {
          question: "Can my membership be cancelled?",
          answer: "Contact our support team for membership inquiries. Admins can manage member status from their dashboard."
        }
      ]
    },
    {
      id: 5,
      category: "Technical Support",
      icon: <Settings className="w-5 h-5" />,
      questions: [
        {
          question: "The page won't load after logging in",
          answer: "Try refreshing the page or clearing your browser cache. If the issue persists, make sure your internet connection is stable and contact support."
        },
        
        {
          question: "The site looks broken on my mobile device",
          answer: "Our site is fully responsive. Try refreshing the page or updating your browser. If issues persist, let us know your device model and browser version."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "info@sportsclub.com",
      icon: <Mail className="w-6 h-6" />,
      responseTime: "Within 24 hours"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+880 1234-111111",
      icon: <Phone className="w-6 h-6" />,
      responseTime: "Sat-Thu 9AM-6PM"
    },
    {
      title: "Visit Us",
      description: "Come to our physical location",
      contact: "Banani, Dhaka 1213, Bangladesh",
      icon: <MapPin className="w-6 h-6" />,
      responseTime: "Sat-Thu 8AM-8PM"
    }
  ];

  const quickGuides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: <Book className="w-6 h-6" />,
      steps: ["Create Account", "Explore Courts", "Make First Booking", "Become Member"]
    },
    {
      title: "Booking Process",
      description: "Step-by-step booking guide",
      icon: <Calendar className="w-6 h-6" />,
      steps: ["Select Court", "Choose Time Slot", "Submit Request", "Wait for Approval", "Make Payment"]
    },
    {
      title: "Payment Guide",
      description: "How to complete payments",
      icon: <CreditCard className="w-6 h-6" />,
      steps: ["Go to Approved Bookings", "Click Pay", "Apply Coupon (Optional)", "Complete Payment"]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            
            <h1 className="text-4xl font-bold mb-4">Help & Support Center</h1>
            <p className="text-xl opacity-90">Find answers to your questions and get the help you need</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#76b38f] focus:ring-1 focus:ring-[#76b38f]"
            />
            <HelpCircle className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold  mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {filteredFAQs.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => toggleSection(category.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-[#76b38f]">{category.icon}</div>
                      <h3 className="font-semibold text-gray-800">{category.category}</h3>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        {category.questions.length}
                      </span>
                    </div>
                    {activeSection === category.id ? 
                      <ChevronUp className="w-5 h-5 text-gray-500" /> :
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    }
                  </button>
                  
                  {activeSection === category.id && (
                    <div className="px-6 pb-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Guides */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Guides</h3>
              <div className="space-y-4">
                {quickGuides.map((guide, index) => (
                  <div key={index} className="border-l-4 border-[#76b38f] pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-[#76b38f]">{guide.icon}</div>
                      <h4 className="font-medium text-gray-800">{guide.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                    <div className="text-xs text-gray-500">
                      {guide.steps.map((step, i) => (
                        <span key={i}>
                          {i + 1}. {step}
                          {i < guide.steps.length - 1 && ' → '}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Contact Support</h3>
              <div className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="text-[#76b38f] mt-1">{channel.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-800">{channel.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{channel.description}</p>
                      <p className="text-sm font-medium text-gray-800">{channel.contact}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{channel.responseTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default HelpSupport;