import React from 'react';

const AboutClub = () => {
  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 ">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-10 ">About the Club</h2>

        <div className="space-y-10">

          {/* History */}
          <div className="card bg-[#76b38f] shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 ">Our History</h3>
            <p className="text-lg  leading-relaxed">
              Established in 2005, our Sports Club has grown from a local community initiative
              into one of the most vibrant and inclusive athletic communities in the region.
              With humble beginnings, we started with just a few dedicated members and a small
              training ground. Over the years, through hard work, unity, and sportsmanship, we've
              expanded into a multi-sport facility catering to athletes of all levels.
            </p>
          </div>

          {/* Mission */}
          <div className="card bg-[#76b38f] shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 ">Our Mission</h3>
            <p className="text-lg leading-relaxed">
              Our mission is to inspire passion for sports, nurture talent, and promote a healthy,
              active lifestyle. We aim to provide top-notch training, inclusive programs,
              and a supportive environment where athletes can grow physically and mentally —
              whether they are beginners or professionals.
            </p>
          </div>

          {/* Vision (Optional) */}
          <div className="card bg-[#76b38f] shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 ">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              To become a nationally recognized hub for sports excellence and community engagement,
              fostering leadership, teamwork, and discipline through athletic achievement.
            </p>
          </div>

          

        </div>
      </div>
    </section>
  );
};

export default AboutClub;