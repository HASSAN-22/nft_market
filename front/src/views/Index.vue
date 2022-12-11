<template>
    <div class="mx-8 p-4 grid grid-cols-2 fm:grid-cols-1 bg-d-color-blue-light-dark rounded gap-3">
        <routerLink to="">
            <img src="@/assets/img/cover.jpg" class="w-full h-[21rem] rounded shadow-md" />
        </routerLink>
        <div>
            <div class="flex items-center fm:flex-col fm:gap-2 justify-between">
                <span class="text-2xl fm:text-lg">This is my nft</span>
                <div class="flex items-center gap-2">
                    <div class="h-10 w-10 fm:w-8 fm:h-8 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                    <span class="fm:text-sm">collection name</span>
                </div>
            </div>

            <div class="flex items-center fm:flex-col justify-between mt-8 gap-2">
                <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-lighter-dark w-full p-1 rounded-lg">
                    <span class="fm:text-sm text-crimson-200 !font-bold">پیشنهاد دهنده فعلی</span>
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 fm:w-8 fm:h-8 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                        <span class="fm:text-sm">collection name</span>
                    </div>
                </div>
                <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-lighter-dark w-full p-1 rounded-lg">
                    <span class="fm:text-sm text-crimson-200 !font-bold">متعلق به</span>
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 fm:w-8 fm:h-8 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                        <span class="fm:text-sm">collection name</span>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center">
                <vue-countdown :time="convertTime" v-slot="{hours, minutes, seconds }">
                    <span class="text-4xl fm:text-3xl text-green-500">{{ hours }}h {{ minutes }}m {{ seconds }}s</span>
                </vue-countdown>
            </div>

            <div class="flex items-center fm:flex-col justify-between mt-8 fm:mt-2 gap-2">
                <div class="flex items-center gap-2 p-1">
                    <span class="fm:text-sm text-crimson-200 !font-bold">قیمت: </span>
                    <span class="text-lg fm:text-md ltr">2.025 ETH</span>
                </div>
                <div class="flex items-center gap-2 p-1">
                    <span class="fm:text-sm text-crimson-200 !font-bold">قیمت به دلار: </span>
                    <span class="text-lg fm:text-md ltr">2.025 USD</span>
                </div>
            </div>

            <div class="text-center mt-3">
                <Link text="مشاهده" :urlPath="{name:'Index'}"></Link>
            </div>

        </div>
    </div>
    <div class="mx-8 p-4 mt-20">
        <div class="flex items-center gap-2 border-b border-d-color-pink shadow-lg">
            <span><i class="fas fa-chart-scatter text-3xl fm:text-xl text-crimson-200 !font-bold"></i></span>
            <span class="text-xl fm:text-lg">پرفروش ها</span>
        </div>
        <div class="bg-d-color-blue-light-dark shadow-lg p-4">
            <Slider :slides="(displaySize < 769) ? 1 : 3" :space="5">
                <SwiperSlide v-for="i in 10" :key="i" :virtualIndex="i">
                    <div class="flex fm:flex-col flex-row justify-evenly">
                        <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg relative">
                            <div class="group relative">
                                <img src="@/assets/img/cover.jpg" class="h-[21rem] fm:h-[14rem] w-full rounded-t-lg" />
                                <div class="group-hover:h-full h-0 top-0 w-full bg-black opacity-60 cursor-pointer absolute ease-in duration-300 rounded-t-lg"></div>
                            </div>
                            <div class="mt-4 mx-2">
                                <div class="flex justify-between">
                                    <span class="text-2xl fm:text-xl !font-bold">Nft title</span>
                                    <div class="flex flex-col items-end">
                                        <span class="text-2xl fm:text-xl !font-bold ltr">2.0025 ETH</span>
                                        <span class="text-sm ltr">222 USD</span>
                                    </div>
                                </div>

                                <div class="flex items-center fm:flex-col justify-between mt-8 gap-2 relative">
                                    <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                        <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                        <div class="">
                                            <div class="flex items-center gap-2">
                                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                            </div>
                                        </div>
                                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] right-0 fm:w-auto  bg-d-color-blue-light ease-in duration-300">
                                            <div class="flex justify-between mt-3 mx-4">
                                                <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                <div class="flex items-center gap-2">
                                                    <div class="flex items-center flex-col">
                                                        <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                        <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                    </div>
                                                    <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                </div>
                                            </div>
                                            <div class="mt-5 mx-4">
                                                <p class="fm:text-sm text-md">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis....
                                                </p>
                                            </div>
                                            <div class="flex justify-between mt-8 mx-4">
                                                <div class="flex flex-col gap-1 rounded-lg ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                                <div class="flex flex-col gap-1 rounded-lg ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                        <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                        <div class="">
                                            <div class="flex items-center gap-2">
                                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                            </div>
                                        </div>
                                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] left-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
                                            <div class="flex justify-between mt-3 mx-4">
                                                <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                <div class="flex items-center gap-2">
                                                    <div class="flex items-center flex-col">
                                                        <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                        <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                    </div>
                                                    <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                </div>
                                            </div>
                                            <div class="mt-5 mx-4">
                                                <p class="fm:text-sm text-md">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis....
                                                </p>
                                            </div>
                                            <div class="flex justify-between mt-8 mx-4">
                                                <div class="flex flex-col gap-1 rounded-lg ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                                <div class="flex flex-col gap-1 rounded-lg ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 text-center">
                                    <vue-countdown :time="convertTime" v-slot="{hours, minutes, seconds }">
                                        <span class="text-2xl fm:text-xl text-green-500">{{ hours }}h {{ minutes }}m {{ seconds }}s</span>
                                    </vue-countdown>
                                </div>
                                <div class="mt-8 text-center">
                                    <Link text="مشاهده" :urlPath="{name:'Category'}" my_class="!rounded-none !rounded-tr-full !rounded-bl-full fm:!py-2 !w-full"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Slider>
        </div>
    </div>
    <div class="mx-8 p-4 mt-20">
        <div class="flex items-center gap-2 border-b border-d-color-pink shadow-lg">
            <span><i class="fas fa-alarm-clock text-3xl fm:text-xl text-crimson-200 !font-bold"></i></span>
            <span class="text-xl fm:text-lg">مزایده ها</span>
        </div>
        <div class="bg-d-color-blue-light-dark shadow-lg p-4">
            <Slider :slides="(displaySize < 769) ? 1 : 3" :space="5">
                <SwiperSlide v-for="i in 10" :key="i" :virtualIndex="i">
                    <div class="flex fm:flex-col flex-row justify-evenly">
                        <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg">
                            <div class="group relative">
                                <img src="@/assets/img/cover.jpg" class="h-[21rem] fm:h-[14rem] w-full rounded-t-lg" />
                                <div class="group-hover:h-full h-0 top-0 w-full bg-black opacity-60 cursor-pointer absolute ease-in duration-300 rounded-t-lg"></div>
                            </div>
                            <div class="mt-4 mx-2">
                                <div class="flex justify-between">
                                    <span class="text-2xl fm:text-xl !font-bold">Nft title</span>
                                    <div class="flex flex-col items-end">
                                        <span class="text-2xl fm:text-xl !font-bold ltr">2.0025 ETH</span>
                                        <span class="text-sm ltr">222 USD</span>
                                    </div>
                                </div>

                                <div class="flex items-center fm:flex-col justify-between mt-8 gap-2 relative">
                                    <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                        <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                        <div class="">
                                            <div class="flex items-center gap-2">
                                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                            </div>
                                        </div>
                                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] right-0 fm:w-auto  bg-d-color-blue-light ease-in duration-300">
                                            <div class="flex justify-between mt-3 mx-4">
                                                <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                <div class="flex items-center gap-2">
                                                    <div class="flex items-center flex-col">
                                                        <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                        <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                    </div>
                                                    <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                </div>
                                            </div>
                                            <div class="mt-5 mx-4">
                                                <p class="fm:text-sm text-md">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis, fugit dicta alias id sint doloremque, neque corrupti. Dolorem maiores unde, officia corrupti aspernatur similique praesentium.
                                                </p>
                                            </div>
                                            <div class="flex justify-between mt-8 mx-4">
                                                <div class="flex flex-col gap-1 ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                                <div class="flex flex-col gap-1 ">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-start gap-2 fm:items-center bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                        <span class="text-sm text-crimson-200 !font-bold cursor-pointer">پیشنهاد دهنده</span>
                                        <div class="">
                                            <div class="flex items-center gap-2">
                                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                <routerLink to=""><span class="text-sm">collection name</span></routerLink>
                                            </div>
                                        </div>
                                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] left-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
                                            <div class="flex justify-between mt-3 mx-4">
                                                <button class="px-4 py-2 fm:text-sm text-md rounded-lg bg-d-color-blue-light-dark shadow-lg">دنبال کردن</button>
                                                <div class="flex items-center gap-2">
                                                    <div class="flex items-center flex-col">
                                                        <routerLink to=""><span class="fm:text-sm text-md text-d-color-font-middle">Username</span></routerLink>
                                                        <routerLink to=""><span class="fm:text-sm text-md ltr text-crimson-200 !font-bold">@userId</span></routerLink>
                                                    </div>
                                                    <div class="h-12 w-12 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                                </div>
                                            </div>
                                            <div class="mt-5 mx-4">
                                                <p class="fm:text-sm text-md">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eos explicabo voluptate, culpa nobis, fugit dicta alias id sint doloremque, neque corrupti. Dolorem maiores unde, officia corrupti aspernatur similique praesentium.
                                                </p>
                                            </div>
                                            <div class="flex justify-between mt-8 mx-4">
                                                <div class="flex flex-col gap-1">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                                <div class="flex flex-col gap-1">
                                                    <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال شده</span>
                                                    <span class="fm:text-sm text-md">150,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 text-center">
                                    <vue-countdown :time="convertTime" v-slot="{hours, minutes, seconds }">
                                        <span class="text-2xl fm:text-xl text-green-500">{{ hours }}h {{ minutes }}m {{ seconds }}s</span>
                                    </vue-countdown>
                                </div>
                                <div class="mt-8 text-center">
                                    <Link text="مشاهده" :urlPath="{name:'Category'}" my_class="!rounded-none !rounded-tr-full !rounded-bl-full fm:!py-2 !w-full"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Slider>
        </div>
    </div>
</template>

<script>
import Link from "@/components/Link"
import Slider from "@/components/Slider"
import { SwiperSlide } from 'swiper/vue';
export default {
    name:'Index',
    components:{Link, Slider, SwiperSlide},
    data(){
        return{
            displaySize: window.innerWidth,
        }
    },

    computed:{
        convertTime(){
            let now = new Date();
            return  now.getTime();
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods:{
        onResize() {
            this.displaySize = window.innerWidth;
        },
    }
}
</script>