import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { createChallenge } from "../graphql/createChallenge";

const InvitationChallenge = () => {
  const dataChallenge = useContext(ChallengeContext);
  console.log("this is challenge contexte bis :", dataChallenge);

  // const [createChallengeMutation, { loading, error }] =
  // useMutation(createChallenge);

  // async function onSubmit(event: { preventDefault: () => void }) {
  // event.preventDefault();

  // try {
  // 	await createChallengeMutation({
  // 		variables: {
  // 			data: {
  // 				name,
  // 				length,
  // 				start_date: startDate,
  // 			},
  // 		},
  // 	});
  // 	setName('');
  // 	setStartDate(new Date());
  // 	setLength(0);
  // } catch {
  // 	console.log(error);
  // }
  // }
  return <div>InvitationChallenge</div>;
};

export default InvitationChallenge;
