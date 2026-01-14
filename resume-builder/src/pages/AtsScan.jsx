    import React, { useState } from "react";
    import { XCircle } from "lucide-react";
    import API from "../components/AxiosConfig";
    import ResumeNavigator from "../components/ResumeNavigator";

    const AtsScan = ({ formData }) => {

    const [loading, setLoading] = useState(false);
    const [atsErrors, setAtsErrors] = useState([]);
    const [scanned, setScanned] = useState(false);

    const handleAtsScan = async () => {



        try {
        setLoading(true);

        const res = await API.post("/ai/ats-scan", {
            formData: formData
        });

        setAtsErrors(res.data.errors || []);
        setScanned(true);

        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }


    };

    return (

        <div className="w-full max-w-3xl mx-auto px-6 py-6">


        <div className="flex justify-between items-start gap-6 mb-6">

            <div>
            <h2 className="text-xl font-semibold mb-2">ATS Resume Scan</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
                Applicant Tracking Systems (ATS) are automated software used by recruiters
                to filter resumes before a human ever sees them. This scan analyzes your
                resume for keyword optimization, structure, formatting, and readability
                issues that may reduce your chances of passing automated screening.
            </p>
            </div>

            <button
            onClick={handleAtsScan}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
            {loading ? "Scanning..." : "Start ATS Scan"}
            </button>

        </div>

        {scanned && (
            <div className="border border-gray-200 rounded-lg p-4">

            <h3 className="font-semibold text-red-600 mb-3">
                ATS Issues Found
            </h3>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">

                {atsErrors.length === 0 ? (
                <p className="text-green-600 text-sm">
                    ✅ No ATS issues detected. Your resume is ATS friendly.
                </p>
                ) : (
                atsErrors.map((err, i) => (
                    <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                    >
                    <XCircle className="w-4 h-4 text-red-500 mt-[2px]" />
                    <span>{err}</span>
                    </div>
                ))
                )}

            </div>
            </div>
        )}

        </div>
    );
    };

    export default AtsScan;
