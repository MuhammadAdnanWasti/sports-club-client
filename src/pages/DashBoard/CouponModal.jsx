import React from 'react'
import { useForm } from 'react-hook-form';
const brandColor = '#76b38f';
const CouponModal = ({ open, onClose, initialData = null, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      code: initialData?.code || '',
      description: initialData?.description || '',
      discountType: initialData?.discountType || 'percent',
      amount: initialData?.amount ?? '',
      minSpend: initialData?.minSpend ?? '',
      maxDiscount: initialData?.maxDiscount ?? '',
      startDate: initialData?.startDate ? initialData.startDate.slice(0,16) : '', // yyyy-MM-ddTHH:mm
      endDate: initialData?.endDate ? initialData.endDate.slice(0,16) : '',
      active: initialData?.active ?? true,
      usageLimit: initialData?.usageLimit ?? '',
    },
  });

  React.useEffect(() => {
    reset({
      code: initialData?.code || '',
      description: initialData?.description || '',
      discountType: initialData?.discountType || 'percent',
      amount: initialData?.amount ?? '',
      minSpend: initialData?.minSpend ?? '',
      maxDiscount: initialData?.maxDiscount ?? '',
      startDate: initialData?.startDate ? initialData.startDate.slice(0,16) : '',
      endDate: initialData?.endDate ? initialData.endDate.slice(0,16) : '',
      active: initialData?.active ?? true,
      usageLimit: initialData?.usageLimit ?? '',
    });
  }, [initialData, reset, open]);

  const discountType = watch('discountType');

  const submitHandler = (vals) => {
    const payload = {
      code: vals.code.trim().toUpperCase(),
      description: vals.description.trim(),
      discountType: vals.discountType,
      amount: Number(vals.amount),
      minSpend: vals.minSpend === '' ? null : Number(vals.minSpend),
      maxDiscount: vals.maxDiscount === '' ? null : Number(vals.maxDiscount),
      startDate: vals.startDate ? new Date(vals.startDate).toISOString() : null,
      endDate: vals.endDate ? new Date(vals.endDate).toISOString() : null,
      active: !!vals.active,
      usageLimit: vals.usageLimit === '' ? null : Number(vals.usageLimit),
    };
    onSubmit(payload);
  };

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-xl mb-4" style={{ color: brandColor }}>
          {initialData ? 'Edit Coupon' : 'Add Coupon'}
        </h3>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Code</span></label>
            <input type="text" className="input input-bordered uppercase" {...register('code', { required: 'Required' })} />
            {errors.code && <p className="text-error text-sm mt-1">{errors.code.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Description</span></label>
            <input type="text" className="input input-bordered" {...register('description')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Discount Type</span></label>
              <select className="select select-bordered" {...register('discountType', { required: true })}>
                <option value="percent">Percent (%)</option>
                <option value="fixed">Fixed (৳)</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Amount</span></label>
              <input type="number" min="0" className="input input-bordered" {...register('amount', { required: 'Required', valueAsNumber: true })} />
              <span className="text-xs opacity-70 mt-1">{discountType === 'percent' ? '% off' : 'BDT off'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Min Spend (৳)</span></label>
              <input type="number" min="0" className="input input-bordered" {...register('minSpend')} />
            </div>
            {discountType === 'percent' && (
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Max Discount Cap (৳)</span></label>
                <input type="number" min="0" className="input input-bordered" {...register('maxDiscount')} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Start Date-Time</span></label>
              <input type="datetime-local" className="input input-bordered" {...register('startDate')} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">End Date-Time</span></label>
              <input type="datetime-local" className="input input-bordered" {...register('endDate')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-4">
                <span className="label-text font-medium">Active?</span>
                <input type="checkbox" className="checkbox checkbox-primary" style={{ '--chkbg': brandColor, '--chkfg': '#fff' }} {...register('active')} />
              </label>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Usage Limit</span></label>
              <input type="number" min="0" className="input input-bordered" {...register('usageLimit')} />
              <span className="text-xs opacity-70 mt-1">Leave blank = unlimited</span>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: brandColor, borderColor: brandColor }} disabled={isSubmitting}>
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CouponModal
