const { User, Appointment } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

class SchedulerController {
  async index(req, res) {
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: "user" }],
      whare: {
        provider_id: req.session.id,
        date: {
          [Op.between]: [
            moment()
              .startOf("day")
              .format(),
            moment()
              .endOf("day")
              .format()
          ]
        }
      }
    });

    if (appointments.length == 0) {
      req.flash("error", "Não existe agendamento pra você!");
      return res.redirect("dashboard");
    }

    return res.render("scheduler/scheduler", { appointments });
  }
}

module.exports = new SchedulerController();
