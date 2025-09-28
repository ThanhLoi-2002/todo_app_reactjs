import RegisterForm from '@/components/user/auth/registerForm'

const Register = () => {
    return (
        <section className="bg-gray-200 min-h-screen">
            <div className="flex flex-col items-center justify-center px-12 mx-auto h-screen">
                <div className="w-full bg-gray-50 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  text-center">
                            Tạo tài khoản
                        </h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
