import React from 'react'
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
const brandColor = '#76b38f';
const AnnouncementModal = ({ open, onClose, initialData = null, onSubmit }) => {
  const { user } = useAuth(); 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      message: initialData?.message || '',
      image: initialData?.image || '',
      startDate: initialData?.startDate ? initialData.startDate.slice(0,16) : '',
      endDate: initialData?.endDate ? initialData.endDate.slice(0,16) : '',
      active: initialData?.active ?? true,
    },
  });

  React.useEffect(() => {
    reset({
      title: initialData?.title || '',
      message: initialData?.message || '',
      image: initialData?.image || '',
      startDate: initialData?.startDate ? initialData.startDate.slice(0,16) : '',
      endDate: initialData?.endDate ? initialData.endDate.slice(0,16) : '',
      active: initialData?.active ?? true,
    });
  }, [initialData, reset, open]);

  const submitHandler = (vals) => {
    const payload = {
      title: vals.title.trim(),
      message: vals.message.trim(),
      image: vals.image.trim() || null,
      startDate: vals.startDate ? new Date(vals.startDate).toISOString() : null,
      endDate: vals.endDate ? new Date(vals.endDate).toISOString() : null,
      active: !!vals.active,
      // created_by handled server-side using admin email from token if new
    };
    onSubmit(payload);
  };

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-xl mb-4" style={{ color: brandColor }}>
          {initialData ? 'Edit Announcement' : 'Add Announcement'}
        </h3>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Title</span></label>
            <input type="text" className="input input-bordered" {...register('title', { required: 'Required' })} />
            {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Message</span></label>
            <textarea className="textarea textarea-bordered h-32" {...register('message', { required: 'Required' })} />
            {errors.message && <p className="text-error text-sm mt-1">{errors.message.message}</p>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Image URL (optional)</span></label>
            <input type="url" className="input input-bordered" {...register('image')} />
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

          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <span className="label-text font-medium">Active?</span>
              <input type="checkbox" className="checkbox checkbox-primary" style={{ '--chkbg': brandColor, '--chkfg': '#fff' }} {...register('active')} />
            </label>
          </div>

          {user?.email && !initialData && (
            <p className="text-xs opacity-70">Will be created by: {user.email}</p>
          )}

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

export default AnnouncementModal
