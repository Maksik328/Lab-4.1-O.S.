import { Assignment, StudentSubmission } from "./assignment";

//Control assignment and submission proccess
class AssignmentService {
    private assignments: Assignment[] = [];
    private submissions: StudentSubmission[] = [];

    createAssignment(assignment: Assignment) {
        this.assignments.push(assignment);
    }

    updateAssignment(assignmentId: number, updatedAssignment: Assignment) {
        const assignmentIndex = this.assignments.findIndex(
            (assignment) => assignment.id === assignmentId
        );
        if (assignmentIndex !== -1) {
            this.assignments[assignmentIndex] = {
                ...this.assignments[assignmentIndex],
                ...updatedAssignment,
            };
        }
    }

    deleteAssignment(assignmentId: number) {
        this.assignments = this.assignments.filter(
            (assignment) => assignment.id !== assignmentId
        );
    }

    submitAssignment(submission: StudentSubmission) {
        this.submissions.push(submission);
    }

    getAssignments() {
        return this.assignments;
    }

    getSubmissions(assignmentId: number) {
        return this.submissions.filter(
            (submission) => submission.assignmentId === assignmentId
        );
    }
}

export default AssignmentService;
