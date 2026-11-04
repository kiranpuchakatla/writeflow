import WritingSession from "../models/WritingSession.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await WritingSession.find()
      .sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const { title, totalPages } = req.body;

    if (
      !Number.isInteger(Number(totalPages)) ||
      Number(totalPages) < 1
    ) {
      return res.status(400).json({
        message: "Please enter a valid total page count."
      });
    }

    const session = await WritingSession.create({
      title,
      totalPages: Number(totalPages)
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const session = await WritingSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    const { title, completedPages, isRunning, elapsedSeconds, dailyLogs, finishedAt } = req.body;

    if (title !== undefined) session.title = title;

    if (completedPages !== undefined) {
      const pages = Number(completedPages);

      if (
        !Number.isInteger(pages) ||
        pages < 0 ||
        pages > session.totalPages
      ) {
        return res.status(400).json({
          message: "Invalid completed page count."
        });
      }

      session.completedPages = pages;
    }

    if (isRunning !== undefined) {
      session.isRunning = Boolean(isRunning);
    }

    if (elapsedSeconds !== undefined) {
      session.elapsedSeconds = Math.max(0, Number(elapsedSeconds));
    }

    if (dailyLogs !== undefined) {
      session.dailyLogs = dailyLogs;
    }

    if (finishedAt !== undefined) {
      session.finishedAt = finishedAt;
    }

    await session.save();

    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await WritingSession.findByIdAndDelete(
      req.params.id
    );

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    res.status(200).json({
      message: "Session deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};