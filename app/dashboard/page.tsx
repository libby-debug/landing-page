"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type MasteryScore = {
  id: string;
  module_slug: string;
  module_title: string;
  score: number;
  mastered: boolean;
  created_at: string;
};

export default function DashboardPage() {
  const [scores, setScores] = useState<MasteryScore[]>([]);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    async function loadScores() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please log in to view your dashboard.");
        return;
      }

      const { data, error } = await supabase
        .from("mastery_scores")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setScores(data || []);
      setMessage("");
    }

    loadScores();
  }, []);

  const latestScore = scores[0];
  const masteredCount = scores.filter((score) => score.mastered).length;
  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((total, score) => total + score.score, 0) /
            scores.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          ABA Mastered Dashboard
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-slate-950">
          Your Learning Progress
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Track mastery, recent study, and weak areas. Mastery is earned at 90%
          or higher.
        </p>

        {message && (
          <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
            <p className="font-semibold text-slate-700">{message}</p>

            <Link
              href="/login"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!message && (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase text-blue-600">
                  Average Score
                </p>
                <p className="mt-3 text-5xl font-extrabold text-blue-700">
                  {averageScore}%
                </p>
              </div>

              <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase text-green-600">
                  Mastered Attempts
                </p>
                <p className="mt-3 text-5xl font-extrabold text-green-700">
                  {masteredCount}
                </p>
              </div>

              <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase text-purple-600">
                  Recent Study
                </p>
                <p className="mt-3 text-2xl font-extrabold text-purple-700">
                  {latestScore ? latestScore.module_title : "None yet"}
                </p>
              </div>
            </div>

            <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">
                Mastery History
              </h2>

              {scores.length === 0 ? (
                <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                  <p className="text-slate-700">
                    No mastery scores yet. Complete the Differential
                    Reinforcement quiz first.
                  </p>

                  <Link
                    href="/modules/differential-reinforcement/quiz"
                    className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                  >
                    Take Mastery Quiz
                  </Link>
                </div>
              ) : (
                <div className="mt-5 grid gap-4">
                  {scores.map((score) => (
                    <div
                      key={score.id}
                      className="rounded-2xl border bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-950">
                            {score.module_title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {new Date(score.created_at).toLocaleString()}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-3xl font-extrabold text-slate-950">
                            {score.score}%
                          </p>

                          <p
                            className={
                              score.mastered
                                ? "font-bold text-green-700"
                                : "font-bold text-orange-700"
                            }
                          >
                            {score.mastered ? "Mastered" : "Needs Review"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="mt-8">
              <Link
                href="/modules"
                className="inline-block rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
              >
                Continue Studying →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}