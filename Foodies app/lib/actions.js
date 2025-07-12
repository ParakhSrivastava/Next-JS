"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meal";
import { revalidatePath } from "next/cache";

function isInvalidInput(input) {
  return !input || input.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const creator = formData.get('name');
  const creator_email = formData.get('email');
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image');

  if (isInvalidInput(creator) || isInvalidInput(creator_email) || isInvalidInput(title) || isInvalidInput(summary) || isInvalidInput(instructions) || !image) {
    return {
      message: 'Invalid input!',
    };
  }

  const meal = {
    creator,
    creator_email,
    title,
    summary,
    instructions,
    image,
  };

  await saveMeal(meal);

  // Note: Next.js pre-renders static pages at build time, so we need to revalidate the meals page to show the newly added meal
  // If not revalidated, the new meal will not appear until the next build
  // layout: all the nested pages under the /meals route will be revalidated
  // page: only the current page will be revalidated
  revalidatePath('/meals', 'layout');

  // Note: Redirect to the meals page after successfully saving the meal
  redirect('/meals');
};