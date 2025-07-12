import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// Note: we are converting the function to an async function to make this work as a promise-based function.
export async function getMeals() {
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  // throw new Error("Simulated error while fetching meals");
  return db.prepare('SELECT * FROM meals').all();
}

export function getMealBySlug(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  const { creator, creator_email, title, summary, instructions, image } = meal;

  if (!creator || !creator_email || !title || !summary || !instructions || !image) {
    throw new Error('All fields are required!');
  }

  const slug = slugify(title, { lower: true });
  const sanitizedSummary = xss(summary);
  const sanitizedInstructions = xss(instructions);

  const extension = image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;
  const filePath = `public/images/${fileName}`;
  const bufferedImage = await image.arrayBuffer();
  
  // writes the image file to the public/images directory
  fs.createWriteStream(filePath).write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Failed to save the image file.');
    }
  });

  const updatedImage = `/images/${fileName}`;

  db.prepare('INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(creator, creator_email, title, sanitizedSummary, sanitizedInstructions, updatedImage, slug);
}

