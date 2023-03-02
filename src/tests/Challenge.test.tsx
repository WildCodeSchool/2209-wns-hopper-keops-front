import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InitializeChallenge from "../components/InitializeChallenge";
import CreateChallengeProvider from "../context/CreateChallengeProvider";

describe("Initialize Challenge component", () => {
  it('should disable "Actions" button when all fields are not filled', () => {
    const { getByText, getByLabelText } = render(
      <CreateChallengeProvider>
        <InitializeChallenge
          setChallengeNavigation={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </CreateChallengeProvider>
    );

    const nameField = screen.getByTestId("challengeName");
    // const startDateField = screen.getByLabelText(/Date de début :/i);
    // const lengthField = screen.getByLabelText(/Durée prévue en jours :/i);

    const actionsButton = screen.getByText(/Actions/i);

    expect(actionsButton).toBeDisabled();

    fireEvent.change(nameField, { target: { value: "Challenge 1" } });
    // fireEvent.change(startDateField, { target: { value: "2023-03-01" } });
    // fireEvent.change(lengthField, { target: { value: "10" } });

    console.log("this is", nameField);
    // expect(nameField).toHaveTextContent("Challenge 1");
    expect(nameField).toHaveTextContent("Challenge 1");

    expect(actionsButton).toBeEnabled();
  });
});
