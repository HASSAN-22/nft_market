<template>
    <div class="mx-8 p-4 mt-20">
        <div class="w-full">
            <div class="flex items-center px-3 justify-between border-b border-d-color-pink shadow-lg">
                <div class="flex items-center gap-2">
                    <span><i class="fas fa-cubes text-3xl fm:text-xl text-crimson-200 !font-bold"></i></span>
                    <span class="text-xl fm:text-sm">دسته: گرافیک</span>
                </div>
                <div class="flex items-center gap-2 cursor-pointer" @click="displayFilter = !displayFilter">
                    <span><i class="fas fa-sort-amount-down-alt text-3xl fm:text-xl text-crimson-200 !font-bold"></i></span>
                    <span class="text-xl fm:text-sm">فیلتر</span>
                </div>
            </div>
            <div v-show="displayFilter" class="grid grid-cols-4 fm:grid-cols-1 gap-2 items-center mt-2">
                <div><Input label="قیمت از" id="from_price" placeholder="مثال: 0.2" :required="false"></Input></div>
                <div><Input label="قیمت تا" id="to_price" placeholder="مثال: 0.2" :required="false"></Input></div>
                <div class="flex flex-col">
                    <span class="fm:text-sm">در حال مزایده</span>
                   <select class="border border-blue-700 focus:outline-none p-2 fm:p-1 fm:text-sm bg-gray-900 w-full rounded-lg mb-1">
                       <option>بله</option>
                       <option>خیر</option>
                   </select>
                </div>
                <div class="mt-[1.2rem]">
                    <Button text=" اعمال فیلتر" my_class="!w-full !rounded fm:!py-2 !py-3"></Button>
                </div>
            </div>
        </div>
        <div class="bg-d-color-blue-light-dark shadow-lg p-4">
            <div class="flex fm:flex-col flex-row flex-wrap justify-evenly">
                <div class="w-[26rem] fm:w-full shadow-lg bg-d-color-blue-lighter-dark rounded-lg mb-5" v-for="i in 12" :key="i">
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
                                        <div class="flex flex-col gap-1 rounded-lg">
                                            <span class="fm:text-sm text-md text-crimson-200 !font-bold">دنبال کننده</span>
                                            <span class="fm:text-sm text-md">150,000</span>
                                        </div>
                                        <div class="flex flex-col gap-1 rounded-lg">
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
        </div>
    </div>
</template>


<script>

import Link from "@/components/Link"
import Input from "@/components/Input"
import Button from "@/components/Button"
export default {
    name:'Category',
    components:{Link, Input, Button},
    data(){
        return{
            displaySize: window.innerWidth,
            displayFilter:false
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