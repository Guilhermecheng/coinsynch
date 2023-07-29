'use client'

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailSchema = z.object({
    newsletter: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
      })
})

type ValidationSchema = z.infer<typeof emailSchema>;

export function Newsletter() {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted }, reset } = useForm<ValidationSchema>({
        resolver: zodResolver(emailSchema),
    });

    async function subscribe(data: FieldValues) {
        const response = await axios.post("/api/newsletter", {
            email: data.newsletter,
        });

        if(response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reset()
        } else {
            toast.error("Something went wrong..", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return(
        <section className="relative bg-orange-gradient w-full flex items-center justify-center px-6 sm:px-12 py-14 sm:py-20 lg:py-40 text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/orangewall.png')] bg-cover bg-top bg-no-repeat">
                <span></span>
            </div>
            <div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-8 max-w-[1012px] z-10">
                <div className="max-w-[400px]">
                    <h3 className="text-base sm:text-xl lg:text-2xl text-primary-200 font-bold">Lorem Ipsum</h3>
                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold">Lorem Ipsum</h1>
                    <p className="pt-2 sm:pt-4 text-sm sm:text-base leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
                </div>

                <form className="flex flex-col justify-center mt-10 sm:mt-0" onSubmit={handleSubmit(subscribe)}>
                    <div className="flex gap-x-4 items-center">
                        <label htmlFor="newsletterEmail" className="text-sm">Email</label>
                        { errors.newsletter && <span className="text-xs text-quartenary-700">{errors.newsletter?.message}</span> }
                    </div>
                    <input 
                        type="email"
                        placeholder="Email"
                        className="mt-2 mb-4 sm:mb-5 w-full text-sm sm:text-base text-basecolor rounded-xl h-10 sm:h-12 px-4 shadow-xl outline-primary-500"
                        disabled={isSubmitting}
                        {...register("newsletter", { required: true })}
                    />
                    
                    <button 
                        className={`${isSubmitting ? "bg-secondary-400" : "bg-primary-500" } text-sm sm:text-base text-white w-full py-3 rounded-full shadow-xl`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting.." : "Subscribe"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </section>
    )
}