import { useNavigate } from "react-router-dom";
import API from "../components/axios";
import Navbar from "../components/NavBar";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";
import { useSearchParams } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();
  const { user,refreshAuth } = useAuth();

  const [searchParams,setSearchParams] = useSearchParams()

  const redirect = searchParams.get("redirect")

  const handleUpgrade = async () => {
    try {
      const { data } = await API.get("/payment/create-order");

      const options = {
        key: "rzp_test_Rz0zhYIyhxZYa4",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        name: "Resume Builder Pro",
        description: "Pro Membership – ₹100",

        handler: async function (response) {
          try {
            await API.post("/payment/payVerification", response);
            toast.success("Payment Successful");

            await refreshAuth(); //get premium updated user setup in state

            navigate(`${redirect}`);


          } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
          }
        },

        theme: { color: "#4F9BFF" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full bg-white/70 backdrop-blur rounded-3xl shadow-xl p-10">

          {user?.premium ? (
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-900">
                🎉 You’re a <span className="text-blue-500">Premium</span> User
              </h1>

              <p className="mt-4 text-gray-600 text-lg">
                All premium features are unlocked and ready to use.
              </p>

              <button
                onClick={() => navigate("/app")}
                className="mt-8 px-10 py-4 rounded-full bg-blue-500 text-white font-medium text-lg hover:bg-blue-600 transition shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-center text-gray-900">
                Upgrade to <span className="text-blue-500">Premium</span>
              </h1>

              <p className="text-center text-gray-600 mt-3">
                Everything you need to build job-winning resumes
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {[
                  { title: "ATS Resume Scanning", desc: "Check resume compatibility with applicant tracking systems." },
                  { title: "AI Resume Enhancement", desc: "Rewrite bullets, improve clarity and impact instantly." },
                  { title: "Create Resume from Existing", desc: "Upload any resume and rebuild it using AI." },
                  { title: "Unlimited Downloads", desc: "Export resumes anytime in high-quality PDF." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-500 text-sm">One-time payment</p>
                <div className="text-5xl font-bold text-gray-900 mt-2">₹100</div>

                <button
                  onClick={handleUpgrade}
                  className="mt-6 px-10 py-4 rounded-full bg-blue-500 text-white font-medium text-lg hover:bg-blue-600 transition shadow-lg"
                >
                  Get Premium
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Premium;
