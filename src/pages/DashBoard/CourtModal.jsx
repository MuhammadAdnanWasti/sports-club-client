import React from 'react'
import { useForm } from 'react-hook-form';
// ---------- Helpers ----------
const parseSlotsInput = (raw) => {
  if (!raw) return [];
  return raw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const slotsToTextarea = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
  
const CourtModal = ({ open, onClose, initialData = null, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: initialData?.type || '',
      image: initialData?.image || '',
      price: initialData?.price ?? '',
      slotsText: slotsToTextarea(initialData?.slots) || '',
    },
  });

  // Reset on open change / data change
  React.useEffect(() => {
    reset({
      type: initialData?.type || '',
      image: initialData?.image || '',
      price: initialData?.price ?? '',
      slotsText: slotsToTextarea(initialData?.slots) || '',
    });
  }, [initialData, reset, open]);

  const submitHandler = (values) => {
    const payload = {
      type: values.type,
      image: values.image,
      price: Number(values.price),
      slots: parseSlotsInput(values.slotsText),
    };
    onSubmit(payload);
  };

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-xl mb-4" style={{ color: '#76b38f' }}>
          {initialData ? 'Edit Court' : 'Add New Court'}
        </h3>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Court Type</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register('type', { required: 'Required' })}
            />
            {errors.type && <p className="text-error text-sm mt-1">{errors.type.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="url"
              className="input input-bordered"
              {...register('image', { required: 'Required' })}
            />
            {errors.image && <p className="text-error text-sm mt-1">{errors.image.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Price (BDT per session)</span>
            </label>
            <input
              type="number"
              min="0"
              className="input input-bordered"
              {...register('price', { required: 'Required', valueAsNumber: true })}
            />
            {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Slots (one per line or comma separated)</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="7:00 AM - 8:00 AM\n9:00 AM - 10:00 AM"
              {...register('slotsText')}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: '#76b38f', borderColor: '#76b38f' }}
              disabled={isSubmitting}
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};


export default CourtModal
