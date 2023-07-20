import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import InitializeChallenge from '../components/InitializeChallenge';
import CreateChallengeProvider from '../context/CreateChallengeProvider';
import ActionsChallenge from '../components/ActionsChallenge';

describe('Initialize Challenge component', () => {
	it('should create a challenge', async () => {
		const mockedActions = [
			{
				id: 1,
				title: 'Action 1',
				description: 'Description 1',
				successValue: 10,
			},
			{
				id: 2,
				title: 'Action 2',
				description: 'Description 2',
				successValue: 20,
			},
			{
				id: 3,
				title: 'Action 3',
				description: 'Description 3',
				successValue: 30,
			},
		];

		const mocks = [
			{
				request: {
					query: gql`
						query ReadAllActions {
							readAllActions {
								id
								title
								description
								successValue
							}
						}
					`,
				},
				result: {
					data: {
						readAllActions: mockedActions,
					},
				},
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateChallengeProvider>
					<InitializeChallenge setChallengeNavigation={() => {}} />
					<ActionsChallenge setChallengeNavigation={() => {}} />
				</CreateChallengeProvider>
			</MockedProvider>,
		);

		const nameField = screen.getByTestId('challengeName');
		const startDateField = screen.getByTestId('challengeDate');
		const lengthField = screen.getByTestId('challengeLength');
		const challengeButton = screen.getByTestId('challengeButton');

		expect(challengeButton).toBeDisabled();

		fireEvent.change(nameField, { target: { value: 'Challenge 1' } });
		fireEvent.change(startDateField, { target: { value: '2023-03-01' } });
		fireEvent.change(lengthField, { target: { value: 10 } });

		expect(challengeButton).toBeEnabled();
		fireEvent.click(challengeButton);

		await waitFor(() => {
			const actionList = screen.queryAllByTestId('actionCard');
			expect(actionList).toHaveLength(3);
		});

		const addActionButtonList = screen.queryAllByTestId('addActionButton');
		const nextButtonActions = screen.getByTestId('nextButtonActions');
		expect(nextButtonActions).toBeDisabled();
		expect(addActionButtonList).toHaveLength(3);

		fireEvent.click(addActionButtonList[0]);
		expect(nextButtonActions).toBeEnabled();
		fireEvent.click(nextButtonActions);
	});
});
