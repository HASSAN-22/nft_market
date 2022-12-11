<template>
    <div>
        <div class="mx-8 p-4 mb-10 bg-d-color-blue-light-dark rounded flex justify-center ">
            <div class="flex justify-center shadow w-full">
                <img src="@/assets/img/cover.jpg" class="w-full rounded fm:h-[18rem]"/>
            </div>
        </div>
        <div class="flex fm:flex-col gap-2 mx-8">
            <div class="relative p-4 w-[30%] fm:w-full h-full bg-d-color-blue-light-dark">
                <div class="flex flex-col fm:items-center gap-3">
                    <div class="flex fm:flex-col gap-2 items-center">
                        <div class="w-32 h-32 fm:w-28 fm:h-28 p-1 bg-green-500 rounded-full">
                            <img src="@/assets/img/cover.jpg" class="rounded-full h-full w-full"/>
                        </div>
                        <div class="flex flex-col fm:items-center">
                            <span class="text-crimson-200 !font-bold text-2xl fm:text-xl">User name</span>
                            <span class="text-d-color-font-middle text-lg fm:text-sm">@userId</span>
                            <span class="text-md">22-05-2022</span>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-end fm:flex-col fm:items-center fm:gap-2 justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-lg fm:text-md ltr">0x2354...2654</span>
                                <span v-if="$store.state.isCopy == false" class="cursor-pointer" @click="$store.commit('copy','wwdfsdfsd')">
                                    <i class="fas fa-copy text-crimson-200 !font-bold text-2xl fm:text-lg"></i>
                                </span>
                                <span v-else class="cursor-pointer" @click="copyAddress()">
                                    <i class="fas fa-check text-green-500 !font-bold text-2xl fm:text-lg"></i>
                                </span>
                            </div>
                            <div>
                                <Button text="ویرایش کالکشن" ></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 w-full my-5"></div>
                <div>
                    <div>
                        <ul class="flex gap-2 flex-col">
                            <li class="flex justify-between items-center bg-d-color-blue-light p-2 rounded-lg">
                                <span class="text-md fm:text-sm">تعداد NFT ها</span>
                                <div class="text-center flex items-center justify-center rounded-xl p-2 bg-crimson-200">
                                    <b class="text-sm">22</b>
                                </div>
                            </li>
                            <li class="flex justify-between items-center bg-d-color-blue-light p-2 rounded-lg">
                                <span class="text-md fm:text-sm">کل فروش</span>
                                <div class="text-center flex items-center justify-center rounded-xl p-2 bg-crimson-200">
                                    <b class="text-sm ltr">22.55 ETH</b>
                                </div>
                            </li>
                            <li class="flex justify-between items-center bg-d-color-blue-light p-2 rounded-lg">
                                <span class="text-md fm:text-sm">در مزایده</span>
                                <div class="text-center flex items-center justify-center rounded-xl p-2 bg-crimson-200">
                                    <b class="text-sm ltr">11 NFT</b>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-gray-700 w-full my-5"></div>
                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col gap-1">
                            <span class="text-xl fm:text-lg text-crimson-200 !font-bold">دنبال کننده گان</span>
                            <span class="text-lg fm:text-md">55,000</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="text-xl fm:text-lg text-crimson-200 !font-bold">دنبال شوندگان</span>
                            <span class="text-lg fm:text-md">55,000</span>
                        </div>
                    </div>
                    <div>
                        <Button text="دمبال کردن" my_class="!w-full !rounded-none !p-3 !rounded-tr-full !rounded-bl-full"></Button>
                    </div>
                </div>
                <div class="border-t border-gray-700 w-full my-5"></div>
                <div>
                    <ul class="flex flex-wrap items-center justify-evenly">
                        <li>
                            <a href=""><i class="fab fa-twitter text-4xl fm:text-2xl text-crimson-200 !font-bold"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fab fa-facebook text-4xl fm:text-2xl text-teal-500 !font-bold"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fab fa-telegram text-4xl fm:text-2xl text-blue-500 !font-bold"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fab fa-instagram text-4xl fm:text-2xl text-[#7342b7] !font-bold"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fab fa-snapchat-ghost text-4xl fm:text-2xl text-yellow-400 !font-bold"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fab fa-tiktok text-4xl fm:text-2xl text-pink-500 !font-bold"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="border-t border-gray-700 w-full my-5"></div>
                <div>
                    <span>درباره من:</span>
                    <div class="mt-2">
                        <p class="break-all">
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                        </p>
                    </div>
                </div>
                <div class="border-t border-gray-700 w-full my-5"></div>
                <div class="flex flex-col gap-2 mb-5">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <span><i class="fab fa-youtube text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                        <span>youtube.com/username</span>
                    </div>
                    <routerLink to="">
                        <div class="flex items-center gap-2">
                            <span><i class="fas fa-globe text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                            <span>www.example.com</span>
                        </div>
                    </routerLink>
                </div>
                <div class="border-t border-gray-700 w-full my-5"></div>
                <div class="flex items-center gap-2 cursor-pointer">
                    <span><i class="fas fa-flag text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                    <span>گزارش</span>
                </div>
            </div>
            <div class="p-4 w-[70%] fm:w-full bg-d-color-blue-light-dark">
                <div class="text-sm font-medium text-center border-b border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                        <li class="mr-2" @click="chooseTabe = 1">
                            <span :class="[chooseTabe == 1 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                                NFT ها
                            </span>
                        </li>
                        <li class="mr-2" @click="chooseTabe = 2">
                            <span :class="[chooseTabe == 2 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                                توضیحات
                            </span>
                        </li>
                        <li class="mr-2" @click="chooseTabe = 3">
                            <span :class="[chooseTabe == 3 ? 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active' : 'hover:text-crimson-200 hover:!font-bold hover:border-gray-600', 'cursor-pointer inline-block text-lg fm:text-md p-4 border-b-2 border-transparent rounded-t-lg']">
                                در مزایده
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="mt-5">
                    <div v-show="chooseTabe == 1">
                        <div>
                            <div class="flex fm:flex-col flex-row flex-wrap justify-evenly">
                                <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative" v-for="i in 10" :key="i">
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
                                                <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] right-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
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
                                            <Button text="لیست کردن" my_class="!w-full !rounded-none !rounded-tr-full !rounded-bl-full !p-3"></Button>
                                        </div>
                                        <!-- <div class="mt-5 text-center">
                                            <Link text="مشاهده" :urlPath="{name:'Category'}" my_class="!rounded-none !rounded-tr-full !rounded-bl-full fm:!py-2 !w-full"></Link>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div calass="mt-5">
                    <div v-show="chooseTabe == 2">
                        <p class="text-break">
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                        </p>
                    </div>
                </div>
                <div calass="mt-5">
                    <div v-show="chooseTabe == 3">
                        <div>
                            <div class="flex fm:flex-col flex-row flex-wrap justify-evenly">
                                <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5 relative" v-for="i in 10" :key="i">
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
                                                <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] right-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
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
                                        <div class="mt-5 text-center">
                                            <Link text="مشاهده" :urlPath="{name:'Category'}" my_class="!rounded-none !rounded-tr-full !rounded-bl-full fm:!py-2 !w-full"></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/Button"
import Link from "@/components/Link"
export default {
    name:'Profile',
    components:{Button, Link},
    data(){
        return{
            chooseTabe:1
        }
    },
    computed:{
        convertTime(){
            let now = new Date();
            return  now.getTime();
        }
    },
    methods:{
    }
}
</script>