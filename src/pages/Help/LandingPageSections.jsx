import React, { useState, useEffect, useRef } from 'react';
import { 
  Star,
  Globe,
  Shield,
  Users,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Trophy,
  Target,
  Heart
} from 'lucide-react';

const LandingPageSections = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const partners = [
    {
      name: "Grameenphone",
      logo: "🟢",
      description: "Leading telecommunications partner",
      sector: "Telecommunications"
    },
    {
      name: "North South University",
      logo: "🏦",
      description: "Official education partner",
      sector: "Education"
    },
    {
      name: "Square Pharmaceuticals",
      logo: "💊",
      description: "Health & wellness partner",
      sector: "Healthcare"
    },
    {
      name: "Bashundhara Group",
      logo: "🏢",
      description: "Infrastructure development partner",
      sector: "Conglomerate"
    },
    {
      name: "Walton",
      logo: "📱",
      description: "Technology equipment partner",
      sector: "Electronics"
    },
    {
      name: "ACI Limited",
      logo: "🧪",
      description: "Consumer goods partner",
      sector: "FMCG"
    },
    {
      name: "Food Panda",
      logo: "🍔",
      description: "Premium food services",
      sector: "Food"
    },
    {
      name: "Robi Axiata",
      logo: "📡",
      description: "Digital connectivity partner",
      sector: "Telecommunications"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "cyclist",
      rating: 5,
      comment: "Amazing facilities and seamless booking system! I've been a member for 2 years and the service just keeps getting better.",
      image: "🚴‍♂️",
      location: "Dhaka"
    },
    {
      name: "Fatima Khatun",
      role: "Badminton Player",
      rating: 5,
      comment: "The court quality is excellent and the staff is very professional. Online booking makes it so convenient to reserve my favorite time slots.",
      image: "🏆",
      location: "Chittagong"
    },
    {
      name: "Karim Uddin",
      role: "Squash Champion",
      rating: 5,
      comment: "Best sports club in Bangladesh! The international standard facilities and easy payment system make it my go-to choice for training.",
      image: "🏆",
      location: "Sylhet"
    },
    {
      name: "Rashida Begum",
      role: "Fitness Enthusiast",
      rating: 4,
      comment: "Love the variety of courts available. The membership benefits and discount coupons are fantastic. Highly recommended!",
      image: "💪",
      location: "Rajshahi"
    }
  ];

  const internationalConnections = [
    {
      country: "Singapore",
      partnership: "Sports Excellence Exchange Program",
      icon: "🇸🇬",
      established: "2023"
    },
    {
      country: "Malaysia",
      partnership: "Professional Training Collaboration",
      icon: "🇲🇾",
      established: "2022"
    },
    {
      country: "Thailand",
      partnership: "International Tournament Series",
      icon: "🇹🇭",
      established: "2023"
    },
    {
      country: "India",
      partnership: "Cross-Border Sports Events",
      icon: "🇮🇳",
      established: "2021"
    }
  ];

  const achievements = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "5000+",
      label: "Happy Members",
      color: "text-blue-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "50000+",
      label: "Bookings Completed",
      color: "text-green-600"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "15+",
      label: "Awards Won",
      color: "text-yellow-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: "98%",
      label: "Satisfaction Rate",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-16 ">
      {/* Section 1: Our Partners */}
      <section 
        id="partners"
        ref={el => sectionRefs.current.partners = el}
        className={`py-16  transition-all duration-1000 ${
          isVisible.partners ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold  mb-4">Our Trusted Partners</h2>
            <p className=" max-w-2xl mx-auto">
              We collaborate with leading Bangladeshi companies to provide world-class sports facilities and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group ${
                  isVisible.partners ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center text-black">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <h3 className="font-bold  mb-2">{partner.name}</h3>
                  <p className="text-sm  mb-3">{partner.description}</p>
                  <span 
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: '#76b38f' }}
                  >
                    {partner.sector}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Customer Testimonials */}
      <section 
        id="testimonials"
        ref={el => sectionRefs.current.testimonials = el}
        className={`py-16 transition-all duration-1000 ${
          isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ backgroundColor: '#76b38f' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Members Say</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Real feedback from our valued members across Bangladesh
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden text-black">
              <div className="absolute top-4 left-6">
                <Quote className="w-8 h-8 text-green-200" />
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < testimonials[currentTestimonial].rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>

                <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].comment}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl">{testimonials[currentTestimonial].image}</div>
                  <div className="text-center">
                    <h4 className="font-bold ">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm ">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button 
                  onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-[#76b38f]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: International Connections */}
      <section 
        id="international"
        ref={el => sectionRefs.current.international = el}
        className={`py-16  transition-all duration-1000 ${
          isVisible.international ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold ">Global Connections</h2>
            </div>
            <p className=" max-w-2xl mx-auto">
              Expanding horizons through international partnerships and collaborations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-black">
            {internationalConnections.map((connection, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden transition-all duration-700 hover:scale-105 ${
                  isVisible.international ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4 group-hover:animate-bounce">
                      {connection.icon}
                    </div>
                    <h3 className="font-bold  mb-2">{connection.country}</h3>
                    <p className="text-sm  mb-4">{connection.partnership}</p>
                    <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>Since {connection.established}</span>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-6">
                    <div className="text-white text-center w-full">
                      <p className="text-sm font-medium">Active Partnership</p>
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible.international ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className={`${stat.color} mb-3 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold  mb-1">{stat.number}</div>
                <div className="text-sm ">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Terms & Conditions Preview */}
      <section 
        id="terms"
        ref={el => sectionRefs.current.terms = el}
        className={`py-16 bg-gray-900 text-white transition-all duration-1000 ${
          isVisible.terms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#76b38f]" />
                <h2 className="text-3xl font-bold">Terms & Policies</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#76b38f] pl-6">
                  <h3 className="font-semibold text-lg mb-2">Membership Terms</h3>
                  <p className="text-gray-300 text-sm">
                    Clear guidelines for membership registration, booking policies, and facility usage to ensure fair access for all members.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Payment & Refund Policy</h3>
                  <p className="text-gray-300 text-sm">
                    Transparent payment terms, cancellation policies, and refund procedures with coupon code usage guidelines.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Privacy & Data Protection</h3>
                  <p className="text-gray-300 text-sm">
                    Commitment to protecting your personal information and maintaining the highest standards of data security.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Facility Usage Guidelines</h3>
                  <p className="text-gray-300 text-sm">
                    Safety protocols, equipment usage rules, and conduct expectations to maintain a professional sports environment.
                  </p>
                </div>
              </div>

              
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#76b38f] to-blue-600 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Quick Policy Points</h3>
                  
                  <div className="space-y-3">
                    {[
                      "24/7 online booking system",
                      "Flexible cancellation policy",
                      "Secure payment processing",
                      "Member data protection",
                      "Fair usage guidelines"
                    ].map((point, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 transition-all duration-500 ${
                          isVisible.terms ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="font-medium text-sm">Member Satisfaction</span>
                    </div>
                    <p className="text-xs text-gray-200">
                      Your satisfaction is our priority. We continuously update our policies based on member feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Awards & Recognition */}
      <section 
        id="awards"
        ref={el => sectionRefs.current.awards = el}
        className={`py-16  transition-all duration-1000 ${
          isVisible.awards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <h2 className="text-3xl font-bold ">Awards & Recognition</h2>
            </div>
            <p className=" max-w-2xl mx-auto">
              Recognized excellence in sports facility management and customer service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 text-black">
            {[
              {
                year: "2024",
                title: "Best Sports Facility - Bangladesh",
                organization: "Sports Excellence Awards",
                icon: "🏆",
                color: "from-yellow-400 to-orange-500"
              },
              {
                year: "2023", 
                title: "Digital Innovation in Sports",
                organization: "Bangladesh Tech Awards",
                icon: "💎",
                color: "from-blue-400 to-purple-500"
              },
              {
                year: "2023",
                title: "Outstanding Customer Service",
                organization: "Bangladesh Business Awards",
                icon: "⭐",
                color: "from-green-400 to-teal-500"
              }
            ].map((award, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden transition-all duration-700 hover:scale-105 ${
                  isVisible.awards ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="text-center">
                    <div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${award.color} flex items-center justify-center text-2xl group-hover:animate-pulse`}
                    >
                      {award.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-500 mb-2">{award.year}</div>
                    <h3 className="font-bold  mb-2 leading-tight">{award.title}</h3>
                    <p className="text-sm ">{award.organization}</p>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-300 transition-colors duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recognition Timeline */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-center  mb-8 text-black">Journey of Excellence</h3>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-[#76b38f] to-yellow-500"></div>
              
              <div className="space-y-8">
                {[
                  { year: "2021", event: "Club Establishment", desc: "Founded with a vision of excellence" },
                  { year: "2022", event: "Digital Platform Launch", desc: "Introduced online booking system" },
                  { year: "2023", event: "International Partnerships", desc: "Expanded global connections" },
                  { year: "2024", event: "Award Recognition", desc: "Achieved industry excellence" }
                ].map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    } transition-all duration-700 ${
                      isVisible.awards ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${800 + index * 200}ms` }}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-gradient-to-r from-[#76b38f] to-yellow-500 text-white p-4 rounded-lg shadow-md">
                        <div className="font-bold text-sm mb-1">{milestone.year}</div>
                        <div className="font-semibold text-sm mb-1">{milestone.event}</div>
                        <div className="text-xs opacity-90">{milestone.desc}</div>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#76b38f] rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPageSections;