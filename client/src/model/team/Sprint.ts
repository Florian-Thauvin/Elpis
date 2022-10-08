/**
 * ELPIS project - 2022
 */

import { DataNamed } from "../core/specific/DataNamed";
import { Task } from "../parameters/Task";
import { Team } from "./Team";

/**
 * Definition of a sprint
 */
export class Sprint extends DataNamed {
    protected objectType: string = "Sprint";

    /** List of all {@link Task} to do in duration defined in {@link GeneralParameters} */
    public backlog: Task[];

    /**
     * The {@link Team} in charge of the sprint
     */
    public team: Team;

    /**
     * Constructor of a sprint
     * @param name designator of the sprint
     * @param backlog list of all task  to do in duration defined in {@link GeneralParameters} 
     * @param team  {@link Team} in charge of the sprint
     */
    constructor(name: string, team: Team, ...backlog: Task[]) {
        super(name);
        this.backlog = [...backlog];
        this.team = team;
    }
}