/**
 * To simplify things, all properties are just strings and the case used is the
 * same as the one from the API
 */
 export interface Pilot {
  id: number;

  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;

  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];

  created: string;
  edited: string;
  url: string;
}
