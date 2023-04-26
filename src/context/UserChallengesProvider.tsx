// import React, { createContext, useState } from 'react';
// import { IParticipantChallenge } from '../interfaces/IParticipantChallenge';

// interface UserChallengesContextProps {
// 	userChallenges: IParticipantChallenge;
// 	setUserChallenges: React.Dispatch<React.SetStateAction<IParticipantChallenge>>;
// }

// export const UserChallengesContext = createContext<UserChallengesContextProps>({
// 	userChallenges: {} as IParticipantChallenge,
// 	setUserChallenges: () => {},
// });

// const UserChallengesProvider = (props: { children: React.ReactNode }) => {
// 	const [userChallenges, setUserChallenges] = useState<IParticipantChallenge>(
// 		{} as IParticipantChallenge,
// 	);

// 	return (
// 		<UserChallengesContext.Provider
// 			value={{ userChallenges, setUserChallenges }}
// 		>
// 			{props.children}
// 		</UserChallengesContext.Provider>
// 	);
// };

// export default UserChallengesProvider;
export {};
