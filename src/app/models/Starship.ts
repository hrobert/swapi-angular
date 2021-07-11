/**
 * Not used yet.
 * The thing is, the API is using snake case (with underscores).
 * The simple thing would be to use that here too
 */
export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  maxAtmospheringSpeed: number;
  // TODO: add other properties
}
