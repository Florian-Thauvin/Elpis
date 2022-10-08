/**
 * ELPIS project - 2022
 */

import { DataNamed } from "../core/specific/DataNamed";
import { User } from "./user/User";

/**
 * Definition of a Team
 */
export class Team extends DataNamed {
  protected objectType: string = "Team";

  /** All user in the team */
  public crew: User[] = [];

  /**
   * Team constructor
   * @param name name of the user
   * @param crew set of all users
   *
   */
  constructor(name: string, ...crew: User[]) {
    super(name);
    this.crew = [...crew];
  }
}
