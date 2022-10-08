/**
 * ELPIS project - 2022
 */

import { Skill } from "../common/Skill";
import { SkillSet } from "../common/SkillSet";
import { DataNamed } from "../core/specific/DataNamed";

/**
 * Definition of a task
 */
export class Task extends DataNamed {
    /**
     * Estimation of the task duration
     */
    public numberOfDays: number;

    /**
     * Number of security days used for risk prevention (will be added at the end of numberOfDays)
     */
    public securityDays: number;

    /** 
     * List of all needed skills for this task
     */
    public neededSkills: SkillSet;

    /**
     * A task to do
     * @param name name of the task
     * @param numberOfDays estimation of the task duration
     * @param securityDays number of security days used for risk prevention (will be added at the end of numberOfDays)
     * @param neededSkills list of all needed skills for this task
     */
    constructor(name: string, numberOfDays: number, securityDays = 0, ...neededSkills: Skill[]) {
        super(name);
        
        this.numberOfDays = numberOfDays;
        this.securityDays = securityDays;

        this.neededSkills = new SkillSet(neededSkills);
    }
}