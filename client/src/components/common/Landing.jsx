import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Expand your knowledge</h1>
                <p className="text-xl md:text-2xl text-center text-gray-600 mb-12">
                    Skillfinity: Fueling your journey towards endless learning
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img
                            src="/working-moment.jpg"
                            alt="Tutor in classroom"
                            className="w-full h-auto rounded-[5%]"
                        />
                        <button
                            className="absolute bottom-4 left-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                            onClick={() => {
                                navigate("/tutor");
                                console.log("Join Our Tutor Team clicked");
                            }}
                        >
                            Join Our Tutor Team →
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src="/student-sharing-her-knowledge-with-her-colleagues.jpg"
                            alt="Student learning"
                            className="w-full h-auto rounded-[5%]"
                        />
                        <button
                            className="absolute bottom-4 left-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                            onClick={() => {
                                navigate("/login");
                                console.log("Start your learning journey clicked");
                            }}
                        >
                            Start your learning journey →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                    <div>
                        <h2 className="text-4xl font-bold">3,151</h2>
                        <p className="text-gray-600">Courses sold every week</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">645,974</h2>
                        <p className="text-gray-600">New users yearly</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">423</h2>
                        <p className="text-gray-600">New Tutors yearly</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
