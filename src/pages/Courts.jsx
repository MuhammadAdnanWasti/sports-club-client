import React, { useEffect, useState } from 'react'
import useAuth from './hooks/useAuth';
import {  useNavigate } from 'react-router';
import BookingModal from './DashBoard/BookingModal';

const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  



  // Booking modal state
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

 const [courts, setCourts] = useState([]);
   const [itemsPerPage,setItemsPerPage]=useState(6)
    const [currentPage, setCurrentPage]=useState(0)
  const [count,setCount]=useState(0)
     const NumOfPages=Math.ceil(count/itemsPerPage)
const pages=[...Array(NumOfPages).keys()]
    // console.log(pages)
    useEffect(() => {
      
    fetch('https://sports-club-management-system-serve.vercel.app/courtsCount')
    .then(res=>res.json())
    .then(data=>setCount(data.count))
     
    }, [])

     useEffect(() => {
        fetch(`https://sports-club-management-system-serve.vercel.app/courtsUser?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setCourts(data))
    }, [currentPage,itemsPerPage]);


    const handleItems=(e) => { 
    // console.log(e.target.value)
    const val=parseInt(e.target.value)
    setItemsPerPage(val)
    setCurrentPage(0)
  }
 const handlePrev=() => { 
    if (currentPage>0){
        setCurrentPage(currentPage - 1)
    }
  }
 const handleNext=() => { 
    if (currentPage< pages.length -1){
        setCurrentPage(currentPage + 1)
    }
  }



  const openBooking = (court) => {
    setSelectedCourt(court);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  const handleBookClick = (court) => {
    if (!user?.email) {
      // redirect to login, preserve current location
      navigate('/auth/login' )
      return;
    }
    openBooking(court);
  };

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold">Courts</h2>

      

        {/* Table */}
      
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Slots</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {courts?.length ? (
                  courts.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img src={c.image} alt={c.type} />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{c.type}</td>
                      <td>
                        <details className="collapse collapse-arrow bg-base-200">
                          <summary className="collapse-title text-sm font-medium">
                            {c.slots?.length || 0} slot(s)
                          </summary>
                          <div className="collapse-content">
                            <ul className="list-disc ml-5 text-sm space-y-1">
                              {c.slots?.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      </td>
                      <td>৳{c.price}</td>
                      <td className="text-right">
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ backgroundColor: '#76b38f', borderColor: '#76b38f' }}
                          onClick={() => handleBookClick(c)}
                        >
                          Book now
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10">
                      No courts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      <div className='pagination'>
                <p>CurrentPage:{currentPage}</p>
                <button  className='btn btn-primary' onClick={handlePrev}>Previous</button>
                {
            pages.map(page=><button 
                className={currentPage === page ? 'bg-amber-300 btn  '  : 'btn'}
                onClick={()=>setCurrentPage(page)}
                key={page}>{page}</button>)
            }
            <button className='btn btn-primary' onClick={handleNext}>Next</button>
            <select value={itemsPerPage} onChange={handleItems}>
                <option value='6'>6</option>
                <option value='12'>12</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
            </select>
            </div>
      </div>

      {/* Booking Modal */}
      <BookingModal open={bookingOpen} onClose={closeBooking} court={selectedCourt} />
    </section>
  );
};

export default Courts
