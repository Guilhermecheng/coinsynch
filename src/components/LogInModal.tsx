'use client';

import { GlobalContext, UserDataProps } from "@/contexts/GlobalContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';

import axios from "axios";
import { useForm, FieldValues, Controller } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { RiCloseLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

const signInFormValidation = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(3, { message: "A valid password is required" }),
})
   
type SignInValidationSchema = z.infer<typeof signInFormValidation>;

const signUpFormValidation = z.object({
    name: z.string(),
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    
    password: z.string().min(3, { message: "A valid is password required" }),
    confirmPassword: z.string().min(3, { message: "A valid password is required" }),
    policy: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type SignUpValidationSchema = z.infer<typeof signUpFormValidation>;

export function LogInModal() {
    const { modalType, setModalType, setUserData } = useContext(GlobalContext);
    const [logInSeePassword, setlogInSeePassword] = useState(false);
    const [signUpSeePassword, setSignUpSeePassword] = useState(false);
    const [signUpSeeConfPassword, setSignUpSeeConfPassword] = useState(false);

    const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp,  }, control } = useForm<SignUpValidationSchema>({
        resolver: zodResolver(signUpFormValidation),
    });

    const { register, handleSubmit, formState: { errors  } } = useForm<SignInValidationSchema>({
        resolver: zodResolver(signInFormValidation),
    });

    const router = useRouter();

    async function login(data: FieldValues) {
        const response = await axios.get<UserDataProps[]>("/api/users");

        if(response) {
            var found = response.data.find((e) => e.email === data.email);

            if(found) {
                setUserData(found);
                router.push("/dashboard");
            }
        }
    }

    function signup(data: FieldValues) {
        console.log(data)
        setUserData({
            name: data.name as string,
            email: data.email,
            avatar_img: "https://github.com/Guilhermecheng.png",
            wallet: []
        })

        router.push("/dashboard");
    }

    return(
        <Dialog.Portal>
            <Dialog.Overlay className="fixed w-full h-full inset-0 bg-basecolor opacity-70 border-none" />

            <Dialog.Content aria-controls="modal-content" className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center p-6 md:p-8 text-basecolor w-[320px] md:w-[450px] relative">
                <Dialog.Close>
                    <RiCloseLine size={18} className="absolute right-4 top-4 cursor-pointer text-secondary-500" />
                </Dialog.Close>

                    <h1 className="text-xl">Sign { modalType === "signin" ? "in" : "up" } to <span className="font-bold"><span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></h1>

                    {modalType  === "signin" ? (

                        <form className="flex flex-col w-full mt-3.5 sm:mt-6 md:mt-8" onSubmit={handleSubmit(login)}>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-xs text-quartenary-500 mt-1">{errors.email?.message}</span>}

                            <div className="flex justify-between items-center h-12 w-full border-2 border-secondary-300 rounded-xl px-4 mt-3.5 md:mt-6">
                                <input 
                                    type={logInSeePassword ? "text" : "password"}
                                    placeholder="Password" 
                                    className="w-[80%]  h-full outline-none" 
                                    {...register("password", { required: true })}
                                />
                                <AiOutlineEye size={24} className="cursor-pointer text-secondary-500" onClick={() => setlogInSeePassword(!logInSeePassword)} />
                            </div>
                            {errors.password && <span className="text-xs text-quartenary-500 mt-1">{errors.password?.message}</span>}

                            <span className="w-full flex justify-end text-xs mt-2 cursor-pointer">Forgot password?</span>

                            <button type="submit" className="mt-3.5 md:mt-6 flex items-center justify-center w-full bg-primary-500 text-white rounded-full py-3.5">
                                Sign In
                            </button>
                        </form>
                    ) : (
                        <form className="flex flex-col w-full gap-y-3.5 md:gap-y-6 mt-3.5 sm:mt-6 md:mt-8" onSubmit={handleSubmitSignUp(signup)}>
                            <input 
                                type="text" 
                                placeholder="Name"  
                                className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"
                                {...registerSignUp("name", { required: true })}
                            />
                            {errorsSignUp.name && <span className="text-xs text-quartenary-500 mt-1">{errorsSignUp.name?.message}</span>}

                            <input 
                                type="text" 
                                placeholder="Email"  
                                className="h-12 w-full border-2 border-secondary-300 rounded-xl px-4"
                                {...registerSignUp("email", { required: true })}
                            />
                            {errorsSignUp.email && <span className="text-xs text-quartenary-500 mt-1">{errorsSignUp.email?.message}</span>}

                            <div className="flex justify-between items-center h-12 w-full border-2 border-secondary-300 rounded-xl px-4 ">
                                <input 
                                    type={signUpSeePassword ? "text" : "password"}
                                    placeholder="Password" 
                                    className="w-[80%]  h-full outline-none" 
                                    {...registerSignUp("password", { required: true })}
                                />
                                <AiOutlineEye size={24} className="cursor-pointer text-secondary-500" onClick={() => setSignUpSeePassword(!signUpSeePassword)} />
                            </div>
                            {errorsSignUp.password && <span className="text-xs text-quartenary-500 mt-1">{errorsSignUp.password?.message}</span>}
                            
                            <div className="flex justify-between items-center h-12 w-full border-2 border-secondary-300 rounded-xl px-4">
                                <input 
                                    type={signUpSeeConfPassword ? "text" : "password"}
                                    placeholder="Confirm Password" 
                                    className="w-[80%]  h-full outline-none" 
                                    {...registerSignUp("confirmPassword", { required: true })}
                                />
                                <AiOutlineEye size={24} className="cursor-pointer text-secondary-500" onClick={() => setSignUpSeeConfPassword(!signUpSeeConfPassword)} />
                            </div>
                            {errorsSignUp.confirmPassword && <span className="text-xs text-quartenary-500 mt-1">{errorsSignUp.confirmPassword?.message}</span>}

                            <span className="w-full flex text-xs mt-2 cursor-pointer">
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                name="policy"
                                render={({ field }) => (
                                    <Checkbox.Root 
                                        className="w-[20px] h-[20px] bg-white border-2 border-primary-500 rounded mr-2" id="c1"
                                        {...field}
                                        value={undefined}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    >
                                        <Checkbox.Indicator className="flex items-center justify-center">
                                            <FiCheck size={12} />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                )}
                            />
                                <label htmlFor="c1">I've read and accepted the <span className="font-bold">Privacy Policy</span> and <span className="font-bold">Terms of User Sign up.</span></label>
                            </span> 
                            {errorsSignUp.policy && <span className="text-xs text-quartenary-500">{errorsSignUp.policy?.message}</span>}

                            <button type="submit" className="mt-3.5 md:mt-6 flex items-center justify-center w-full bg-primary-500 text-white rounded-full py-3.5">
                               Sign Up
                            </button>
                        </form>
                    )}

                    <div className="mt-6">
                        {modalType  === "signin" ? (
                            <span>Don't have an account? <span className="font-bold cursor-pointer" onClick={() => setModalType("signup")}>Sign up to <span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></span>
                        ) : (
                            <span>Already have an account? <span className="font-bold cursor-pointer" onClick={() => setModalType("signin")}>Sign in to <span className="text-primary-500">Coin</span><span className="text-secondary-500">Synch</span></span></span>
                        ) }
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}