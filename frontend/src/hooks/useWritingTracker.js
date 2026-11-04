import { useEffect, useState } from "react";
import { api } from "../services/api";

const STORAGE_KEY = "writeflow_session";

export default function useWritingTracker() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("writeflow_history")) || [];
    } catch {
      return [];
    }
  });

  const [elapsed, setElapsed] = useState(
    () => Number(localStorage.getItem("writeflow_elapsed")) || 0
  );

  useEffect(() => {
    if (!session?.isRunning) return;

    const interval = setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [session?.isRunning]);

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    localStorage.setItem("writeflow_elapsed", String(elapsed));
  }, [session, elapsed]);

  useEffect(() => {
    localStorage.setItem("writeflow_history", JSON.stringify(history));
  }, [history]);

  const syncSession = (updated) => {
    if (updated?._id) {
      api.updateSession(updated._id, {
        title: updated.title,
        completedPages: updated.completedPages,
        isRunning: updated.isRunning,
        elapsedSeconds: elapsed,
        dailyLogs: updated.dailyLogs
      });
    }
  };

  const createSession = async (totalPages, title) => {
    const newSession = {
      title,
      totalPages: Number(totalPages),
      completedPages: 0,
      isRunning: true,
      createdAt: new Date().toISOString(),
      dailyLogs: {}
    };

    setSession(newSession);
    setElapsed(0);

    const saved = await api.createSession(newSession);

    if (saved?._id) {
      setSession((previous) => ({
        ...previous,
        _id: saved._id
      }));
    }
  };

  const nextPage = () => {
    if (!session || session.completedPages >= session.totalPages) return;

    const today = new Date().toLocaleDateString("en-CA");

    const updated = {
      ...session,
      completedPages: session.completedPages + 1,
      dailyLogs: {
        ...session.dailyLogs,
        [today]: (session.dailyLogs?.[today] || 0) + 1
      }
    };

    if (updated.completedPages === updated.totalPages) {
      updated.isRunning = false;
    }

    setSession(updated);
    syncSession(updated);
  };

  const previousPage = () => {
    if (!session || session.completedPages <= 0) return;

    const today = new Date().toLocaleDateString("en-CA");

    const updated = {
      ...session,
      completedPages: session.completedPages - 1,
      dailyLogs: {
        ...session.dailyLogs,
        [today]: Math.max(0, (session.dailyLogs?.[today] || 0) - 1)
      }
    };

    setSession(updated);
    syncSession(updated);
  };

  const toggleTimer = () => {
    if (!session) return;

    const updated = {
      ...session,
      isRunning: !session.isRunning
    };

    setSession(updated);

    if (updated._id) {
      api.updateSession(updated._id, {
        isRunning: updated.isRunning,
        elapsedSeconds: elapsed
      });
    }
  };

  const resetSession = () => {
    if (!session) return;

    const completedSession = {
      ...session,
      isRunning: false,
      elapsedSeconds: elapsed,
      finishedAt: new Date().toISOString()
    };

    if (session._id) {
      api.updateSession(session._id, {
        isRunning: false,
        elapsedSeconds: elapsed,
        finishedAt: completedSession.finishedAt
      });
    }

    setHistory((previous) => [
      completedSession,
      ...previous
    ]);

    setSession(null);
    setElapsed(0);

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("writeflow_elapsed");
  };

  return {
    session,
    history,
    elapsed,
    createSession,
    nextPage,
    previousPage,
    toggleTimer,
    resetSession
  };
}