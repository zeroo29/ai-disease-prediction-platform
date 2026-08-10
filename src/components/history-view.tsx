"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  ChevronRight,
  LoaderCircle,
  Search,
  Trash2,
} from "lucide-react";
import type { Prediction } from "@/types";

export function HistoryView() {
  const [rows, setRows] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/predictions");

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        const result = await response.json();

        if (!cancelled) {
          setRows(result.data || []);
        }
      } catch (error) {
        console.error("Failed to load prediction history:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function remove(id: number) {
    if (!confirm("Delete this prediction permanently?")) {
      return;
    }

    try {
      await fetch(`/api/predictions/${id}`, {
        method: "DELETE",
      });

      setRows((currentRows) =>
        currentRows.filter((row) => row.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete prediction:", error);
    }
  }

  const search = query.toLowerCase();

  const shown = rows.filter(
    (row) =>
      row.modelName.toLowerCase().includes(search) ||
      row.prediction.toLowerCase().includes(search)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] px-4">
        <Search className="h-5 w-5 opacity-60" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by model or risk category"
          className="w-full bg-transparent py-3 outline-none"
        />
      </div>

      {!rows.length ? (
        <div className="rounded-xl border border-[var(--line)] p-8 text-center">
          <BrainCircuit className="mx-auto mb-3 h-8 w-8 opacity-60" />

          <p className="font-medium">No predictions yet.</p>

          <Link
            href="/predict/alzheimers"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2"
          >
            Start analysis
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--line)]">
          <div className="grid grid-cols-4 gap-4 border-b border-[var(--line)] p-4 text-sm font-medium">
            <span>Model & date</span>
            <span>Version</span>
            <span>Result</span>
            <span>Actions</span>
          </div>

          {shown.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-4 gap-4 border-b border-[var(--line)] p-4 last:border-b-0"
            >
              <div>
                <p className="font-medium">{row.modelName}</p>
                <p className="text-sm opacity-60">
                  {new Date(row.createdAt).toLocaleString()} · ID #{row.id}
                </p>
              </div>

              <div>{row.modelVersion}</div>

              <div>
                {row.prediction} ·{" "}
                {Math.round(row.probability * 100)}%
              </div>

              <div className="flex items-center gap-2">
                <Link
                  aria-label="View details"
                  href={`/history/${row.id}`}
                  className="rounded-lg border border-[var(--line)] p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  aria-label="Delete prediction"
                  onClick={() => remove(row.id)}
                  className="rounded-lg border border-red-500/20 p-2 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {!shown.length && (
            <div className="p-8 text-center opacity-60">
              No predictions match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}