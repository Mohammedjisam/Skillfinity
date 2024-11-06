function otpEmailTemplate(otp) {
    return {
      subject: "Your OTP Code",
      htmlContent: `<h1>OTP HERE IS</h1><h2>${otp}</h2>`,
    };
  }
  
  module.exports = otpEmailTemplate;
  