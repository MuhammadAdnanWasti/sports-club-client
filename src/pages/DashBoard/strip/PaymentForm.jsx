import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect,  useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const useValidateCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const validate = async (code) => {
    if (!code) return { valid: false, discount: 0, finalTotal: 0};
    const res = await axiosSecure.post('/coupons/validate', { code });
    // console.log({res})
    return res.data; // { valid, discount, finalTotal, couponId? }
  };
  // console.log({validate})
  return validate;
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { _id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
     const validateCoupon = useValidateCoupon();

    const [error, setError] = useState('');
const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${_id}`);
            return res.data;
        }
    })
   const [totalPriceAfterDiscount,setTotalPriceAfterDiscount]=useState(parcelInfo.total_price || 0)



  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState({ valid: false, discount: 0, finalTotal: parcelInfo.total_price, loading: false, error: null, couponId: null });
  useEffect(()=>{
     if(parcelInfo.total_price){
        setCouponState({...couponState,finalTotal:parcelInfo.total_price})
     }
  },[parcelInfo])
  
  if (isPending) {
        return '...loading'
    }


// useEffect(() => {
//  if (couponState.valid) {
//     setTotalPriceAfterDiscount( parcelInfo.total_price * (couponState.discount/100 ))
//  }
// }, [couponState])

// console.log(totalPriceAfterDiscount)
     const handleApplyCoupon = async () => {
    setCouponState((s) => ({ ...s, loading: true, error: null }));
    try {
      const result = await validateCoupon(couponCode.trim());
      // console.log({result})
      setCouponState({
        valid: result.valid,
        discount: result.amount || 0,
        finalTotal:parcelInfo.total_price - (parcelInfo.total_price * (result.amount/100 ))  || parcelInfo.total_price,
        couponId: result.couponId || null,
        loading: false,
        error: null,
      });
    } catch (err) {
      setCouponState((s) => ({ ...s, loading: false, error: err?.message || 'Coupon validation failed' }));
    }
  };

// console.log({couponState, bookingTotal:parcelInfo.total_price})
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

    // //  const amount = couponState.valid ? 
    // console.log(parcelInfo)
    // // console.log(amount)
    // const amountInCents = amount * 100;
    // console.log(couponState)
    // console.log(amountInCents) 
        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step- 1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            // console.log('payment method', paymentMethod);

            // step-2: create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents:couponState.finalTotal,
                _id
            })

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    // console.log('Payment succeeded!');
                    const transactionId = result.paymentIntent.id;
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        _id,
                        email: user.email,
                        amount:couponState.finalTotal,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {

                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to Confirmed Bookings',
                        });


                        
                    // ✅ Redirect to 
                    navigate('/dashboard/confirmedBookings');

                }
            }
        }
    }





}

return (
    <div>

         <div className="card bg-base-200 p-4 shadow">
        <label className="label"><span className="label-text font-medium">Coupon Code</span></label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon"
            className="input input-bordered flex-1 uppercase text-black"
          />
          <button type="button" className="btn btn-primary" onClick={handleApplyCoupon} disabled={couponState.loading}>
            {couponState.loading ? 'Checking...' : 'Apply'}
          </button>
        </div>
        {couponState.error && <p className="text-error text-sm mt-1">{couponState.error}</p>}
        {couponState.valid && (
          <p className="text-success text-sm mt-1">Coupon applied! Discount ৳{couponState.discount}. New total ৳{couponState.finalTotal}.</p>
        )}
      </div>

         <div className="card bg-base-200 p-6 shadow space-y-4 text-black">
        <div>
          <label className="label"><span className="label-text">Email</span></label>
          <input type="text" className="input input-bordered w-full" value={parcelInfo.user_email} readOnly />
        </div>
        <div>
          <label className="label"><span className="label-text">Court</span></label>
          <input type="text" className="input input-bordered w-full" value={parcelInfo.court_type} readOnly />
        </div>
        <div>
          <label className="label"><span className="label-text">Price</span></label>
          <input type="text" className="input input-bordered w-full" value={parcelInfo.total_price
} readOnly />
        </div>
       
        {/* Date note: show first date if multiple */}
        <div>
          <label className="label"><span className="label-text">First Session Date</span></label>
          <input type="text" className="input input-bordered w-full" value={parcelInfo.date} readOnly />
        </div>
      </div>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
            <CardElement className="p-2 border rounded">
            </CardElement>
            <button
                type='submit'
                className="btn btn-primary text-black w-full"
                disabled={!stripe}
            >
                Pay ${couponState.finalTotal}
            </button>
            {
                error && <p className='text-red-500'>{error}</p>
            }
        </form>
    </div>
);
};

export default PaymentForm;