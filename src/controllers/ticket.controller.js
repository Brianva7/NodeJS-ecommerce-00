import ticketService from "../services/tickets.service.js";

export default class ticketController {
  static getTickets = async (req, res) => {
    try {
      const tickets = await ticketService.getTickets();
      res.json({ status: "success", payload: tickets });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static getTicketById = async (req, res) => {
    try {
      const { tid } = req.params;
      const ticket = await ticketService.getTicketById(tid);
      res.json({ status: "success", payload: ticket });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static createTicket = async (req, res) => {
    try {
      const newTicket = await ticketService.createTicket(req.body);
      res.json({ status: "success", payload: newTicket });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static deleteTicket = async (req, res) => {
    try {
      const { tid } = req.params;
      const deletedTicket = await ticketService.deleteTicket(tid);
      res.json({ status: "success", payload: deletedTicket });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };
}
