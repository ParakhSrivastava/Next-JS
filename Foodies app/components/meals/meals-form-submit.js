"use client";
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // Note: useFormStatus is used to get the status of the form submission, which can be used to show loading states or errors.
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}