import { MockDatabaseRepository } from "../../base/mock";
import { IStudentPointsRepository, StudentPointsRepositoryType } from "../interface";

export class StudentPointsMockRepository extends MockDatabaseRepository<StudentPointsRepositoryType> implements IStudentPointsRepository {
    constructor(data: StudentPointsRepositoryType[]) {
        super(data);
    }
    async add(student_points_id: string, point: number): Promise<number> {
        let total = 0;
        this.data.forEach(item => {
            if (item['id'] !== student_points_id) {
                return;
            }
            
            Object.assign(item, { total: item.total + point, v: item.v + 1, updated_at: new Date() });
            total = item.total;
        });
      
        return total;
    }
    async minus(student_points_id: string, point: number): Promise<number> {
        let total = 0;
        this.data.forEach(item => {
            if (item['id'] !== student_points_id) {
                return;
            }
            
            Object.assign(item, { total: item.total - point <= 0 ? 0 : item.total - point, v: item.v + 1, updated_at: new Date() });
            total = item.total;
        });
      
        return total;
    }
}