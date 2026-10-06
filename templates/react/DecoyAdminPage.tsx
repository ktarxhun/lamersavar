"use client";

import React, { useState } from "react";
import Jumpscare from "./Jumpscare";

export default function DecoyAdminPage() {
  const [jumpscareActive, setJumpscareActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJumpscareActive(true);
  };

  return (
    <>
      <Jumpscare active={jumpscareActive} videoSrc="/media/jumpscare.mp4" />

      <main className="min-h-screen flex items-center justify-center bg-[#090d16] text-white p-6 font-sans">
        <div className="w-full max-w-md bg-[#111726] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-blue-400 font-bold">
              ⚡
            </div>
            <h1 className="text-xl font-bold tracking-tight">Executive Management Console</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">AUTHORIZED PERSONNEL ONLY</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Operator Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-3 bg-[#0b0f19] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Security Keyphrase
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-[#0b0f19] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg text-sm transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99]"
            >
              Sign In to Management
            </button>
          </form>

          <p className="mt-6 text-[11px] text-center text-slate-500">
            Access strictly monitored under automated intrusion detection systems.
          </p>
        </div>
      </main>
    </>
  );
}
