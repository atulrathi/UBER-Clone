
module.exports.generateOtp = async (req, res) => {
  try {

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log("Generated OTP:", otp);

    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};
