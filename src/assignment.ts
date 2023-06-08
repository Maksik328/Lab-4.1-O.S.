//Types

export interface Assignment {
	id: number;
	title: string;
	dueDate: Date;
	submissions: number;
}

export interface StudentSubmission {
	assignmentId: number;
	studentId: number;
	studentName: string;
	submittedAt: Date;
	content: string;
}
