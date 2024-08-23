import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

function Index() {
  return (
    <main className="flex-1">
      <section>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Welcome to the Dashboard</h2>
          <p className="mt-2">
            This is a simple admin template using TailwindCSS with dark mode
            support.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Index;
