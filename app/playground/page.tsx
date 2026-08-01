import Modal from "../../playground/Modal";
import Tabs from "../../playground/Tabs";
import Disclosure from "../../playground/Disclosure";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Accessibility Playground
        </h1>

        <p className="mt-2 text-gray-600">
          Testing custom accessible React components.
        </p>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Modal
          </h2>

          <Modal />
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Tabs
          </h2>

          <Tabs />
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Disclosure
          </h2>

          <Disclosure />
        </div>
      </div>
    </main>
  );
}