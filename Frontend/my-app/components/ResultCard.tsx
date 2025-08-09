// import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import {CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  prediction: string;
  isSpam: boolean;
}

export default function ResultCard({ prediction, isSpam }: Props) {
  return (
    <div
      className={`mt-6 flex items-center gap-3 p-4 rounded-lg border ${
        isSpam
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-green-50 border-green-200 text-green-700"
      }`}
    >
      {isSpam ? (
        <XCircleIcon className="w-6 h-6" />
      ) : (
        <CheckCircleIcon className="w-6 h-6" />
      )}
      <span className="font-medium">{prediction}</span>
    </div>
  );
}
