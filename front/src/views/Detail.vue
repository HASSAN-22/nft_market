<template>
    <div class="mx-8 p-4 mb-10 bg-d-color-blue-light-dark rounded flex justify-center ">
        <div class="flex justify-center shadow w-full">
            <img src="@/assets/img/cover.jpg" class="w-full rounded fm:h-[18rem]"/>
        </div>
    </div>
    <div class="mx-8 p-4 bg-d-color-blue-light-dark rounded gap-3 relative">
        <div class="flex justify-end fm:justify-between items-center gap-8 mb-5">
            <div class="flex items-center gap-2 cursor-pointer">
                <span><i class="fas fa-flag text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                <span>گزارش</span>
            </div>
            <routerLink to="">
                <div class="flex items-center gap-2">
                    <span><i class="fas fa-share-alt text-crimson-200 !font-bold text-2xl fm:text-lg"></i></span>
                    <span>اشتراک گذاری</span>
                </div>
            </routerLink>
        </div>
        <div class="flex fm:flex-col justify-between fm:mt-8">
            <div>
                <div class="flex flex-col gap-3">
                    <span class="text-3xl fm:text-2xl">NFT TITLE</span>
                    <div class="flex items-center gap-2">
                        <span class="text-sm ltr">مینت شده در 22-05-2022</span>
                        <span v-if="$store.state.isCopy == false" class="cursor-pointer" @click="$store.commit('copy','wwdfsdfsd')">
                            <i class="fas fa-copy text-crimson-200 !font-bold text-2xl fm:text-lg"></i>
                        </span>
                        <span v-else class="cursor-pointer" @click="copyAddress()">
                            <i class="fas fa-check text-green-500 !font-bold text-2xl fm:text-lg"></i>
                        </span>
                    </div>
                </div>
                <div class="mt-8 flex fd:items-center gap-3 relative">
                    <!-- start belongs to  -->
                    <div class="flex flex-col items-start gap-2  bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                        <span class="fm:text-sm text-crimson-200 !font-bold cursor-pointer">متعلق به</span>
                        <div class="">
                            <div class="flex items-center gap-2">
                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                <routerLink to=""><span class="fm:text-sm">collection name</span></routerLink>
                            </div>
                        </div>
                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-auto right-0 bg-d-color-blue-light ease-in duration-300">
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
                    <!-- End belongs to -->
                    <!-- Collection -->
                    <div class="flex flex-col items-start gap-2  bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                        <span class="fm:text-sm text-crimson-200 !font-bold cursor-pointer">کالکشن</span>
                        <div class="">
                            <div class="flex items-center gap-2">
                                <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                <routerLink to=""><span class="fm:text-sm">collection name</span></routerLink>
                            </div>
                        </div>
                        <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-auto left-0 bg-d-color-blue-light ease-in duration-300">
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
                    <!-- End Collection -->
                </div>
            </div>
            <div class="w-[45%] fm:w-full border-2 border-gray-700 p-4 rounded-xl fm:mt-8">
                <div class="flex fm:flex-col justify-between mb-5">
                    <div>
                        <div class="flex flex-col gap-3 relative">
                            <span class="text-2xl fm:text-lg text-d-color-font-middle">پیشنهاد دهنده فعلی</span>
                            <div class="flex flex-col">
                                <span class="text-4xl fm:text-3xl text-crimson-200 !font-bold">0.88 ETH</span>
                                <span class="text-lg fm:text-md">0.88 USD</span>
                            </div>
                            <div>
                                <div class="flex flex-col items-start gap-2  bg-d-color-blue-light-dark w-full p-1 rounded-lg group">
                                    <div class="">
                                        <div class="flex items-center gap-2">
                                            <div class="h-8 w-8 fm:w-6 fm:h-6 rounded-full"><img src="@/assets/img/cover.jpg" class="w-full h-full rounded-full" /></div>
                                            <routerLink to=""><span class="fm:text-sm">@bidder name</span></routerLink>
                                        </div>
                                    </div>
                                    <div class="absolute group-hover:block hidden bottom-[2rem] pb-3 w-[23rem] right-0 fm:w-auto bg-d-color-blue-light ease-in duration-300">
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
                            </div>
                        </div>
                    </div>
                     <div class="fd:hidden border-t border-gray-700 w-full my-5"></div>
                    <div class="text-center">
                        <div class="flex flex-col gap-3">
                            <span class="text-2xl fm:text-lg text-d-color-font-middle text-right">پایان مزایده در</span>
                            <vue-countdown :time="convertTime" v-slot="{hours, minutes, seconds }">
                                <ul class="flex gap-8">
                                    <li class="flex flex-col">
                                        <span class="text-4xl fm:text-3xl text-crimson-200 !font-bold">{{ seconds }}</span>
                                        <span class="text-xl fm:text-lg text-d-color-font-middle">ثانیه</span>
                                    </li>

                                    <li class="flex flex-col">
                                        <span class="text-4xl fm:text-3xl text-crimson-200 !font-bold">{{ minutes }}</span>
                                        <span class="text-xl fm:text-lg text-d-color-font-middle">دقیقه</span>
                                    </li>
                                    <li class="flex flex-col">
                                        <span class="text-4xl fm:text-3xl text-crimson-200 !font-bold">{{ hours }}</span>
                                        <span class="text-xl fm:text-lg text-d-color-font-middle">ساعت</span>
                                    </li>
                                </ul>
                            </vue-countdown>
                        </div>
                    </div>
                </div>
                <Button text="ارسال پیشنهاد" my_class="!rounded-none !rounded-lg !w-full !p-4"></Button>
            </div>
        </div>

        <div class="mt-14 w-full">
            <div class="flex fm:flex-col justify-between gap-4">
                <div class="w-[50%] fm:w-full">
                    <div class="pb-2 border-b border-d-color-pink">
                        <span class="text-xl fm:text-lg">توضیحات</span>
                    </div>
                    <div class="mt-4 px-2">
                        <p class="break-all"> 
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                            LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem   
                        </p>
                    </div>
                </div>
                <div class="w-[50%] fm:w-full">
                    <div class="pb-2 border-b border-d-color-pink">
                        <span class="text-xl fm:text-lg">ویژگی ها</span>
                    </div>
                    <div class="mt-4 px-2">
                        <ul class="flex flex-row gap-5">
                            <li class="border border-blue-700 px-4 py-2 rounded-lg flex flex-col gap-1">
                                <span class="text-crimson-200 text-md fm:text-sm !font-bold">نام ویژگی</span>
                                <span class="text-md fm:text-sm text-gray-300">مقدار ویژگی</span>
                            </li>
                            <li class="border border-blue-700 px-4 py-2 rounded-lg flex flex-col gap-1">
                                <span class="text-crimson-200 text-md fm:text-sm !font-bold">نام ویژگی</span>
                                <span class="text-md fm:text-sm text-gray-300">مقدار ویژگی</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-14 w-full">
            <div class="">
                <div class="flex items-center gap-2">
                    <span><i class="fas fa-chart-bar text-2xl fm:text-lg text-crimson-200"></i></span>
                    <span class="text-lg fm:text-md">پیشنهاد ها</span>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <thead class="border-b bg-d-color-blue-light">
                                    <tr>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            #
                                        </th>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            کاربر
                                        </th>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            قیمت (اتر)
                                        </th>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            قیمت  (دلار)
                                        </th>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            انقضاء
                                        </th>
                                        <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                            ادرس
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-d-color-blue-lighter-dark border-b" v-for="i in 10" :key="i">
                                        <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-d-color-font-middle">{{i}}</td>
                                        <td class="text-sm px-6 ltr py-2 whitespace-nowrap">
                                            <a href="" class="!text-d-color-font-middle ltr">useranme</a>
                                        </td>
                                        <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap ltr">
                                            0.25 ETH
                                        </td>
                                        <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap ltr">
                                            344 USD
                                        </td>
                                        <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap">
                                            22-05-2022
                                        </td>
                                        <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap">
                                            0x5621...2354
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-14 w-full">
            <div class="">
                <div class="flex items-center gap-2">
                    <span><i class="fas fa-chart-bar text-2xl fm:text-lg text-crimson-200"></i></span>
                    <span class="text-lg fm:text-md">خریداران</span>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                            <thead class="border-b bg-d-color-blue-light">
                                <tr>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        کاربر
                                    </th>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        قیمت (اتر)
                                    </th>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        قیمت  (دلار)
                                    </th>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        انقضاء
                                    </th>
                                    <th scope="col" class="text-sm text-crimson-100 !font-bold px-6 py-2">
                                        ادرس
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-d-color-blue-lighter-dark border-b" v-for="i in 10" :key="i">
                                    <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-d-color-font-middle">{{i}}</td>
                                    <td class="text-sm px-6 ltr py-2 whitespace-nowrap">
                                        <a href="" class="!text-d-color-font-middle ltr">useranme</a>
                                    </td>
                                    <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap ltr">
                                        0.25 ETH
                                    </td>
                                    <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap ltr">
                                        344 USD
                                    </td>
                                    <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap">
                                        22-05-2022
                                    </td>
                                    <td class="text-sm text-d-color-font-middle px-6 py-2 whitespace-nowrap">
                                        0x5621...2354
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-14">
            <div class="flex items-center gap-2 border-b border-d-color-pink shadow-lg">
                <span><i class="fas fa-chart-scatter text-3xl fm:text-xl text-crimson-200 !font-bold"></i></span>
                <span class="text-xl fm:text-lg">NFT های مرتبط</span>
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
                                            <div class="absolute group-hover:block hidden bottom-[4rem] pb-3 w-[90%] left-0 fm:w-auto  bg-d-color-blue-light ease-in duration-300">
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
    </div>
</template>

<script>
import Button from "@/components/Button"
import Slider from "@/components/Slider"
import { SwiperSlide } from 'swiper/vue';
export default {
    name:'Detail',
    components:{Button, Slider, SwiperSlide},
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

