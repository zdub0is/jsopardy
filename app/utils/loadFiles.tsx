/**
 * This file will have two functions, one to load the categories json file and return an array of categories plus their file names.
 * The other will load the requested category file and return the questions.
 */

// import fs from 'fs';
// import path from 'path';

/**
 * Load the categories json file and return an array of categories plus their file names.
 * @returns {Array} An array of objects with the category name and file name.
 */
export async function loadCategories() {
  const categories = await fetch('data/categories.json').then((res) => res.json());
  return categories;
}

/**
 * Load the requested category file and return the questions.
 * @param {String} category The name of the category file to load.
 * @returns {Array} An array of questions.
 */

export async function loadCategory(category: string) {
  const questions = await fetch(`data/${category}`).then((res) => res.json());
  return questions;
}

/**
 * Loads finalJeopardies.json file and returns the questions
 */
export async function loadFinalJeopardy() {
  const finalJeopardies = await fetch('data/finaljeopardies.json').then((res) => res.json());
  return finalJeopardies;
}