import React from "react";
import AssignmentService from "./assignment-service";
import { Assignment, StudentSubmission } from "./assignment";

const assignmentService = new AssignmentService();

const App = () => {
	const [assignments, setAssignments] = React.useState<Assignment[]>([]);
	const [submissions, setSubmissions] = React.useState<StudentSubmission[]>([]);

	const handleCreateAssignment = () => {
		const newAssignment: Assignment = {
			id: assignments.length + 1,
			title: `Assignment ${assignments.length + 1}`,
			dueDate: new Date(),
			submissions: 0,
		};

		assignmentService.createAssignment(newAssignment);
		setAssignments([...assignments, newAssignment]);
	};

	//needed for future assignment submission functionality
	const handleSubmitAssignment = (assignmentId: number, content: string) => {
		const newSubmission: StudentSubmission = {
			assignmentId,
			studentId: 1,
			submittedAt: new Date(),
			content,
		};

		assignmentService.submitAssignment(newSubmission);
		setSubmissions([...submissions, newSubmission]);
	};

	const handleViewSubmissions = (assignmentId: number) => {
		const assignmentSubmissions =
			assignmentService.getSubmissions(assignmentId);
		setSubmissions(assignmentSubmissions);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Assignment Service</h1>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
				onClick={handleCreateAssignment}
			>
				Create Assignment
			</button>
			<div>
				<h2 className="text-xl font-bold mb-2">Assignments</h2>
				{assignments.map((assignment) => (
					<div key={assignment.id} className="mb-2">
						<span>{assignment.title}</span>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
							onClick={() => handleViewSubmissions(assignment.id)}
						>
							View Submissions ({assignment.submissions})
						</button>
					</div>
				))}
			</div>
			{submissions.length > 0 && (
				<div>
					<h2 className="text-xl font-bold mb-2 mt-4">Submissions</h2>
					{submissions.map((submission) => (
						<div key={submission.submittedAt.getTime()} className="mb-2">
							<div>{submission.content}</div>
							<div>Submitted at: {submission.submittedAt.toString()}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
