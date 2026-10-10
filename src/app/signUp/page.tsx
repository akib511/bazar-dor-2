"use client"; 
 
import Link from "next/link"; 
import { FormEvent, useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast"; 
 
export default function SignUpPage() { 
  const router = useRouter(); 
 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
 
  async function handleSignUp(event: FormEvent<HTMLFormElement>) { 
    event.preventDefault(); 
 
    if (!name.trim() || !email.trim() || !password || !confirmPassword) { 
      toast.error("সবগুলো ঘর পূরণ করুন।"); 
      return; 
    } 
 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { 
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।"); 
      return; 
    } 
 
    if (password.length < 8) { 
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"); 
      return; 
    } 
 
    if (password !== confirmPassword) { 
      toast.error("দুটি পাসওয়ার্ড মিলছে না।"); 
      return; 
    } 
 
    setLoading(true); 
 
    try { 
      const { error } = await authClient.signUp.email({ 
        name: name.trim(), 
        email: email.trim(), 
        password, 
      }); 
 
      if (error) { 
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"); 
        return; 
      } 
 
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।"); 
 
      router.push("/signIn"); 
    } catch { 
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।"); 
    } finally { 
      setLoading(false); 
    } 
  } 
 
  async function handleSocialSignIn(provider: "google" | "github") { 
    try { 
      setLoading(true); 
 
      const { error } = await authClient.signIn.social({ 
        provider, 
        callbackURL: "/", 
      }); 
 
      if (error) { 
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি।"); 
        setLoading(false); 
      } 
    } catch { 
      toast.error("লগইন করতে সমস্যা হয়েছে।"); 
      setLoading(false); 
    } 
  } 
 
  return ( 
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 sm:py-9"> 
      <div className="mb-5 text-center"> 
        <h1 className="text-2xl font-bold text-[#26352b]"> 
          অ্যাকাউন্ট তৈরি করুন 
        </h1> 
 
        <p className="mt-1 text-xs text-gray-500 sm:text-sm"> 
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন। 
        </p> 
      </div> 
 
      <div className="w-full max-w-[338px] rounded-[14px] border border-[#e0e8e1] bg-white/75 p-5"> 
        <form className="space-y-3.5" onSubmit={handleSignUp}> 
          {/* Name */} 
          <div> 
            <label 
              htmlFor="name" 
              className="mb-1 block text-xs font-medium text-gray-800" 
            > 
              নাম 
            </label> 
 
            <input 
              id="name" 
              type="text" 
              placeholder="যেমন: রহিম উদ্দিন" 
              autoComplete="name" 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
              disabled={loading} 
              className="w-full rounded-lg border border-[#dfe7e0] bg-transparent px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60" 
            /> 
          </div> 
 
          <div> 
            <label 
              htmlFor="email" 
              className="mb-1 block text-xs font-medium text-gray-800" 
            > 
              ইমেইল 
            </label> 
 
            <input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              autoComplete="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              disabled={loading} 
              className="w-full rounded-lg border border-[#dfe7e0] bg-transparent px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60" 
            /> 
          </div> 
 
          <div> 
            <label 
              htmlFor="password" 
              className="mb-1 block text-xs font-medium text-gray-800" 
            > 
              পাসওয়ার্ড 
            </label> 
 
            <input 
              id="password" 
              type="password" 
              placeholder="কমপক্ষে ৮ অক্ষর" 
              autoComplete="new-password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              disabled={loading} 
              className="w-full rounded-lg border border-[#dfe7e0] bg-transparent px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60" 
            /> 
          </div> 
 
          <div> 
            <label 
              htmlFor="confirmPassword" 
              className="mb-1 block text-xs font-medium text-gray-800" 
            > 
              পাসওয়ার্ড নিশ্চিত করুন 
            </label> 
 
            <input 
              id="confirmPassword" 
              type="password" 
              placeholder="আবার লিখুন" 
              autoComplete="new-password" 
              value={confirmPassword} 
              onChange={(event) => setConfirmPassword(event.target.value)} 
              disabled={loading} 
              className="w-full rounded-lg border border-[#dfe7e0] bg-transparent px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60" 
            /> 
          </div> 
 
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full rounded-lg bg-green-700 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70" 
          > 
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"} 
          </button> 
        </form> 
 
        <div className="my-4 flex items-center gap-3"> 
          <div className="h-px flex-1 bg-gray-200" /> 
 
          <span className="text-[11px] text-gray-500">অথবা</span> 
 
          <div className="h-px flex-1 bg-gray-200" /> 
        </div> 
 
        <div className="grid grid-cols-2 gap-2"> 
          <button 
            type="button" 
            onClick={() => handleSocialSignIn("google")} 
            disabled={loading} 
            className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dfe7e0] px-2 py-2 text-[10px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:text-xs" 
          > 
            <span className="font-bold text-blue-600">G</span> 
            Google দিয়ে চালিয়ে যান 
          </button> 
 
          <button 
            type="button" 
            onClick={() => handleSocialSignIn("github")} 
            disabled={loading} 
            className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dfe7e0] px-2 py-2 text-[10px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:text-xs" 
          > 
            <svg 
              viewBox="0 0 24 24" 
              className="h-3.5 w-3.5" 
              fill="currentColor" 
              aria-hidden="true" 
            > 
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.27-2.61 5.2-5.09 5.48.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /> 
            </svg> 
            GitHub দিয়ে চালিয়ে যান 
          </button> 
        </div> 
 
        <p className="mt-4 text-center text-xs text-gray-500"> 
          অ্যাকাউন্ট আছে?{" "} 
          <Link 
            href="/signIn" 
            className="font-medium text-green-700 hover:text-green-800" 
          > 
            সাইন ইন করুন 
          </Link> 
        </p> 
      </div> 
 
      <Link 
        href="/" 
        className="mt-5 text-xs text-gray-400 transition hover:text-green-700" 
      > 
        ← হোম পেজে ফিরে যান 
      </Link> 
    </main> 
  ); 
} 
