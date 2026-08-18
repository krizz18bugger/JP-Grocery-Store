import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitReview } from '../api/api.js';
import AuthModal from './AuthModal.jsx';
import './AddReviewForm.css';

const AddReviewForm = ({ productId }) => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const [showAuth, setShowAuth] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () => submitReview({ productId, rating, comment, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setRating(0);
      setComment('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    mutation.mutate();
  };

  // Not logged in — show prompt
  if (!user) {
    return (
      <>
        <div className="review-login-prompt">
          <p>உங்கள் அனுபவத்தை பகிர்ந்து கொள்ளுங்கள்</p>
          <button className="review-login-btn" onClick={() => setShowAuth(true)}>
            மதிப்புரை எழுத உள்நுழையவும்
          </button>
        </div>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <p className="review-form__greeting">
        வணக்கம், <strong>{user.name}</strong>! உங்கள் மதிப்புரையை பதிவிடுங்கள்.
      </p>

      {/* Star selector */}
      <div className="review-form__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="review-star-btn"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            aria-label={`${star} நட்சத்திரம்`}
          >
            <Star
              size={28}
              fill={(hovered || rating) >= star ? 'var(--accent)' : 'transparent'}
              color={(hovered || rating) >= star ? 'var(--accent)' : 'var(--stroke)'}
              strokeWidth={2}
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        className="review-form__textarea"
        placeholder="உங்கள் அனுபவத்தை விவரிக்கவும்..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        required
      />

      {/* Error */}
      {mutation.isError && (
        <p className="review-form__error">
          {mutation.error?.response?.data?.message || 'சமர்ப்பிக்க இயலவில்லை.'}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="review-form__success">✓ மதிப்புரை சேர்க்கப்பட்டது!</p>
      )}

      <button
        className="review-form__submit"
        type="submit"
        disabled={rating === 0 || mutation.isPending}
      >
        {mutation.isPending ? 'சமர்ப்பிக்கிறது...' : 'மதிப்புரையை சமர்ப்பிக்கவும்'}
      </button>
    </form>
  );
};

export default AddReviewForm;
