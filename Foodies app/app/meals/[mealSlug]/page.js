import Image from "next/image";
import classes from "./page.module.css";
import { getMealBySlug } from "@/lib/meal";
import { notFound } from "next/navigation";

// Note: generateMetadata is used to generate metadata for the dynamic url page, such as title and description.
export async function generateMetadata({ params}) {
  const { mealSlug } = params;
  const meal = getMealBySlug(mealSlug);

  if (!meal) {
    return {
      title: 'Meal not found',
      description: 'The meal you are looking for does not exist.',
    };
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealsSlugPage = ({ params }) => {
  const { mealSlug } = params;
  const meal = getMealBySlug(mealSlug);

  if (!meal) {
    // will show the closest not found page
    notFound();
  }

  const { title, image, summary, creator, instructions, creator_email } = meal;
  const updatedInstructions = instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>
            {summary}
          </p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: updatedInstructions
        }}/>
      </main>
    </>
  )
}

export default MealsSlugPage;
