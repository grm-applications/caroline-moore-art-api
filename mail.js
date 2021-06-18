
const nodemailer = require("nodemailer");

function sendMail(name, email, subject, message) {

	let transport = nodemailer.createTransport({
		host: "smtp.office365.com",
		post: 587,
		secure: false,
		auth: {
			user: "grmapplications@outlook.com",
			pass: "1Gyrate1",
		}
	});

	const hostEmail = "grmapplications@outlook.com"

	let mailOptions = {
		from: `"Caroline Moore Art" <${hostEmail}>`,
		to: hostEmail,
		subject: subject,
		text: `${name} (${email}) has sent you a message: ${message}`,
	};

	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Message Sent: ", info.messageId);
		}
	});

}

module.exports = sendMail;