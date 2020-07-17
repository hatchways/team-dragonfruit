import React from "react";
import WithBackground from "../hocs/withBackground";

import Onboarding from "../components/Onboarding";

const OnboardingPage = () => {
	return (
		<WithBackground>
			<Onboarding />
		</WithBackground>
	);
};

export default OnboardingPage;
