import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailTrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification", error);
    throw new Error(`Error sending verification ${error}`);
  }
};
