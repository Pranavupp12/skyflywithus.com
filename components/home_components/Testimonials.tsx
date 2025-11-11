"use client";

// Imports are now pointing to the components/ui folder
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plane } from 'lucide-react';

export function Testimonials() {
    return (
        <section className="mt-20 mb-20 bg-white rounded-2xl p-10">
            <div className="max-w-7xl space-y-8 ">
                <div className="relative z-10 mx-auto max-w-xl text-center md:space-y-12">
                    <h2 className="text-4xl font-medium font-regular lg:text-5xl mb-4">Loved by <span className='text-indigo-500 font-bold'>Travelers</span>, <span className='text-indigo-500 font-bold'>Trusted</span> by <span className='text-indigo-500 font-bold'>Thousands</span></h2>
                    <p className='text-lg text-gray-600'>See what our happy customers have to say about their booking experience with SkyFlyWithUs.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
                        <CardHeader>
                            <div className="p-2 bg-indigo-500 rounded-lg w-fit">
                                <Plane className="h-6 w-6 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">SkyFlyWithUs has transformed the way I book travel. The booking form was incredibly easy to use, and I found the cheapest flight to Bali in seconds. The travel blogs are also a fantastic bonus!</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>ST</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Sarah Thompson</cite>
                                        <span className="text-indigo-500 block text-sm">Frequent Flyer</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">This is the only site I use now. The 'Perfect Experience' form is a game-changer.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                    <AvatarFallback>JY</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Jonathan Yombo</cite>
                                        <span className="text-indigo-500 block text-sm">Travel Blogger</span>
                                    </div>
                                    </div>
                            </blockquote>
                            </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>I got an amazing deal on my flight to Tokyo. The 'Book Instantly' button is no joke. Highly recommend.</p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarFallback>YF</AvatarFallback>
                                        </Avatar>
                                        <div>
                                        <cite className="text-sm font-medium">Yucel Faruksahan</cite>
                                        <span className="text-indigo-500 block text-sm">Digital Nomad</span>
                                    </div>
                                    </div>
                                </blockquote>
                        </CardContent>
                        </Card>
                    <Card className="card variant-mixed">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                            <p>The 'Recent Articles' section is how I found out about the Emirates vs. Etihad comparison. So helpful!</p>
                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                    <AvatarFallback>RA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                    <p className="text-sm font-medium">Rodrigo Aguilar</p>
                                    <span className="text-indigo-500 block text-sm">Vacation Planner</span>
                                    </div>
                                </div>
                            </blockquote>
                            </CardContent>
                        </Card>
                    </div>
                </div>
             </section>
    )
}