<template>
    <div class="">
        <nav class="mb-5 px-10 !bg-d-color-blue-light-dark shadow-md shadow-color-black flex justify-between items-center">

            <!-- Desktop Menu -->
            <ul class="flex flex-row fm:hidden items-center gap-5">
                <li class="group relative p-4 hover:bg-d-color-blue-lighter-dark">
                    <span class="flex items-center gap-1 group">
                        <routerLink :to="{name:'Index'}">خانه</routerLink>
                        <span><i class="fas fa-angle-down group-hover:rotate-180 ease-in duration-300"></i></span>
                    </span>
                    <ul class="z-1000 hidden mt-[1rem] group-hover:flex w-[15rem] flex-col gap-3 shadow-md  absolute right-0 rounded bg-d-color-blue-dark">
                        <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                            <routerLink to="">wwww</routerLink>
                        </li>
                        <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                            <routerLink to="">ggggg</routerLink>
                        </li>
                    </ul>
                </li>
                <li class="p-4 hover:bg-d-color-blue-lighter-dark">www</li>
                <li class="p-4 hover:bg-d-color-blue-lighter-dark">www</li>
                <li class="p-4 hover:bg-d-color-blue-lighter-dark">www</li>
            </ul>
            <!-- End Desktop Menu -->

            <!-- Mobile Menu -->
            <ul :class="[displayNav ? 'right-0' : 'right-[-100%]', 'z-1000 flex flex-col fd:hidden items-start ease-in duration-300 absolute top-0 w-[90%] h-screen bg-d-color-blue-dark']">
                <li class="p-4" @click="displayNav = false">
                    <span class="cursor-pointer"><i class="fas fa-times text-2xl text-crimson-200"></i></span>
                </li>
                <li class="p-4 group">
                    <div v-if="$store.state.checkConnection === false">
                        <Button :btnLoading="$store.state.btnLoading" text="اتصال به کیف پول" @callback="connectWallet(true)"></Button>
                    </div>
                    <div v-else>
                        <span class="flex items-center gap-1 group">
                            <span class="text-md fm:text-sm">{{$store.state.shortAddress}}</span>
                            <span><i class="fas fa-angle-down text-sm group-hover:rotate-180 ease-in duration-300"></i></span>
                        </span>
                        <ul class="z-1000 hidden mt-[1rem] group-hover:flex w-[15rem] flex-col gap-3 shadow-md  relative left-[1rem] rounded bg-d-color-blue-dark">
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'Profile'}">پروفایل</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'CollectionStore'}">ایجاد کالکشن</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'NftStore'}">ایجاد NFT</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full border-t border-gray-800 cursor-pointer" @click="disConnect()">
                                <span class="text-md fm:text-sm">خروج</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="group relative p-4">
                    <span class="flex items-center gap-1 group">
                        <routerLink :to="{name:'Index'}" class="text-sm">خانه</routerLink>
                        <span><i class="fas fa-angle-down text-sm group-hover:rotate-180 ease-in duration-300"></i></span>
                    </span>
                    <ul class="hidden mt-[1rem] group-hover:flex w-[15rem] flex-col gap-3 shadow-md  relative right-0 rounded bg-d-color-blue-dark">
                        <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                            <routerLink to="" class="text-sm">wwww</routerLink>
                        </li>
                        <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                            <routerLink to="" class="text-sm">ggggg</routerLink>
                        </li>
                    </ul>
                </li>
                <li class="p-4">
                    <routerLink to="" class="text-sm">www</routerLink>
                </li>
                <li class="p-4">
                    <routerLink to="" class="text-sm">www</routerLink>
                </li>
                <li class="p-4">
                    <routerLink to="" class="text-sm">www</routerLink>
                </li>
            </ul>
            <!-- End Mobile Menu -->

            <!-- Left Menu -->
            <ul class="flex items-center fd:gap-5 fm:w-full fm:justify-between">
                <li class="py-4 fd:hidden">
                    <span @click="displayNav=true" class="cursor-pointer"><i class="fas fa-bars text-2xl text-crimson-200"></i></span>
                </li>
                <li class="py-4 group fm:hidden">
                    <div v-if="$store.state.checkConnection === false">
                        <Button :btnLoading="$store.state.btnLoading" text="اتصال به کیف پول" @callback="connectWallet(true)"></Button>
                    </div>
                    <div v-else>
                        <span class="flex items-center gap-1 group">
                            <span class="text-md fm:text-sm">{{$store.state.shortAddress}}</span>
                            <span><i class="fas fa-angle-down text-sm group-hover:rotate-180 ease-in duration-300"></i></span>
                        </span>
                        <ul class="z-1000 hidden mt-[1rem] group-hover:flex w-[20rem] flex-col gap-3 shadow-md  absolute left-[1rem] rounded bg-d-color-blue-dark">
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'Profile'}">پروفایل</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'CollectionStore'}">ایجاد کالکشن</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full">
                                <routerLink :to="{name:'NftStore'}">ایجاد NFT</routerLink>
                            </li>
                            <li class="hover:bg-d-color-blue-light-dark px-5 py-3 w-full border-t border-gray-800 cursor-pointer" @click="disConnect()">
                                <span class="text-md fm:text-sm">خروج</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="py-4">
                    <span @click="displaySearch = !displaySearch" class="cursor-pointer"><i class="fas fa-search text-lg fm:text-md"></i></span>
                    <div :class="[displaySearch ? 'right-0' : 'right-[-100%]', 'w-full h-screen z-100 mt-[1rem] flex-col gap-3 shadow-md ease-in duration-300 absolute rounded bg-d-color-blue-lighter-dark fd:top-[2.5rem] fm:top-[2.9rem]']">
                        <div class="pt-4 px-8">
                            sdfsdfss
                        </div>
                     </div>
                </li>
                <li class="py-4">LOGOOOOO</li>
            </ul>
            <!-- End Left Menu -->

        </nav>
        <router-view/>

        <footer class="mt-14 bg-d-color-blue-light-dark p-4 flex items-center justify-center w-full shadow-md shadow-color-black">
            <span class="text-xs text-crimson-200 !font-bold">Copyright @ {{ year }} | I NFT</span>
        </footer>

        <Modal title="تایید مالکیت" :save="$store.state.signatureStatus == false ? 'ادامه' : 'در انتظار تایید'" :btnLoading="$store.state.signatureStatus" @cancel="disconnect()" @callback="signatureStatus ? '' : signatureMessage()" ref="signatureModal">
            <div>
                <p class="text-2xl rem--1">
                    `I NFT` از این امضا برای تأیید اینکه شما مالک این آدرس اتریوم هستید استفاده می کند.
                </p>
            </div>
        </Modal>
    </div>
    <div class=" bg-svg"></div>
</template>

<script>
import Button from '@/components/Button'
import Modal from "@/components/Modal"
export default {
    name:'FrontLayout',
    components:{Button, Modal},
    data(){
        return{
            displaySearch:false,
            displayNav:false,
            year:new Date().getFullYear(),
        }
    },
    mounted(){
        this.connectWallet(false);
    },
    computed:{
        changeAccount(){
            return this.$store.state.changeAccount;
        }
    },
    methods:{
        async connectWallet(status){
            await this.$store.dispatch('connect',status)
            if(this.$store.state.openSignatureModal){
                this.$refs.signatureModal.toggleModal();
            }
        },
        async disConnect(){
            await this.$store.dispatch('logout')
        },
        async signatureMessage(){
            await this.$store.dispatch('signatureMessage')
            if(this.$store.state.openSignatureModal == false){
                this.$refs.signatureModal.toggleModal();
            }
        }
    },
    watch:{
        changeAccount(n, o){
            if(n){
                this.connectWallet(true);
            }
        }
    }
}
</script>