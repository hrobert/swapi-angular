import { Pilot } from "./Pilot";

/**
 * To simplify things, all properties are just strings and the case used is the
 * same as the one from the API
 */
export interface Starship {
  id: number;

  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;

  pilots: string[];
  films: string[];

  pilotsData: Pilot[];

  created: string;
  edited: string;
  url: string;
}