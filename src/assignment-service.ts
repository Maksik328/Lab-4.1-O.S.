import { Assignment, StudentSubmission } from "./assignment";

//Control assignment and submission proccess
class AssignmentService {
	private assignments: Assignment[] = [];
	private submissions: StudentSubmission[] = [];

	createAssignment(assignment: Assignment) {
		this.assignments.push(assignment);
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
