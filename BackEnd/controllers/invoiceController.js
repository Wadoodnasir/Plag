const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch invoices for a user
exports.getInvoices = async (req, res) => {
  const { userId } = req.params;

  try {
    const invoices = await prisma.invoice.findMany({ where: { userId } });
    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create an invoice
exports.createInvoice = async (req, res) => {
  const { userId, amount, description } = req.body;

  try {
    const invoice = await prisma.invoice.create({
      data: { userId, amount, description },
    });

    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
