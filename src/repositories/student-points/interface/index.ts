import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentPointsRepository extends IRepository<StudentPointsRepositoryType> {

    /**
     * @desc to avoid consistency issues we use a event sourcing methodology to add points
     * @return total amount of points
     */
    add(student_points_id: string, point: number): Promise<number>;

    /**
     * @desc to avoid consistency issues we use a event sourcing methodology to minus points
     * @return total amount of points
     */
    minus(student_points_id: string, point: number): Promise<number>;
}
export type StudentPointsRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string;
    total: number;
}