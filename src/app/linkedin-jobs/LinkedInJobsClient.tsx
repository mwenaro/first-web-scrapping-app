"use client";
import React from "react";
import { DEFAULT_LINKEDIN_JOBS_URL } from "./defaultUrl";

export default function LinkedInJobsClient() {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [company, setCompany] = React.useState("all");
  const [location, setLocation] = React.useState("all");
  const [datePosted, setDatePosted] = React.useState("past1hr");
  const [applicationMode, setApplicationMode] = React.useState("all");

  const companies = React.useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => { if (j.company) set.add(j.company); });
    return Array.from(set);
  }, [jobs]);

  const locations = React.useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => { if (j.location) set.add(j.location); });
    return Array.from(set);
  }, [jobs]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setJobs([]);
      try {
        let url = `${DEFAULT_LINKEDIN_JOBS_URL}`;
        const res = await fetch("/api/linkedin-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(data.jobs || []);
        } else {
          setError(data.error || "Unknown error");
        }
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setJobs([]);
    try {
      let url = `${DEFAULT_LINKEDIN_JOBS_URL}`;
      if (search) {
        url += `&keywords=${encodeURIComponent(search)}`;
      }
      if (location !== "all") {
        url += `&location=${encodeURIComponent(location)}`;
      }
      if (datePosted === "past1hr") {
        url += "&f_TPR=r3600";
      } else if (datePosted === "past24") {
        url += "&f_TPR=r86400";
      } else if (datePosted === "pastWeek") {
        url += "&f_TPR=r604800";
      } else if (datePosted === "pastMonth") {
        url += "&f_TPR=r2592000";
      }
      const res = await fetch("/api/linkedin-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs || []);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <input
          type="text"
          placeholder="Type job title (e.g. Software Engineer)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Jobs"}
        </button>
      </form>
      {jobs.length > 0 && (
        <div className="w-full flex flex-row gap-8 ">
          {/* Sidebar filters */}
          <aside className="w-64 bg-white shadow rounded-lg p-4 flex flex-col gap-4">
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <select
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none w-full"
              >
                <option value="all">All Companies</option>
                {companies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none w-full"
              >
                <option value="all">All Locations</option>
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Date Posted</label>
              <select
                value={datePosted}
                onChange={e => setDatePosted(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none w-full"
              >
                <option value="past1hr">Last 1 hour</option>
                <option value="past6hr">Last 6 hours</option>
                <option value="past12hr">Last 12 hours</option>
                <option value="past24">Past 24 hours</option>
                <option value="pastWeek">Past week</option>
                <option value="pastMonth">Past month</option>
                <option value="all">Any time</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Application Mode</label>
              <select
                value={applicationMode}
                onChange={e => setApplicationMode(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none w-full"
              >
                <option value="all">Any</option>
                <option value="easy">Easy Apply</option>
                <option value="external">External</option>
              </select>
            </div>
          </aside>
          {/* Jobs grid */}
          <div className="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {jobs
              .filter(job => {
                const titleMatch = search === "" || job.title.toLowerCase().includes(search.toLowerCase());
                const companyMatch = company === "all" || job.company === company;
                const locationMatch = location === "all" || job.location === location;
                // Date posted and application mode are placeholders
                return titleMatch && companyMatch && locationMatch;
              })
              .map((job, i) => (
                <div
                  key={i}
                  className="group border-2 border-blue-100 rounded-xl p-6 bg-white shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 duration-200"
                >
                  <div className="font-bold mb-1 text-center text-gray-800 group-hover:text-blue-700 transition">{job.title}</div>
                  <div className="text-blue-700 font-extrabold text-lg group-hover:text-blue-900 transition">{job.company}</div>
                  <div className="text-xs text-gray-500 mt-1">Location: {job.location}</div>
                  <div className="text-xs text-gray-400">{job.description}</div>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2">View Job</a>
                </div>
              ))}
          </div>
        </div>
      )}
      {error && <div className="text-red-600 mt-2">Error: {error}</div>}
    </>
  );
}
