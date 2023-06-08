import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import AssignmentService from "./assignment-service";


describe("App", () => {

    beforeEach(() => {
    });

    it("renders the login screen initially", () => {
        render(<App />);
        expect(screen.getByText("Assignment Service")).toBeInTheDocument();
        expect(screen.getByText("Teacher")).toBeInTheDocument();
        expect(screen.getByText("Student")).toBeInTheDocument();
    });

    it("renders the app screen when role is selected", () => {
        render(<App />);
        fireEvent.click(screen.getByText("Teacher"));
        expect(screen.getByText("Create Assignment")).toBeInTheDocument();
    });

    //it("creates a new assignment and displays it", () => {
    //    render(<App />);
    //    fireEvent.click(screen.getByText("Teacher"));
    //    fireEvent.click(screen.getByText("Create Assignment"));
    //    expect(screen.getByText(/Assignment \d/)).toBeInTheDocument();
    //});

    //it("deletes an assignment", () => {
    //    render(<App />);
    //    fireEvent.click(screen.getByText("Teacher"));
    //    fireEvent.click(screen.getByText("Create Assignment"));
    //    fireEvent.click(screen.getByText("Delete"));
    //    expect(screen.queryByText(/Assignment \d/)).not.toBeInTheDocument();
    //});

    //it("displays submissions for an assignment", () => {
    //    render(<App />);
    //    fireEvent.click(screen.getByText("Teacher"));
    //    fireEvent.click(screen.getByText("Create Assignment"));
    //    fireEvent.click(screen.getByText("View Submissions (0)"));
    //    expect(screen.getByText("Submissions")).toBeInTheDocument();
    //});

    //it("submits an assignment and displays the submission", () => {
    //    render(<App />);
    //    fireEvent.click(screen.getByText("Student"));
    //    fireEvent.click(screen.getByText("Assignment Service"));
    //    fireEvent.click(screen.getByText("Create Assignment"));

    //    const content = "This is my submission";
    //    fireEvent.change(screen.getByLabelText("Submission Content"), { target: { value: content } });
    //    fireEvent.click(screen.getByText("Submit"));

    //    expect(screen.getByText(content)).toBeInTheDocument();
    //    expect(screen.getByText(/Submitted at: \d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
    //});
});

describe("AssignmentService", () => {
    let assignmentService: AssignmentService;

    beforeEach(() => {
        assignmentService = new AssignmentService();
    });

    it("creates a new assignment", () => {
        const assignment = {
            id: 1,
            title: "Test Assignment",
            dueDate: new Date(),
            submissions: 0,
        };

        assignmentService.createAssignment(assignment);
        expect(assignmentService.getAssignments()).toContain(assignment);
    });

    it("updates an existing assignment", () => {
        const assignment = {
            id: 1,
            title: "Test Assignment",
            dueDate: new Date(),
            submissions: 0,
        };

        const updatedAssignment = {
            ...assignment,
            title: "Updated Assignment",
            submissions: 1,
        };

        assignmentService.createAssignment(assignment);
        assignmentService.updateAssignment(assignment.id, updatedAssignment);

        const assignments = assignmentService.getAssignments();
        const updated = assignments.find((a) => a.id === assignment.id);

        expect(updated).toEqual(updatedAssignment);
    });

    it("deletes an assignment", () => {
        const assignment = {
            id: 1,
            title: "Test Assignment",
            dueDate: new Date(),
            submissions: 0,
        };

        assignmentService.createAssignment(assignment);
        assignmentService.deleteAssignment(assignment.id);

        const assignments = assignmentService.getAssignments();
        expect(assignments).not.toContain(assignment);
    });

    it("submits an assignment", () => {
        const submission = {
            assignmentId: 1,
            studentId: 1,
            studentName: "John Doe",
            submittedAt: new Date(),
            content: "This is my submission",
        };

        assignmentService.submitAssignment(submission);
        const submissions = assignmentService.getSubmissions(submission.assignmentId);
        expect(submissions).toContain(submission);
    });
});
