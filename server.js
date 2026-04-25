app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received booking:", req.body);

    res.status(200).json({
      success: true,
      message: "Booking received successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});