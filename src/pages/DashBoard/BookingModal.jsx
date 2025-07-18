import React, { useMemo, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useCreateBooking from '../hooks/bookingCourts/useCreateBooking';

const BookingModal = ({ open, onClose, court }) => {
  const { user } = useAuth();
  const createBooking = useCreateBooking();

  // Local state
  const [date, setDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Reset when modal opens/closes or court changes
  React.useEffect(() => {
    if (open) {
      setDate('');
      setSelectedSlots([]);
    }
  }, [open, court?._id]);

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const totalPrice = useMemo(
    () => (court?.price || 0) * selectedSlots.length,
    [court, selectedSlots]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email || !court || !date || selectedSlots.length === 0) return;

    const payload = {
      user_email: user.email,
      user_name: user.displayName || user.name || '',
      court_id: court._id,
      court_type: court.type,
      date, // expect YYYY-MM-DD
      slots: selectedSlots,
      price_per_session: court.price,
      total_price: totalPrice,
    };

    createBooking.mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-xl mb-4" style={{ color: '#76b38f' }}>
          Book {court?.type}
        </h3>

        {court ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Court Info (read-only) */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden">
                <img src={court.image} alt={court.type} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">{court.type}</p>
                <p>৳{court.price} / session</p>
              </div>
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Select Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Slots */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Select Session Slot(s)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg border-base-300">
                {court.slots?.map((slot) => (
                  <label key={slot} className="cursor-pointer flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      style={{ '--chkbg': '#76b38f', '--chkfg': '#fff' }}
                      checked={selectedSlots.includes(slot)}
                      onChange={() => toggleSlot(slot)}
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="text-right">
              <p className="text-lg">
                Sessions: <span className="font-semibold">{selectedSlots.length}</span>
              </p>
              <p className="text-xl font-bold" style={{ color: '#76b38f' }}>
                Total: ৳{totalPrice}
              </p>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: '#76b38f', borderColor: '#76b38f' }}
                disabled={createBooking.isPending || !date || selectedSlots.length === 0}
              >
                {createBooking.isPending ? 'Booking...' : 'Submit Booking'}
              </button>
            </div>
          </form>
        ) : (
          <p>No court selected.</p>
        )}
      </div>
    </dialog>
  );
};

export default BookingModal
