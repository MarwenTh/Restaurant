"use client";
import { useState, useRef, useEffect } from "react";
import { Star, CheckCircle2, Image as ImageIcon, XCircle } from "lucide-react";
import useUser from "@/hooks/useUser";

const SubmitReview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { user, loading: userLoading } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
      },
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review || rating === 0) {
      setValidationError("يرجى ملء التقييم وكتابة المراجعة قبل الإرسال.");
      return;
    }
    setValidationError(null);
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/site-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.name || name,
          reviewMessage: review,
          image: image || user?.image || undefined,
          rating,
          role: user?.role || "User",
        }),
      });
      if (!res.ok) throw new Error("فشل في إرسال المراجعة. حاول مرة أخرى.");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setName("");
      setEmail("");
      setRating(0);
      setReview("");
      setImage(null);
    } catch (err: any) {
      setSubmitError(err.message || "حدث خطأ غير متوقع.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="submit-review"
      ref={sectionRef}
      className="py-20 md:py-28 relative min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#fffbe9] to-[#f7f3e8]"
    >
      <div
        className="max-w-xl w-full mx-auto px-4 md:px-8 py-12 rounded-3xl shadow-xl bg-white/90
          border border-[#f5e7c5] relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-[#D4AF37] reveal">
            شاركنا رأيك في FoodGuide
          </h2>
          <p className="text-gray-500 text-lg reveal">
            نحبوا نسمعوا تجربتك! قيم المنصة و اكتب مراجعتك بكل حرية.
          </p>
        </div>
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-16 w-16 text-[#D4AF37] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#D4AF37]">
              شكراً لمراجعتك!
            </h3>
            <p className="text-gray-600">
              تم استلام رأيك بنجاح. سنعرضه قريباً على المنصة.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#D4AF37]" />
                صورة شخصية (اختياري)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37]/10
                  file:text-[#D4AF37] hover:file:bg-[#D4AF37]/20"
              />
              {image && (
                <div className="mt-3 flex justify-center relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover border-2 border-[#D4AF37]/40 shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
                    aria-label="حذف الصورة"
                  >
                    <XCircle className="h-5 w-5 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الاسم <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                  focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] bg-white"
                placeholder="اكتب اسمك هنا"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                التقييم <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        (hoverRating || rating) >= star
                          ? "text-[#D4AF37]"
                          : "text-gray-300"
                        }`}
                      fill={
                        (hoverRating || rating) >= star ? "#D4AF37" : "none"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                المراجعة <span className="text-[#D4AF37]">*</span>
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none
                  focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] bg-white
                  min-h-[120px]"
                placeholder="اكتب رأيك أو تجربتك مع FoodGuide..."
              />
            </div>
            {validationError && (
              <div className="text-red-500 text-center text-sm mb-2">
                {validationError}
              </div>
            )}
            {submitError && (
              <div className="text-red-500 text-center text-sm mb-2">
                {submitError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition-all
                hover:shadow-[#D4AF37] hover:translate-y-[-2px] hover:shadow-2xl
                disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "...جاري الإرسال" : "أرسل المراجعة"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default SubmitReview;
