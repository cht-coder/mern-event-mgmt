const Customer = require("../models/Customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCustomer = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ mobileNo, password: hashedPassword });
    await customer.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    const customer = await Customer.findOne({ mobileNo });
    if (!customer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ customerId: customer._id }, "your_secret_key");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCombo = async (req, res) => {
  try {
    const custs = await Customer.aggregate()
      .addFields({ c_id: "$_id" })
      .project("-password -_id");
    res.status(200).json({ success: true, data: custs });
  } catch (err) {}
};
